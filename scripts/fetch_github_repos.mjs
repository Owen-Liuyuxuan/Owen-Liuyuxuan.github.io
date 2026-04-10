#!/usr/bin/env node
/**
 * @file fetch_github_repos.mjs
 * @description CI script — fetches Owen's public GitHub repos via REST API,
 *   categorizes them, generates narrator hints, and writes to src/data/repos.json.
 */

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../src/data/repos.json");

const GITHUB_USER = process.env.GITHUB_USER ?? "Owen-Liuyuxuan";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";

const CATEGORY_RULES = [
  { match: (r) => ["visualDet3D", "FSNet", "visionfactory"].includes(r.name), category: "research" },
  { match: (r) => r.topics?.some((t) => t.includes("ros")), category: "ros" },
  {
    match: (r) =>
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
      ].includes(r.name),
    category: "ai-tools",
  },
  {
    match: (r) =>
      ["arxiv_word_cloud", "llm_pricing_list", "papers_reading_sharing.github.io"].includes(r.name),
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
  { match: () => true, category: "ai-tools" },
];

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

function generateNarratorHint(repo) {
  const parts = [];
  if (repo.description) parts.push(repo.description);
  if (repo.stargazers_count > 0) parts.push(`⭐ ${repo.stargazers_count} stars.`);
  if (repo.language) parts.push(`Written in ${repo.language}.`);
  return parts.join(" ") || `${repo.name} — a GitHub repository.`;
}

async function main() {
  console.log(`Fetching repos for ${GITHUB_USER}...`);
  const raw = await fetchAllRepos();

  const filtered = raw.filter((r) => !r.fork && !r.private);

  const repos = filtered.map((r) => ({
    name: r.name,
    description: r.description ?? "",
    url: r.html_url,
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language ?? "",
    category: categorize({ name: r.name, topics: r.topics ?? [] }),
    topics: r.topics ?? [],
    updatedAt: r.updated_at?.slice(0, 10) ?? "",
    narratorHint: generateNarratorHint(r),
  }));

  repos.sort((a, b) => b.stars - a.stars);

  writeFileSync(OUTPUT_PATH, JSON.stringify(repos, null, 2) + "\n");
  console.log(`Wrote ${repos.length} repos to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
