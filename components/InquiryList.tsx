import InquiryItem from "@/components/InquiryItem";
import type { Inquiry } from "@/lib/supabase";

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
        <InquiryItem key={inquiry.id} inquiry={inquiry} />
      ))}
    </ul>
  );
}
