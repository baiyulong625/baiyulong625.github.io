import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { getPostsByCategory } from "@/lib/posts";

export default function HomePage() {
  const daily = getPostsByCategory("daily").slice(0, 1);
  const learning = getPostsByCategory("learning").slice(0, 1);
  const latest = [...daily, ...learning].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <section className="flex flex-col items-center justify-center px-5 py-32 text-center">
        <h1 className="font-serif text-6xl tracking-widest sm:text-7xl">
          子非鱼
        </h1>
        <p className="mt-8 text-muted">安知鱼之乐</p>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="mb-12 flex items-baseline justify-between">
            <h2 className="font-serif text-3xl">最近更新</h2>
            <Link
              href="/daily"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              查看全部 →
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {latest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-panel">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-20 md:grid-cols-2 md:gap-12">
          <Link href="/daily" className="group">
            <p className="text-xs uppercase tracking-widest text-accent">
              日常随笔
            </p>
            <h3 className="mt-3 font-serif text-3xl transition-colors group-hover:text-accent">
              日常
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              生活感悟、读书笔记、旅行见闻。记录那些让日子变得丰富的瞬间。
            </p>
          </Link>
          <Link href="/learning" className="group">
            <p className="text-xs uppercase tracking-widest text-accent">
              学习笔记
            </p>
            <h3 className="mt-3 font-serif text-3xl transition-colors group-hover:text-accent">
              学习
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              技术笔记、工具教程、阅读摘要。把学到的东西写下来，是最好的巩固。
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
