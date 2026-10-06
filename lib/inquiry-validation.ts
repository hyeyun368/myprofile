const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type InquiryInput = { name: string; email: string; message: string };

// 문의 작성·수정 폼에서 같은 규칙으로 입력값을 검사한다.
export function parseInquiryForm(
  formData: FormData,
): { data: InquiryInput; error?: undefined } | { data?: undefined; error: string } {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "모든 항목을 입력해 주세요." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { error: "이메일 형식이 올바르지 않습니다." };
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return { error: "입력 내용이 너무 깁니다." };
  }

  return { data: { name, email, message } };
}

export function parsePassword(formData: FormData): { password: string; error?: undefined } | { password?: undefined; error: string } {
  const password = String(formData.get("password") ?? "");
  if (password.length < 4 || password.length > 100) {
    return { error: "비밀번호는 4자 이상 100자 이하로 입력해 주세요." };
  }
  return { password };
}
