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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
