import Link from "next/link";
import { sections } from "@/data/site";

export default function SectionGrid() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
        More about me
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <li key={section.href}>
            <Link
              href={section.href}
              className="group flex h-full flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-rose-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-rose-500/50"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-rose-500">
                {section.english}
              </span>
              <span className="flex items-center justify-between text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {section.title}
                <span
                  aria-hidden
                  className="text-zinc-300 transition-transform group-hover:translate-x-1 group-hover:text-rose-500"
                >
                  →
                </span>
              </span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {section.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
