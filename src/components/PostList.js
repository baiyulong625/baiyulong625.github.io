"use client";

import { useMemo, useState } from "react";
import BlogCard from "./BlogCard";

export default function PostList({ posts }) {
  const tags = useMemo(
    () => ["全部", ...new Set(posts.map((p) => p.tag))],
    [posts]
  );
  const [active, setActive] = useState("全部");

  const filtered =
    active === "全部" ? posts : posts.filter((p) => p.tag === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActive(tag)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              active === tag
                ? "border-accent bg-accent text-white"
                : "border-line text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div>
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted">
            这个分类下还没有文章。
          </p>
        ) : (
          filtered.map((post) => <BlogCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  );
}
