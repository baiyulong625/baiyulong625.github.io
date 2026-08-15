import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, renderMarkdown } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = renderMarkdown(post.content);
  const categoryHref = post.category === "daily" ? "/daily" : "/learning";
  const categoryLabel = post.category === "daily" ? "日常" : "学习";

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <Link
            href={categoryHref}
            className="text-accent transition-colors hover:underline"
          >
            {categoryLabel}
          </Link>
          <span className="text-line">·</span>
          <span>{formatDate(post.date)}</span>
          <span className="text-line">·</span>
          <span>约 {post.readingTime} 分钟</span>
        </div>
        <h1 className="font-serif text-4xl leading-snug">{post.title}</h1>
      </div>

      <article
        className="prose max-w-none prose-headings:font-serif prose-headings:mt-10 prose-headings:mb-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mt-16 border-t border-line pt-8">
        <Link
          href={categoryHref}
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          ← 返回{categoryLabel}
        </Link>
      </div>
    </div>
  );
}
