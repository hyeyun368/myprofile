import type { Inquiry } from "@/lib/supabase";

const dateFormat = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Seoul",
});

export default function InquiryContent({ inquiry }: { inquiry: Inquiry }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-semibold text-zinc-900 dark:text-zinc-50">
          {inquiry.name}
          <a
            href={`mailto:${inquiry.email}`}
            className="ml-2 text-sm font-normal text-rose-500 hover:underline"
          >
            {inquiry.email}
          </a>
        </p>
        <time dateTime={inquiry.created_at} className="text-sm text-zinc-500">
          {dateFormat.format(new Date(inquiry.created_at))}
        </time>
      </div>
      <p className="mt-3 whitespace-pre-wrap leading-7 text-zinc-700 dark:text-zinc-300">
        {inquiry.message}
      </p>
    </>
  );
}
