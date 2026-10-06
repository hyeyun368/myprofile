"use server";

import { hashPassword, verifyPassword } from "@/lib/inquiry-password";
import { parseInquiryForm, parsePassword } from "@/lib/inquiry-validation";
import { getSupabaseAdmin, getSupabasePublic, type Inquiry } from "@/lib/supabase";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitInquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = parseInquiryForm(formData);
  if (parsed.error !== undefined) {
    return { status: "error", message: parsed.error };
  }
  const pw = parsePassword(formData);
  if (pw.error !== undefined) {
    return { status: "error", message: pw.error };
  }

  try {
    const password_hash = await hashPassword(pw.password);
    const { error } = await getSupabasePublic()
      .from("inquiries")
      .insert({ ...parsed.data, password_hash });
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

// 아래 작성자용 액션은 publishable 키로는 조회·수정·삭제가 막혀 있어서 secret 키로 처리하고,
// 대신 매 요청마다 작성자 비밀번호를 서버에서 직접 확인한다.

const INQUIRY_COLUMNS = "id, name, email, message, created_at";

export type MyInquiriesState =
  | { status: "idle" | "error"; error?: string }
  | { status: "success"; inquiries: Inquiry[] };

export async function findMyInquiries(
  _prev: MyInquiriesState,
  formData: FormData,
): Promise<MyInquiriesState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return { status: "error", error: "이메일과 비밀번호를 입력해 주세요." };
  }

  const { data, error } = await getSupabaseAdmin()
    .from("inquiries")
    .select(`${INQUIRY_COLUMNS}, password_hash`)
    .eq("email", email)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[contact] 내 문의 조회 실패:", error);
    return { status: "error", error: "문의를 불러오지 못했습니다." };
  }

  const inquiries: Inquiry[] = [];
  for (const { password_hash, ...inquiry } of data) {
    if (await verifyPassword(password, password_hash)) inquiries.push(inquiry);
  }
  if (inquiries.length === 0) {
    return { status: "error", error: "이메일 또는 비밀번호가 일치하는 문의가 없습니다." };
  }
  return { status: "success", inquiries };
}

async function isAuthor(id: number, password: string) {
  const { data } = await getSupabaseAdmin()
    .from("inquiries")
    .select("password_hash")
    .eq("id", id)
    .maybeSingle();
  return data !== null && (await verifyPassword(password, data.password_hash));
}

export type MyInquiryActionState =
  | { status: "idle" | "error"; error?: string }
  | { status: "success"; inquiry: Inquiry };

export async function updateMyInquiry(
  id: number,
  password: string,
  _prev: MyInquiryActionState,
  formData: FormData,
): Promise<MyInquiryActionState> {
  const parsed = parseInquiryForm(formData);
  if (parsed.error !== undefined) {
    return { status: "error", error: parsed.error };
  }
  if (!(await isAuthor(id, password))) {
    return { status: "error", error: "비밀번호가 맞지 않거나 이미 삭제된 문의입니다." };
  }

  const { data, error } = await getSupabaseAdmin()
    .from("inquiries")
    .update(parsed.data)
    .eq("id", id)
    .select(INQUIRY_COLUMNS)
    .single();
  if (error) {
    console.error("[contact] 문의 수정 실패:", error);
    return { status: "error", error: "문의를 수정하지 못했습니다." };
  }
  return { status: "success", inquiry: data };
}

export async function deleteMyInquiry(
  id: number,
  password: string,
): Promise<{ status: "idle" | "success" | "error"; error?: string }> {
  if (!(await isAuthor(id, password))) {
    return { status: "error", error: "비밀번호가 맞지 않거나 이미 삭제된 문의입니다." };
  }

  const { error } = await getSupabaseAdmin().from("inquiries").delete().eq("id", id);
  if (error) {
    console.error("[contact] 문의 삭제 실패:", error);
    return { status: "error", error: "문의를 삭제하지 못했습니다." };
  }
  return { status: "success" };
}
