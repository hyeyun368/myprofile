import Link from "next/link";

type Props = {
  english: string;
  title: string;
  description: string;
};

export default function PageHeader({ english, title, description }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/"
        className="w-fit text-sm text-zinc-500 transition-colors hover:text-rose-500"
      >
        ← 메인으로
      </Link>
      <span className="text-sm font-medium uppercase tracking-wider text-rose-500">
        {english}
      </span>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
