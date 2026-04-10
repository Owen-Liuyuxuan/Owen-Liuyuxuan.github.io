# Yuxuan Liu — Pixel Lab 内容维护指南

> 本文档说明如何更新网站上所有文本内容，包括哪些文件由人工编辑、哪些由 CI 自动覆盖，以及如何安全地在两者之间分配编辑责任。

---

## 一、数据主权模型

```
┌─────────────────────────────────────────────────────────┐
│  人工编辑（git commit → 永久保存）                        │
│  src/data/profile.ts    ← 人事变动、联系方式、自我介绍     │
│  src/data/papers.ts     ← 论文列表、作者、链接            │
│  src/data/repos.json    ← narratorHint（旁白文本）       │
│  src/data/intel_feed.json ← narratorHint + 手动添加条目   │
├─────────────────────────────────────────────────────────┤
│  CI 自动覆盖（每次构建时从 GitHub API 拉取）               │
│  src/data/repos.json    ← stars、forks、description、    │
│                           language、updatedAt            │
│  src/data/intel_feed.json ← 从 everyday_my_arxiv release │
│                           拉取的论文标题和摘要             │
├─────────────────────────────────────────────────────────┤
│  固定文案（在组件里硬编码）                                │
│  src/components/*  ← section 标题、导航标签、提示文本     │
│  src/app/layout.tsx  ← meta description                 │
│  src/styles/globals.css  ← 样式相关文本                   │
└─────────────────────────────────────────────────────────┘
```

**核心原则**：CI 不会覆盖人工写的 `narratorHint` 字段。人工写的 `repos.json` 内容只会被**合并**，不会被替换。

---

## 二、文件详解与编辑方法

### 2.1 `src/data/profile.ts` — 个人主页信息

**人工编辑** ✅ | **CI 不会覆盖** ✅

这是主页 HeroSection 的核心数据。最常用的编辑对象。

```typescript
export const PROFILE: Profile = {
  name: "Yuxuan Liu",        // ← 编辑：你的英文名
  nameCN: "刘宇轩",          // ← 编辑：中文名
  title: "Ph.D. in ECE · System Engineer @ TIER IV · Tokyo", // ← 编辑：头衔
  aboutMe: "...",            // ← 编辑：个人简介段落

  links: [                   // ← 编辑：联系方式
    {
      label: "Email",        // 按钮上显示的文字
      url: "mailto:yliuhb@connect.ust.hk",  // ← 编辑：邮箱地址
      icon: "✉️",            // emoji 图标（可替换为 /assets/ 下的图片名如 "💼"）
      narratorHint: "...",   // 鼠标悬停时 Companion 说的话
    },
    // ... GitHub、Scholar、LinkedIn、Resume 同理
  ],

  education: [              // ← 编辑：教育经历
    {
      degree: "Ph.D. in Electronic and Computing Engineering",
      school: "Hong Kong University of Science and Technology",
      period: "2019 – 2024",
      narratorHint: "...",   // 悬停旁白
    },
  ],
};
```

**每次改完**：保存文件 → `npm run dev` → 刷新浏览器即可预览。

---

### 2.2 `src/data/papers.ts` — 论文列表

**人工编辑** ✅ | **CI 不会覆盖** ✅

论文列表目前完全由人工维护（无 CI 自动抓取）。添加新论文时，参考以下格式：

```typescript
export const PAPERS: Paper[] = [
  {
    title: "论文完整标题",
    venueShort: "T-ASE",    // 期刊简称（卡片上显示）
    venueFull: "IEEE Transactions on Automation Science and Engineering", // 全称
    year: 2024,             // ← 编辑：发表年份
    authors: [
      { name: "Yuxuan Liu", isOwner: true },  // 自己用 isOwner: true
      { name: "合作者", isOwner: false },
    ],
    links: [
      { label: "arXiv",  url: "https://arxiv.org/abs/xxxxx" }, // ← 编辑：链接
      { label: "Code",   url: "https://github.com/..." },
    ],
    narratorHint: "论文的旁白简介（悬停时 Companion 说的话）", // ← 编辑
  },
];
```

> **新增论文**：在 `PAPERS` 数组里追加一个对象即可。

---

### 2.3 `src/data/repos.json` — GitHub 仓库

**CI 自动更新** ⚠️ | **narratorHint 由人工编辑** ✅

此文件每天由 CI（GitHub Actions）自动抓取 GitHub API 更新。

| 字段 | 来源 | 人工能改吗？ |
|------|------|------------|
| `name` | CI（GitHub） | ❌ |
| `description` | CI（GitHub） | ❌ |
| `stars` | CI（GitHub） | ❌ |
| `forks` | CI（GitHub） | ❌ |
| `language` | CI（GitHub） | ❌ |
| `updatedAt` | CI（GitHub） | ❌ |
| `narratorHint` | **人工** ✅ | ✅ |
| `category` | **脚本规则**（见下节） | ⚠️ 需改脚本 |

#### 如何编辑 narratorHint（推荐方式）

打开 `src/data/repos.json`，找到对应仓库条目，编辑 `narratorHint` 字段：

```json
{
  "name": "visualDet3D",
  "description": "Official Repo for Ground-aware Monocular 3D Object Detection",
  "stars": 398,
  "narratorHint": "← 改这里！这是鼠标悬停时 Companion 会说的话。",
  ...
}
```

#### 如何修改分类规则

分类逻辑在 `scripts/fetch_github_repos.mjs` 顶部的 `CATEGORY_RULES` 数组。
如果你新增了仓库想改分类，编辑那个数组中的规则，然后重新 commit 即可。
分类标签文字在 `CATEGORY_LABELS` 对象中（同一文件）。

---

### 2.4 `src/data/intel_feed.json` — AI 情报流

**CI 自动更新** ⚠️ | **narratorHint + 手动条目由人工编辑** ✅

此文件每天由 CI 从 `everyday_my_arxiv` 仓库的 latest release 拉取。

| 字段 | 来源 | 人工能改吗？ |
|------|------|------------|
| `title` | CI（GitHub Release） | ❌ |
| `summary` | CI（GitHub Release） | ❌ |
| `url` | CI（GitHub Release） | ❌ |
| `date` | CI（GitHub Release） | ❌ |
| `narratorHint` | **人工** ✅ | ✅ |
| 手动添加的条目 | **人工** ✅ | ✅ |

#### 如何添加手动情报条目（不在 GitHub Release 里的）

直接在 `intel_feed.json` 末尾追加一个条目：

```json
[
  { "title": "...", "url": "...", "narratorHint": "...", ... },
  { "title": "我的博客文章：深入理解 MoE",   // ← 手动添加的条目
    "summary": "...",
    "url": "https://your-blog.com/moe",
    "source": "blog",
    "date": "2026-04-10",
    "narratorHint": "我的博客 — 关于 MoE 架构的深度解读。" }
]
```

CI 运行时不会删除手动添加的条目（通过 URL 匹配保护）。

#### 如何编辑 narratorHint

直接编辑对应条目的 `narratorHint` 字段，CI 下次运行时会保留。

---

### 2.5 `src/components/*` — 组件内硬编码文案

**人工编辑** ✅ | **CI 不会覆盖** ⚠️

组件中的 `data-narrator` 属性（旁白文本）目前散布在各组件中。编辑方法如下：

| 文件 | 内容 | 编辑方式 |
|------|------|---------|
| `NavBar/NavBar.tsx` | 导航标签（BASE、QUESTS 等） | 直接编辑 JSX 中的字符串 |
| `Footer/Footer.tsx` | 页脚版权文字 | 直接编辑 |
| `HeroSection/HeroSection.tsx` | section 标题（ABOUT ME、EDUCATION 等） | 直接编辑 |
| `RepoCard/RepoCard.tsx` | "GitHub repositories — ..." | 直接编辑 |
| `PaperCard/PaperCard.tsx` | "Publications — 8 papers..." | 直接编辑 |
| `IntelFeed/IntelFeed.tsx` | "Daily AI intelligence feed — ..." | 直接编辑 |
| `FieldLog/FieldLog.tsx` | "Field log — external projects..." | 直接编辑 |

> **建议**：如果将来有大量文案需要频繁更新，可以考虑将这些字符串提取到 `src/data/copy.ts` 中统一管理。但目前直接编辑组件是可以接受的方案。

---

### 2.6 `src/app/layout.tsx` — Meta 信息

**人工编辑** ✅ | **CI 不会覆盖** ⚠️

```typescript
export const metadata: Metadata = {
  title: "Yuxuan Liu — Pixel Lab",           // ← 浏览器标签 + OG title
  description: "...",                          // ← SEO description + OG description
  openGraph: {
    title: "Yuxuan Liu — Pixel Lab",
    description: "AI/Robotics researcher & engineer...",
    url: "https://owen-liuyuxuan.github.io",
    siteName: "Pixel Lab",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Yuxuan Liu — Pixel Lab",
    description: "AI/Robotics researcher & engineer.",
  },
};
```

---

## 三、CI 管道详解

### 3.1 构建流程（自动运行）

```
每天 09:00 JST（GitHub Actions cron "0 0 * * *"）
          │
          ▼
┌─────────────────────────────────────────┐
│  1. npm run fetch:repos                 │
│     → scripts/fetch_github_repos.mjs    │
│     → 拉取 GitHub 公开仓库列表            │
│     → 与现有 repos.json 合并（保留narratorHint）│
│     → 写入 src/data/repos.json          │
├─────────────────────────────────────────┤
│  2. npm run fetch:intel                 │
│     → scripts/fetch_intel_feed.mjs      │
│     → 拉取 everyday_my_arxiv latest release │
│     → 与现有 intel_feed.json 合并（保留narratorHint+手动条目）│
│     → 写入 src/data/intel_feed.json     │
├─────────────────────────────────────────┤
│  3. npm run generate:narrator            │
│     → scripts/generate_narrator_texts.mjs│
│     → 仅为 repos.json 中缺失 narratorHint │
│       的条目自动生成旁白文本              │
│     （已有 narratorHint 的条目不受影响）  │
├─────────────────────────────────────────┤
│  4. npm run build                        │
│     → Next.js 静态导出                   │
│     → 输出到 ./out                       │
├──────────────────────────────────────────┤
│  5. Deploy to GitHub Pages               │
└──────────────────────────────────────────┘
```

### 3.2 本地手动触发 CI

如果你在本地修改了 `profile.ts` 或 `papers.ts`，可以直接预览：

```bash
npm run dev          # 开发预览（热更新，无需构建）
```

如果想模拟完整的 CI 构建：

```bash
npm run prebuild:ci  # fetch:repos + fetch:intel + generate:narrator
npm run build        # 完整构建
```

**手动触发 GitHub Actions**：
在 GitHub 仓库页面 → Actions → "Daily Site Update" → Run workflow

---

## 四、内容更新速查表

| 我想更新... | 编辑这个文件 | 生效方式 |
|------------|------------|---------|
| 名字、头衔、自我介绍 | `src/data/profile.ts` | 保存即生效 |
| 联系方式（邮箱、GitHub 等） | `src/data/profile.ts` → `links` | 保存即生效 |
| 教育经历 | `src/data/profile.ts` → `education` | 保存即生效 |
| 论文列表 | `src/data/papers.ts` | 保存即生效 |
| 仓库旁白（Companion 会说的话） | `src/data/repos.json` → `narratorHint` | 保存即生效 |
| 情报流旁白 | `src/data/intel_feed.json` → `narratorHint` | 保存即生效 |
| 手动添加情报条目 | `src/data/intel_feed.json` 末尾追加 | 保存即生效 |
| 仓库分类规则 | `scripts/fetch_github_repos.mjs` → `CATEGORY_RULES` | commit 后 CI 生效 |
| 分类标签文字 | `scripts/fetch_github_repos.mjs` → `CATEGORY_LABELS` | commit 后 CI 生效 |
| meta / SEO 文字 | `src/app/layout.tsx` | 保存即生效 |
| 导航、页脚、section 标题 | `src/components/NavBar/NavBar.tsx` 等 | 保存即生效 |
| 样式相关文案 | `src/styles/globals.css` | 保存即生效 |
| 图片/资产 | `public/assets/` | 保存即生效 |

---

## 五、旁白文本（narratorHint）写作规范

`data-narrator` 是鼠标悬停在元素上时，Companion（小精灵）会朗读的文字。

### 写作风格
- **简洁**：一句话，不超过 80 字
- **口语化**：像朋友介绍自己，不是简历
- **有信息量**：包含具体数据（star 数、venue 名称、年份等）

### 好例子

```
"FSNet — full-scale self-supervised monocular depth. My main depth estimation work."
"GitHub repositories — tools, research code, and AI projects. Auto-updated daily by CI."
"Switch to QUESTS — Publications. 8 papers at T-ASE, RA-L, ICRA, TGRS, and ECCV."
```

### 差例子

```
"FSNet paper"                                    ← 太短，没信息量
"This is my paper about depth prediction"       ← 太随意，不精准
"Published in IEEE Transactions on Automation Science and Engineering..." ← 太长
```

---

## 六、FAQ

**Q：为什么 `repos.json` 里有些仓库的 `narratorHint` 变空了？**

可能是因为该仓库是 CI 新增的（之前不在 repos.json 里），而 `generate:narrator` 脚本在自动生成旁白时用的是机器生成的摘要。如果你想要更好的旁白，手动编辑 `narratorHint` 字段即可。

**Q：CI 会不会删除我自己添加的情报条目？**

不会。`fetch_intel_feed.mjs` 使用 URL 匹配合并策略，只更新 GitHub release 中的条目，文件中有但 release 中没有的条目会被保留。

**Q：我想临时阻止 CI 覆盖 repos.json 怎么办？**

可以将 `src/data/repos.json` 设为 gitignored，或者在 GitHub Actions 里手动触发后立即编辑文件并 commit。但更推荐的方法是直接改 `narratorHint`——CI 不会覆盖它。

**Q：新增了一个 GitHub 仓库，为什么没出现在网站上？**

CI 按 `fork=false, private=false` 过滤。如果确认仓库符合条件但仍未出现，可能是 API 限流（`GITHUB_TOKEN` 未设置导致每分钟 60 次限制）。可以在 GitHub Actions 日志中查看 `fetch:repos` 步骤的输出。
