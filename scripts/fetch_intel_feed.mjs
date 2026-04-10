#!/usr/bin/env node
/**
 * @file fetch_intel_feed.mjs
 * @description CI script — fetches the latest intel feed from everyday_my_arxiv repo
 * and merges into src/data/intel_feed.json WITHOUT overwriting human-written
 * narratorHint values.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../src/data/intel_feed.json");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const ARXIV_REPO = process.env.ARXIV_REPO ?? "Owen-Liuyuxuan/everyday_my_arxiv";

async function fetchLatestArxivDigest() {
  const headers = { Accept: "application/vnd.github+json" };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;

  const url = `https://api.github.com/repos/${ARXIV_REPO}/releases/latest`;
  const res = await fetch(url, { headers });

  if (!res.ok) {
    console.warn(`No releases found (${res.status}). Falling back to empty feed.`);
    return [];
  }

  const release = await res.json();
  const items = parseMarkdownToItems(release.body ?? "");
  return items;
}

function parseMarkdownToItems(markdown) {
  if (!markdown) return [];

  const lines = markdown.split("\n");
  const items = [];
  let current = null;

  for (const line of lines) {
    const titleMatch = line.match(/^##\s+\[(.+?)\]\((.+?)\)/);
    if (titleMatch) {
      if (current) items.push(current);
      current = {
        title: titleMatch[1],
        url: titleMatch[2],
        summary: "",
        source: titleMatch[2].includes("arxiv") ? "arxiv" : "blog",
        date: new Date().toISOString().slice(0, 10),
        narratorHint: "",
      };
      continue;
    }

    if (current && line.trim() && !line.startsWith("#") && !line.startsWith("!")) {
      current.summary += (current.summary ? " " : "") + line.trim();
    }
  }

  if (current) items.push(current);
  return items;
}

/**
 * Extracts a concise, engaging narrator hint from an intel item.
 * Rules:
 *  - Never repeat the title (it's on screen)
 *  - Extract a concrete detail: method, dataset, metric, or one-liner insight
 *  - Max 80 chars; end with punctuation
 */
function autoGenerateNarratorHint(item) {
  if (!item.summary) return item.title;

  // Remove markdown artifacts
  const clean = item.summary
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`/g, "")
    .replace(/#{1,6}\s/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n/g, " ")
    .trim();

  // Try to extract the key sentence — often starts with key methods/datasets/metrics
  const patterns = [
    /(?:we propose|introduces?|presents?|proposes?|proposes?|this paper|this work|this method|this framework|our method|our framework)\s+([^.]+)/i,
    /(?:uses?|employs?|leverages?|adopts?|combines?|integrates?)\s+([^.]+)/i,
    /(?:based on|built on|trained on|tested on|evaluated on|demonstrated on)\s+([^.]+)/i,
  ];

  for (const re of patterns) {
    const match = clean.match(re);
    if (match && match[1] && match[1].length > 15) {
      const snippet = match[1].trim().slice(0, 80);
      return (snippet.endsWith(".") ? snippet : snippet + ".");
    }
  }

  // Fallback: first 80 chars of summary, not starting with "we" or "this"
  const firstSentence = clean.match(/[^.]+/)?.[0] ?? clean.slice(0, 80);
  const trimmed = firstSentence.trim().slice(0, 80);
  return (trimmed.endsWith(".") ? trimmed : trimmed + ".");
}

/**
 * Merges fresh feed items with existing intel_feed.json, preserving human edits.
 * Strategy:
 *   - New items from GitHub release → added
 *   - Items with matching url → merged (fresh title/summary, preserved narratorHint)
 *   - Items in file but not in new release → kept (e.g. manual entries the user added)
 *   - narratorHint only auto-filled if currently missing/blank
 */
function mergeWithExisting(existing, fresh) {
  const byUrl = new Map(existing.map((item) => [item.url, item]));

  const merged = fresh.map((item) => {
    const prev = byUrl.get(item.url);
    return {
      title: item.title,
      summary: item.summary,
      url: item.url,
      source: item.source,
      date: item.date,
      // Preserve human-written narratorHint; only auto-generate if blank
      narratorHint: prev?.narratorHint?.trim()
        ? prev.narratorHint
        : autoGenerateNarratorHint(item),
    };
  });

  // Keep any manual entries not in the latest release (user-added items)
  const freshUrls = new Set(fresh.map((i) => i.url));
  const manualItems = existing.filter((item) => !freshUrls.has(item.url));
  if (manualItems.length > 0) {
    console.log(`Preserving ${manualItems.length} manual (non-GitHub) feed entries.`);
  }

  return [...merged, ...manualItems];
}

async function main() {
  console.log(`Fetching intel feed from ${ARXIV_REPO}...`);
  const fresh = await fetchLatestArxivDigest();

  let existing = [];
  try {
    existing = JSON.parse(readFileSync(OUTPUT_PATH, "utf-8"));
  } catch {
    console.warn("intel_feed.json not found — starting fresh.");
  }

  const items = mergeWithExisting(existing, fresh);
  writeFileSync(OUTPUT_PATH, JSON.stringify(items, null, 2) + "\n");
  console.log(`Wrote ${items.length} intel items to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
