import PostList from "@/components/PostList";
import { getPostsByCategory } from "@/lib/posts";

export const metadata = {
  title: "日常",
  description: "生活感悟、读书笔记、旅行见闻。记录那些让日子变得丰富的瞬间。",
};

export default function DailyPage() {
  const posts = getPostsByCategory("daily");

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <header className="mb-14 text-center">
        <h1 className="font-serif text-4xl">日常</h1>
        <p className="mt-4 text-muted">
          生活感悟、读书笔记、旅行见闻。记录那些让日子变得丰富的瞬间。
        </p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
