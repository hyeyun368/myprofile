import { createClient } from "@supabase/supabase-js";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} 환경 변수가 설정되지 않았습니다.`);
  }
  return value;
}

const options = { auth: { persistSession: false } };

// publishable 키 클라이언트. RLS 정책상 문의 추가(insert)만 가능하다.
export function getSupabasePublic() {
  return createClient(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_PUBLISHABLE_KEY"),
    options,
  );
}

// secret 키 클라이언트. RLS를 우회하므로 서버에서만 쓰고,
// NEXT_PUBLIC_ 접두사를 붙이거나 클라이언트 컴포넌트에서 import하지 않는다.
export function getSupabaseAdmin() {
  return createClient(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_SECRET_KEY"),
    options,
  );
}

export type Inquiry = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};
