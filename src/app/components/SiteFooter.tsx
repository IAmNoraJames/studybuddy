// src/app/components/sitefooter.tsx
import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t mt-12">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>© {year} StudyBuddyAI. All rights reserved.</div>
        <nav className="flex gap-6">
          <Link href="/terms" className="hover:underline">Terms of Use</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/fair-use" className="hover:underline">Fair Use</Link>
          <Link href="/faq" className="hover:underline">FAQ</Link>
        </nav>
      </div>
    </footer>
  );
}
