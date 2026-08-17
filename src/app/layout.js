import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: {
    default: "子非鱼 · 个人网站",
    template: "%s · 子非鱼",
  },
  description: "记录思考，分享知识。日常随笔与技术学习的个人博客。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col">
        {/* 首屏渲染前应用暗色模式，避免闪烁（FOUC） */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
