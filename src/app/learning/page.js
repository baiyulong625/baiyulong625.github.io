import PostList from "@/components/PostList";
import { getPostsByCategory } from "@/lib/posts";

export const metadata = {
  title: "学习",
  description: "技术笔记、工具教程、阅读摘要。把学到的东西写下来，是最好的巩固。",
};

export default function LearningPage() {
  const posts = getPostsByCategory("learning");

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <header className="mb-14 text-center">
        <h1 className="font-serif text-4xl">学习</h1>
        <p className="mt-4 text-muted">
          技术笔记、工具教程、阅读摘要。把学到的东西写下来，是最好的巩固。
        </p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
