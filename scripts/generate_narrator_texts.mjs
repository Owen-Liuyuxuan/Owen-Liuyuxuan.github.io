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
      const hint = item.summary
        ? `${item.title} — ${item.summary.slice(0, 120)}${item.summary.length > 120 ? "..." : ""}`
        : item.title;
      item.narratorHint = hint;
      enriched++;
    }
  }

  writeFileSync(path, JSON.stringify(items, null, 2) + "\n");
  console.log(`Intel feed: enriched ${enriched} narrator hints (${items.length} total).`);
}

enrichRepos();
enrichIntelFeed();
console.log("Narrator text generation complete.");
