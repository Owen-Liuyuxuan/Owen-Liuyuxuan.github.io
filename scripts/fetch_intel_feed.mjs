#!/usr/bin/env node
/**
 * @file fetch_intel_feed.mjs
 * @description CI script — fetches the latest intel feed data from everyday_my_arxiv repo.
 *
 * Strategy:
 *   1. Pull the latest release from Owen's everyday_my_arxiv repo
 *   2. Parse the markdown body into structured JSON items
 *   3. Write to src/data/intel_feed.json
 */

import { writeFileSync } from "node:fs";
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

  for (const item of items) {
    item.narratorHint = item.summary
      ? `${item.title} — ${item.summary.slice(0, 100)}${item.summary.length > 100 ? "..." : ""}`
      : item.title;
  }

  return items;
}

async function main() {
  console.log(`Fetching intel feed from ${ARXIV_REPO}...`);
  const items = await fetchLatestArxivDigest();
  writeFileSync(OUTPUT_PATH, JSON.stringify(items, null, 2) + "\n");
  console.log(`Wrote ${items.length} intel items to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
