import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const contentDir = path.join(process.cwd(), "src", "content");

const BLOGS = {
  daily: "日常",
  learning: "学习",
};

function calcReadingTime(text) {
  const zh = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const words = text.replace(/[\u4e00-\u9fa5]/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(zh / 300 + words / 200));
}

export function getAllPosts() {
  const posts = [];
  for (const [category, dir] of Object.entries(BLOGS)) {
    const fullDir = path.join(contentDir, dir);
    if (!fs.existsSync(fullDir)) continue;
    for (const file of fs.readdirSync(fullDir)) {
      if (!file.endsWith(".md")) continue;
      const raw = fs.readFileSync(path.join(fullDir, file), "utf-8");
      const { data, content } = matter(raw);
      posts.push({
        slug: file.replace(/\.md$/, ""),
        category,
        title: data.title,
        date: data.date || "1970-01-01",
        tag: data.tag || "未分类",
        excerpt: data.excerpt || "",
        readingTime: data.readingTime || calcReadingTime(content),
        content,
      });
    }
  }
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostsByCategory(category) {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostBySlug(slug) {
  return getAllPosts().find((p) => p.slug === slug);
}

export function renderMarkdown(content) {
  return marked.parse(content, { async: false });
}
