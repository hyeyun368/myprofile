import Link from "next/link";
import { profile, sections } from "@/data/site";
import ContactButton from "./ContactButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
        <Link href="/" className="font-bold text-zinc-900 dark:text-zinc-50">
          {profile.name}
          <span className="text-rose-500">.</span>
        </Link>
        <nav className="hidden gap-6 text-sm text-zinc-600 md:flex dark:text-zinc-400">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="transition-colors hover:text-rose-500"
            >
              {section.title}
            </Link>
          ))}
        </nav>
        <ContactButton size="sm" />
      </div>
    </header>
  );
}
