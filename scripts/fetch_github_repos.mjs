#!/usr/bin/env node
/**
 * @file fetch_github_repos.mjs
 * @description CI script — fetches Owen's public GitHub repos via REST API,
 *   categorizes them, and merges into src/data/repos.json WITHOUT overwriting
 *   custom narratorHint values set by humans.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../src/data/repos.json");

const GITHUB_USER = process.env.GITHUB_USER ?? "Owen-Liuyuxuan";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";

// ── Exclusions ─────────────────────────────────────────────────────────────────
// Repos in this list are NEVER included in repos.json.
const EXCLUDED_REPOS = new Set([
  "Owen-Liuyuxuan.github.io", // this very site
]);

// ── Category rules ────────────────────────────────────────────────────────────
// Edit these to change how repos are grouped and labeled.
// Each rule has a `match` (boolean or predicate) and a `category` string.
const CATEGORY_RULES = [
  {
    match: (r) => ["visualDet3D", "FSNet", "visionfactory"].includes(r.name),
    category: "research",
  },
  {
    match: (r) => r.topics?.some((t) => t.includes("ros")) ||
      [
        "ros2_vision_inference", "ros2_dataset_bridge", "nuscenes_visualize",
        "kitti_visualize", "kitti360_visualize", "visualDet3D_ros", "monodepth_ros",
      ].includes(r.name),
    category: "ros",
  },
  {
    match: (r) =>
      [
        "everyday_my_arxiv", "paper-helper-server", "gemini_paper2slide",
        "localPDFSummarizer", "llm_pr_analyzer", "openclaw_vscode", "sam3d_uv_float16",
        "papers_reading_sharing.github.io", // papers reading blog — an AI tool
      ].includes(r.name),
    category: "ai-tools",
  },
  {
    match: (r) =>
      ["arxiv_word_cloud", "llm_pricing_list"].includes(r.name),
    category: "data-viz",
  },
  {
    match: (r) =>
      [
        "SRTP_Predicting_Knee_Joint_Angle", "Road-sign-Arrow-Recognition",
        "final_design_ws", "Hacking_dbw_mkz",
      ].includes(r.name),
    category: "early-work",
  },
  // Default: everything else falls into ai-tools
  { match: () => true, category: "ai-tools" },
];

// ── Human-readable category labels ────────────────────────────────────────────
// These labels appear in the UI. Edit here to rename a category.
const CATEGORY_LABELS = {
  research:    "Research Code",
  ros:         "ROS / Robotics",
  "ai-tools":  "AI Tools",
  "data-viz":  "Data & Viz",
  "early-work":"Early Work",
};

function categorize(repo) {
  for (const rule of CATEGORY_RULES) {
    if (rule.match(repo)) return rule.category;
  }
  return "ai-tools";
}

async function fetchAllRepos() {
  const headers = { Accept: "application/vnd.github+json" };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;

  let page = 1;
  const allRepos = [];
  while (true) {
    const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&sort=stars&direction=desc`;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    const data = await res.json();
    if (data.length === 0) break;
    allRepos.push(...data);
    page++;
  }
  return allRepos;
}

function autoGenerateNarratorHint(repo) {
  const parts = [];
  if (repo.description) parts.push(repo.description);
  if (repo.stars > 0) parts.push(`⭐ ${repo.stars} stars.`);
  if (repo.language) parts.push(`Written in ${repo.language}.`);
  return parts.join(" ") || `${repo.name} — a GitHub repository.`;
}

/**
 * Merges fresh GitHub data with existing repos.json, preserving human edits.
 * Strategy:
 *   - New repos from GitHub  → added (with auto-generated narratorHint)
 *   - Existing repos (same name, same url) → fields from GitHub merged in,
 *     but narratorHint is ONLY replaced if the existing value is blank/missing
 *   - Repos in GitHub but NOT in file → added
 *   - Repos in file but NOT on GitHub → removed (repo was deleted or made private)
 */
function mergeWithExisting(existing, fresh) {
  const existingMap = new Map(existing.map((r) => [r.name, r]));

  const merged = fresh.map((r) => {
    const prev = existingMap.get(r.name);
    const mergedRepo = {
      name: r.name,
      description: r.description ?? "",
      url: r.url,
      stars: r.stars,
      forks: r.forks,
      language: r.language ?? "",
      category: categorize({ name: r.name, topics: r.topics ?? [] }),
      topics: r.topics ?? [],
      updatedAt: r.updatedAt ?? "",
      narratorHint: prev?.narratorHint?.trim()
        ? prev.narratorHint
        : autoGenerateNarratorHint(r),
    };
    if (prev?.categoryOverride) mergedRepo.categoryOverride = prev.categoryOverride;
    return mergedRepo;
  });

  merged.sort((a, b) => b.stars - a.stars);
  return merged;
}

async function main() {
  console.log(`Fetching repos for ${GITHUB_USER}...`);
  const raw = await fetchAllRepos();

  const fresh = raw
    .filter((r) => !r.fork && !r.private)
    .filter((r) => r.stargazers_count >= 5)         // exclude repos with < 5 stars
    .filter((r) => !EXCLUDED_REPOS.has(r.name))     // exclude this very site repo
    .map((r) => ({
      name: r.name,
      description: r.description ?? "",
      url: r.html_url,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language ?? "",
      topics: r.topics ?? [],
      updatedAt: r.updated_at?.slice(0, 10) ?? "",
    }));

  let existing = [];
  try {
    existing = JSON.parse(readFileSync(OUTPUT_PATH, "utf-8"));
  } catch {
    console.warn("repos.json not found — starting fresh.");
  }

  const repos = mergeWithExisting(existing, fresh);

  writeFileSync(OUTPUT_PATH, JSON.stringify(repos, null, 2) + "\n");
  console.log(`Wrote ${repos.length} repos to ${OUTPUT_PATH}`);

  const excludedNames = new Set(repos.map((r) => r.name).filter((n) => EXCLUDED_REPOS.has(n)));
  const lowStar = repos.filter((r) => r.stars < 5);
  if (excludedNames.size > 0) {
    console.error(`ERROR: excluded repos still present: ${[...excludedNames].join(", ")}`);
    process.exit(1);
  }
  if (lowStar.length > 0) {
    console.error(`ERROR: repos with <5 stars: ${lowStar.map((r) => r.name).join(", ")}`);
    process.exit(1);
  }
  console.log("Validation passed: no excluded repos, no repos with <5 stars.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
