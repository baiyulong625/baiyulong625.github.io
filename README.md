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

## 文件结构

```text
baiyulong625.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署配置
├── scripts/
│   └── preview.mjs             # 本地静态预览服务器（npm run preview）
├── src/
│   ├── app/                    # Next.js App Router：页面路由
│   │   ├── page.js             # 首页（最近更新）
│   │   ├── layout.js           # 全局布局（Header/Footer 引入处）
│   │   ├── globals.css         # 全局样式与主题变量（亮/暗色）
│   │   ├── about/              # 关于页
│   │   ├── daily/              # 「日常」栏目列表页
│   │   ├── learning/           # 「学习」栏目列表页
│   │   ├── posts/[slug]/       # 文章详情页（按 slug 动态生成）
│   │   ├── icon.svg            # 浏览器标签页图标（favicon）
│   │   ├── icon.png            # 通用图标（512×512）
│   │   └── apple-icon.png      # iOS 主屏幕图标（180×180）
│   ├── components/             # 复用组件
│   │   ├── Header.js           # 顶部导航
│   │   ├── Footer.js           # 页脚
│   │   ├── BlogCard.js         # 文章卡片
│   │   ├── PostList.js         # 文章列表
│   │   └── ThemeToggle.js      # 亮/暗色切换
│   ├── content/                # ★ 文章内容（Markdown）
│   │   ├── 日常/               # 生活随笔类文章
│   │   └── 学习/               # 学习笔记类文章
│   └── lib/
│       ├── posts.js            # 读取 content/、解析 frontmatter、生成静态参数
│       └── format.js           # 日期等格式化工具
├── next.config.mjs             # Next.js 配置（静态导出 output: export）
├── eslint.config.mjs           # ESLint 配置
├── postcss.config.mjs          # PostCSS / Tailwind 配置
├── jsconfig.json               # 路径别名（@/ 指向 src/）
├── .nvmrc                      # Node 版本（24）
└── package.json                # 依赖与脚本
```

> 写文章只需要动 `src/content/` 下的 Markdown；改样式看 `globals.css`；改页面结构看 `src/app/` 和 `src/components/`。

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
