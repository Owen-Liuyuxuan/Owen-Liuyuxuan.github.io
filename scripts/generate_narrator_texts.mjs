#!/usr/bin/env node
/**
 * @file generate_narrator_texts.mjs
 * @description CI script — enriches dynamic JSON data files with narrator hints.
 *
 * Runs AFTER fetch_github_repos.mjs and fetch_intel_feed.mjs, BEFORE Next.js build.
 *
 * PURE TEXT TRANSFORMATION — no LLM calls.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function autoGenerateIntelHint(item) {
  if (!item.summary) return "";

  const clean = item.summary
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`/g, "")
    .replace(/#{1,6}\s/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n/g, " ")
    .trim();

  // Extract the key insight — method, dataset, or metric
  const patterns = [
    /(?:we propose|introduces?|presents?|proposes?)\s+([^.]+)/i,
    /(?:uses?|employs?|leverages?|adopts?|combines?|integrates?)\s+([^.]+)/i,
    /(?:based on|built on|trained on|evaluated on)\s+([^.]+)/i,
  ];

  for (const re of patterns) {
    const match = clean.match(re);
    if (match?.[1]?.length > 15) {
      const snippet = match[1].trim().slice(0, 80);
      return snippet.endsWith(".") ? snippet : snippet + ".";
    }
  }

  const firstSentence = clean.match(/[^.]+/)?.[0]?.trim() ?? clean.slice(0, 80);
  const trimmed = firstSentence.slice(0, 80);
  return trimmed.endsWith(".") ? trimmed : trimmed + ".";
}

function enrichRepos() {
  const path = resolve(__dirname, "../src/data/repos.json");
  let repos;
  try {
    repos = JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    console.warn("repos.json not found or invalid. Skipping.");
    return;
  }

  let enriched = 0;
  for (const repo of repos) {
    if (!repo.narratorHint || repo.narratorHint.trim() === "") {
      const parts = [];
      parts.push(repo.name);
      if (repo.description) parts.push(`— ${repo.description}`);
      if (repo.stars > 0) parts.push(`⭐ ${repo.stars} stars.`);
      if (repo.language) parts.push(`Written in ${repo.language}.`);
      repo.narratorHint = parts.join(" ");
      enriched++;
    }
  }

  writeFileSync(path, JSON.stringify(repos, null, 2) + "\n");
  console.log(`Repos: enriched ${enriched} narrator hints (${repos.length} total).`);
}

function enrichIntelFeed() {
  const path = resolve(__dirname, "../src/data/intel_feed.json");
  let items;
  try {
    items = JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    console.warn("intel_feed.json not found or invalid. Skipping.");
    return;
  }

  let enriched = 0;
  for (const item of items) {
    if (!item.narratorHint || item.narratorHint.trim() === "") {
      item.narratorHint = autoGenerateIntelHint(item);
      enriched++;
    }
  }

  writeFileSync(path, JSON.stringify(items, null, 2) + "\n");
  console.log(`Intel feed: enriched ${enriched} narrator hints (${items.length} total).`);
}

enrichRepos();
enrichIntelFeed();
console.log("Narrator text generation complete.");
