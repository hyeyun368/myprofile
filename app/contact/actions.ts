"use server";

import { getSupabasePublic } from "@/lib/supabase";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitInquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "모든 항목을 입력해 주세요." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "이메일 형식이 올바르지 않습니다." };
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return { status: "error", message: "입력 내용이 너무 깁니다." };
  }

  try {
    const { error } = await getSupabasePublic()
      .from("inquiries")
      .insert({ name, email, message });
    if (error) throw error;
  } catch (e) {
    console.error("[contact] 문의 저장 실패:", e);
    return {
      status: "error",
      message: "문의를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }

  return { status: "success" };
}
