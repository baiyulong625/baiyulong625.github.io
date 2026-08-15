import Link from "next/link";
import { formatDate } from "@/lib/format";

export default function BlogCard({ post }) {
  return (
    <article className="group border-b border-line py-8 first:pt-0">
      <div className="mb-2.5 flex items-center gap-3 text-xs text-muted">
        <span>{formatDate(post.date)}</span>
        <span className="h-1 w-1 rounded-full bg-line" />
        <span>约 {post.readingTime} 分钟</span>
      </div>
      <h3 className="font-serif text-2xl leading-snug">
        <Link
          href={`/posts/${post.slug}`}
          className="transition-colors hover:text-accent"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      <div className="mt-4">
        <span className="inline-block rounded-full border border-line px-3 py-1 text-xs text-muted">
          {post.tag}
        </span>
      </div>
    </article>
  );
}
