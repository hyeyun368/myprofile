import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin_session";

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD 환경 변수가 설정되지 않았습니다.");
  }
  return password;
}

// 쿠키에는 비밀번호 대신 비밀번호로 서명한 고정 토큰을 저장한다.
// ADMIN_PASSWORD를 바꾸면 기존 로그인은 모두 무효가 된다.
export function sessionToken() {
  return createHmac("sha256", getAdminPassword()).update("admin-session").digest("hex");
}

function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function isCorrectPassword(input: string) {
  return safeEqual(input, getAdminPassword());
}

export async function isAdmin() {
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return value !== undefined && safeEqual(value, sessionToken());
}
