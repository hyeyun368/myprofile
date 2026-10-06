"use server";

import { refresh } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, isAdmin, isCorrectPassword, sessionToken } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!isCorrectPassword(password)) {
    return { error: "비밀번호가 올바르지 않습니다." };
  }

  (await cookies()).set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin");
}

export type InquiryActionState = { status: "idle" | "success" | "error"; error?: string };

// 서버 액션은 화면 밖에서도 직접 호출될 수 있으므로 매번 관리자 여부를 확인한다.
export async function deleteInquiry(id: number): Promise<InquiryActionState> {
  if (!(await isAdmin())) {
    return { status: "error", error: "로그인이 만료되었습니다. 다시 로그인해 주세요." };
  }

  const { error } = await getSupabaseAdmin().from("inquiries").delete().eq("id", id);
  if (error) {
    console.error("[admin] 문의 삭제 실패:", error);
    return { status: "error", error: "문의를 삭제하지 못했습니다." };
  }

  refresh();
  return { status: "success" };
}
