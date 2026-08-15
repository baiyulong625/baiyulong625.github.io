# 子非鱼 · 个人网站

基于 **Next.js (App Router) + Tailwind CSS** 的静态个人博客，部署到 GitHub Pages。

## 本地开发

```bash
npm install
npm run dev        # 开发模式，http://localhost:3000
npm run build      # 构建静态站点到 out/
npm run preview    # 本地预览构建产物
npm run lint       # 代码检查
```

## 写新文章

1. 在 `src/content/日常/` 或 `src/content/学习/` 下新建一个 `.md` 文件
2. 文件顶部写 frontmatter（标题、日期、标签、摘要）
3. 保存后运行 `npm run build`，网站会自动生成文章页面

```md
---
title: "文章标题"
date: "2026-05-01"
tag: "生活"
excerpt: "摘要文字，显示在卡片上"
---

正文使用 Markdown 编写……
```

## 部署

代码推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。
首次部署需在仓库 Settings → Pages 中把来源选为 **GitHub Actions**。
