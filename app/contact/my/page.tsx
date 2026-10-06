import type { Metadata } from "next";
import MyInquiries from "@/components/MyInquiries";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "내 문의 확인",
  robots: { index: false, follow: false },
};

export default function MyInquiriesPage() {
  return (
    <div className="flex max-w-xl flex-col gap-12">
      <PageHeader
        english="My Inquiries"
        title="내 문의 확인"
        description="문의할 때 입력한 이메일과 비밀번호로 내 문의를 찾아 수정하거나 삭제할 수 있습니다."
      />
      <MyInquiries />
    </div>
  );
}
