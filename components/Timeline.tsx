import type { TimelineItem } from "@/data/site";

type Props = {
  items: TimelineItem[];
};

export default function Timeline({ items }: Props) {
  return (
    <ol className="flex flex-col border-l-2 border-rose-200 dark:border-rose-500/30">
      {items.map((item) => (
        <li key={`${item.period}-${item.title}`} className="relative pb-10 pl-8 last:pb-0">
          <span className="absolute -left-[7px] top-1.5 size-3 rounded-full bg-rose-500" />
          <p className="text-sm font-medium text-rose-500">{item.period}</p>
          <h3 className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {item.title}
          </h3>
          <p className="text-zinc-500">{item.organization}</p>
          {item.description && (
            <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-400">
              {item.description}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
