import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-5 py-10 text-center">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()}{" "}
          <Link href="/" className="text-ink hover:text-accent">
            子非鱼
          </Link>
        </p>
      </div>
    </footer>
  );
}
