import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "문의하기" };

export default function ContactPage() {
  return (
    <div className="flex max-w-xl flex-col gap-12">
      <PageHeader
        english="Contact"
        title="문의하기"
        description="협업이나 채용 관련 문의를 남겨 주세요."
      />
      <ContactForm />
      <p className="text-sm text-zinc-500">
        이미 문의를 남기셨나요?{" "}
        <Link href="/contact/my" className="text-rose-500 hover:underline">
          내 문의 수정·삭제하기
        </Link>
      </p>
    </div>
  );
}
