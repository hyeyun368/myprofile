import type { PortfolioItem } from "@/data/site";

type Props = {
  item: PortfolioItem;
};

export default function PortfolioCard({ item }: Props) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-rose-100 to-orange-50 text-2xl font-bold text-rose-400 dark:from-rose-500/20 dark:to-zinc-900">
        {item.category}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {item.title}
        </h3>
        <p className="flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {item.description}
        </p>
        <ul className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
