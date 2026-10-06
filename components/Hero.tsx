import { profile } from "@/data/site";
import ContactButton from "./ContactButton";

export default function Hero() {
  return (
    <section className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
      <div className="flex max-w-2xl flex-col gap-6">
        <span className="w-fit rounded-full bg-rose-100 px-4 py-1 text-sm font-medium text-rose-600 dark:bg-rose-500/15 dark:text-rose-300">
          {profile.role}
        </span>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          안녕하세요,
          <br />
          <span className="text-rose-500">{profile.name}</span>입니다.
        </h1>
        <p className="text-xl font-medium text-zinc-800 dark:text-zinc-200">
          {profile.headline}
        </p>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {profile.summary}
        </p>
        <ul className="flex flex-wrap gap-2">
          {profile.keywords.map((keyword) => (
            <li
              key={keyword}
              className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
            >
              #{keyword}
            </li>
          ))}
        </ul>
      </div>
      <ContactButton />
    </section>
  );
}
