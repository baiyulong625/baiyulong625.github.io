export const metadata = {
  title: "关于",
  description: "关于子非鱼，一名独立内容创作者。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <header className="mb-14 text-center">
        <h1 className="font-serif text-4xl">关于子非鱼</h1>
      </header>

      <section className="space-y-6 leading-loose">
        <h2 className="font-serif text-2xl">用热爱驱动创造</h2>
        <p>
          你好，我是<strong>子非鱼</strong>。一名独立内容创作者，热衷于将复杂的概念转化为易懂、有趣的内容。我相信好的内容不仅仅传递信息，更能启发思考和行动。
        </p>
        <p className="text-muted">
          从技术教程到生活感悟，从设计思路到读书笔记，我尝试用不同的形式记录这个时代的声音。如果你也热爱创造，欢迎和我交流。
        </p>
        <p className="text-muted">
          目前我正在探索 AI 辅助创作与个人知识管理的可能性，希望在这里与你分享一路的收获。
        </p>
      </section>

      <section className="mt-20 border-t border-line pt-14">
        <h2 className="font-serif text-2xl">保持联系</h2>
        <p className="mt-4 text-muted">
          有任何想法、建议或合作意向？欢迎随时联系我。
        </p>
        <ul className="mt-8 space-y-4 text-sm">
          <li className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            <a
              href="mailto:1184132194@qq.com"
              className="text-accent hover:underline"
            >
              1184132194@qq.com
            </a>
          </li>
          <li className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-muted">中国 · 天津</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
