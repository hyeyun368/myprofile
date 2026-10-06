import type { Metadata } from "next";
import AdminLoginForm from "@/components/AdminLoginForm";
import InquiryList from "@/components/InquiryList";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin, type Inquiry } from "@/lib/supabase";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "문의 관리",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return (
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">문의 관리</h1>
        <AdminLoginForm />
      </div>
    );
  }

  const { data, error } = await getSupabaseAdmin()
    .from("inquiries")
    .select("id, name, email, message, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          문의 관리
          {data && <span className="ml-3 text-lg text-rose-500">{data.length}건</span>}
        </h1>
        <form action={logout}>
          <button className="text-sm text-zinc-500 hover:text-rose-500">로그아웃</button>
        </form>
      </div>
      {error ? (
        <p role="alert" className="text-red-600 dark:text-red-400">
          문의를 불러오지 못했습니다: {error.message}
        </p>
      ) : (
        <InquiryList inquiries={data as Inquiry[]} />
      )}
    </div>
  );
}
