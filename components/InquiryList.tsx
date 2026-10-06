import type { Inquiry } from "@/lib/supabase";

const dateFormat = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Seoul",
});

type Props = {
  inquiries: Inquiry[];
};

export default function InquiryList({ inquiries }: Props) {
  if (inquiries.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500 dark:border-zinc-700">
        아직 받은 문의가 없습니다.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {inquiries.map((inquiry) => (
        <li
          key={inquiry.id}
          className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
        >
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
        </li>
      ))}
    </ul>
  );
}
