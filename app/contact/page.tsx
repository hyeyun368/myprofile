import type { Metadata } from "next";
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
    </div>
  );
}
