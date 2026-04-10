#!/usr/bin/env node
/**
 * @file fetch_intel_feed.mjs
 * @description CI script — fetches the latest Arxiv report from everyday_my_arxiv Wiki
 * and replaces src/data/intel_feed.json with a full refresh (no merge).
 *
 * Wiki source: https://github.com/Owen-Liuyuxuan/everyday_my_arxiv/wiki
 * - Home.md → contains link to latest report page
 * - Arxiv-Report-YYYY-MM-DD.md → contains the full daily report with all paper sections
 *
 * Each paper section in the Wiki page contains:
 *   ## [Title](url)        → title, url
 *   Authors: ...           → authors (comma-separated)
 *   Published: ...         → published date
 *   Categories: ...        → categories (comma-separated)
 *   Abstract:              → abstract text
 *   Analysis:              → structured analysis (Chinese sections)
 *   Key Findings:          → bullet points
 *   Links:                 → PDF + arXiv links
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../src/data/intel_feed.json");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const WIKI_REPO = "Owen-Liuyuxuan/everyday_my_arxiv";
const WIKI_RAW_BASE = `https://raw.githubusercontent.com/wiki/${WIKI_REPO}`;

async function fetchRawWikiPage(pageName) {
  const headers = { Accept: "application/vnd.github.raw+json" };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;

  const url = `${WIKI_RAW_BASE}/${pageName}`;
  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new Error(`Failed to fetch wiki page "${pageName}": ${res.status} ${res.statusText}`);
  }

  return await res.text();
}

async function fetchLatestReportPageName() {
  const homeContent = await fetchRawWikiPage("Home.md");

  // Parse the latest report link from Home.md
  // Format: * [Report YYYY-MM-DD](Arxiv-Report-YYYY-MM-DD)
  const match = homeContent.match(/\* \[Report (\d{4}-\d{2}-\d{2})\]\((Arxiv-Report-\d{4}-\d{2}-\d{2})\)/);

  if (!match) {
    throw new Error("Could not parse latest report page name from Home.md");
  }

  return match[2]; // e.g. "Arxiv-Report-2026-04-09"
}

function parseReportPage(markdown, reportDate) {
  if (!markdown) return [];

  const items = [];

  // Find all ## [Title](url) positions
  const headerPattern = /## \[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  const matches = [];
  let m;
  while ((m = headerPattern.exec(markdown)) !== null) {
    matches.push({ title: m[1], url: m[2], index: m.index });
  }

  if (matches.length === 0) return [];

  for (let i = 0; i < matches.length; i++) {
    const { title, url } = matches[i];
    // Block: from start of this ## to start of next ## (or end)
    const blockStart = matches[i].index;
    const blockEnd = i + 1 < matches.length ? matches[i + 1].index : markdown.length;
    const block = markdown.slice(blockStart, blockEnd);

    // Extract fields — each paper block has its own **Authors:** etc.
    // Use a safe approach: scan line by line and collect top-level fields
    const authorsRaw = safeExtractField(block, "Authors:");
    const publishedRaw = safeExtractField(block, "Published:");
    const categoriesRaw = safeExtractField(block, "Categories:");
    const abstract = safeExtractSection(block, "Abstract:", "Analysis:");
    const analysisText = safeExtractSection(block, "Analysis:", "Key Findings:");
    const keyFindingsBlock = safeExtractSection(block, "Key Findings:", "Links:");
    const linksSection = safeExtractSection(block, "Links:", null);

    // Parse authors
    const authors = authorsRaw
      ? authorsRaw.split(",").map((a) => a.trim()).filter(Boolean)
      : [];

    // Parse categories
    const categories = categoriesRaw
      ? categoriesRaw.split(",").map((c) => c.trim()).filter(Boolean)
      : [];

    // Parse key findings
    const findingsList = keyFindingsBlock
      ? keyFindingsBlock.split("\n")
          .filter((l) => l.trim().startsWith("- "))
          .map((l) => l.trim().slice(2).trim())
      : [];

    // Parse links
    const links = { pdf: "", arxiv: "" };
    if (linksSection) {
      const pdfMatch = linksSection.match(/\[PDF\]\((http[^\)]+)\)/);
      const arxivMatch = linksSection.match(/\[arXiv\]\((http[^\)]+)\)/);
      if (pdfMatch) links.pdf = pdfMatch[1];
      if (arxivMatch) links.arxiv = arxivMatch[1];
    }

    // Parse analysis
    const analysisObj = parseAnalysis(analysisText || "");

    // Source
    const source = url.includes("arxiv.org") ? "arxiv" : "blog";

    // Narrator hint
    const hint = autoGenerateNarratorHint(title, abstract || analysisText || "");

    items.push({
      title,
      url,
      authors,
      published: publishedRaw || "",
      categories,
      abstract: abstract || "",
      analysis: analysisObj,
      keyFindings: findingsList,
      links,
      source,
      date: reportDate,
      narratorHint: hint,
    });
  }

  return items;
}

/**
 * Safe field extraction: find line starting with **FieldName:** and return value.
 * Only matches the FIRST occurrence, and only within the block.
 */
function safeExtractField(block, fieldName) {
  const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Match **FieldName:** followed by content up to end of line
  const re = new RegExp(`\\*\\*${escaped}\\*\\*\\s*(.+?)\\n`, "s");
  const match = block.match(re);
  return match ? match[1].trim() : "";
}

/**
 * Safe section extraction: between startMarker and endMarker within block.
 */
function safeExtractSection(block, startMarker, endMarker) {
  const startIdx = block.indexOf(startMarker);
  if (startIdx === -1) return "";
  const afterStart = block.slice(startIdx + startMarker.length);
  if (!endMarker) return afterStart.trimEnd();
  const endIdx = afterStart.indexOf(endMarker);
  if (endIdx === -1) return afterStart.trimEnd();
  return afterStart.slice(0, endIdx).trimEnd();
}

// (inline above with safeExtractField / safeExtractSection)

function parseAnalysis(text) {
  // Analysis section contains Chinese headers:
  // ### 1. 摘要翻译 / 主要贡献总结
  // ### 2. 方法动机分析 / 关键创新或方法学方法
  // ### 3. 实验分析 / 对领域潜在影响
  // ### 4. 相关领域或应用 / 实用指南
  // ### 5. 可推断的局限性
  // etc.

  const sections = {};

  // Pattern: ### (number.) Chinese heading (English in parens)
  const sectionBlocks = text.split(/\n###\s+\d+\.\s+/);

  for (const block of sectionBlocks) {
    if (!block.trim()) continue;

    // Extract heading (everything up to the first newline or newline with ---)
    const headingMatch = block.match(/^([^\n]+?)(?:\n|$)/);
    if (!headingMatch) continue;

    const heading = headingMatch[1].trim();
    // Content is everything after the heading line
    const content = block.slice(heading.length).trim().replace(/^---+\n/, "").trim();
    if (!content) continue; // skip empty sections

    // Map to standardized keys
    if (heading.includes("贡献总结") || heading.includes("摘要翻译") || heading.includes("简洁总结")) {
      sections.summary = content;
    } else if (heading.includes("方法") || heading.includes("创新") || heading.includes("方法论")) {
      sections.method = content;
    } else if (heading.includes("实验") || heading.includes("分析")) {
      sections.experiment = content;
    } else if (heading.includes("影响") || heading.includes("潜在") || heading.includes("应用")) {
      sections.impact = content;
    } else if (heading.includes("领域") || heading.includes("相关") || heading.includes("实用")) {
      sections.related = content;
    } else if (heading.includes("局限") || heading.includes("不足") || heading.includes("可推断")) {
      sections.limitations = content;
    } else {
      // Fallback: store by position
      const key = Object.keys(sections).length.toString();
      sections[key] = content;
    }
  }

  return sections;
}

/**
 * Auto-generates a concise narrator hint (≤80 chars, no title repetition).
 */
function autoGenerateNarratorHint(title, context) {
  if (!context) return title;

  const clean = context
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#+\s/gm, "")
    .replace(/\n/g, " ")
    .trim();

  // Try to extract method/dataset/metric sentences
  const patterns = [
    /(?:propose|introduce|present|method|framework|approach|model|architecture)\s+[^.。]{20,80}/gi,
    /(?:uses?|employs?|leverages?|adopts?|combines?|integrates?|achieves?|outperforms?)\s+[^.。]{20,80}/gi,
    /(?:based on|built on|trained on|tested on|evaluated on|demonstrated on)\s+[^.。]{20,80}/gi,
  ];

  for (const re of patterns) {
    const match = clean.match(re);
    if (match && match[0] && match[0].length > 20) {
      const snippet = match[0].trim().slice(0, 80);
      return snippet.endsWith(".") || snippet.endsWith("。") ? snippet : snippet + ".";
    }
  }

  // Fallback: first 80 chars
  const trimmed = clean.slice(0, 80).trim();
  return trimmed.endsWith(".") || trimmed.endsWith("。") ? trimmed : trimmed + ".";
}

async function main() {
  console.log(`Fetching latest Arxiv report from Wiki: ${WIKI_REPO}`);

  // Step 1: Find latest report page name from Home.md
  const pageName = await fetchLatestReportPageName();
  console.log(`Latest report page: ${pageName}`);

  // Extract date from page name (Arxiv-Report-YYYY-MM-DD)
  const dateMatch = pageName.match(/(\d{4}-\d{2}-\d{2})/);
  const reportDate = dateMatch ? dateMatch[1] : new Date().toISOString().slice(0, 10);

  // Step 2: Fetch the full report page
  const reportContent = await fetchRawWikiPage(`${pageName}.md`);
  console.log(`Fetched report (${reportContent.length} chars)`);

  // Step 3: Parse into structured items
  const items = parseReportPage(reportContent, reportDate);
  console.log(`Parsed ${items.length} paper items`);

  if (items.length === 0) {
    console.warn("No items found — check wiki page format.");
  }

  // Step 4: Full refresh — overwrite intel_feed.json entirely
  writeFileSync(OUTPUT_PATH, JSON.stringify(items, null, 2) + "\n");
  console.log(`Wrote ${items.length} items to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});