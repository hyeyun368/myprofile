"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitInquiry, type ContactState } from "@/app/contact/actions";

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition-colors focus:border-rose-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50";

const initialState: ContactState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-500/30 dark:bg-rose-500/10">
        <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          문의가 접수되었습니다.
        </p>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          확인 후 빠르게 연락드리겠습니다.
        </p>
        <Link href="/contact/my" className="mt-4 inline-block text-sm text-rose-500 hover:underline">
          내 문의 수정·삭제하기
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        이름 / 회사명
        <input required name="name" maxLength={100} className={inputClass} />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        이메일
        <input required type="email" name="email" maxLength={200} className={inputClass} />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        문의 내용
        <textarea required name="message" rows={6} maxLength={5000} className={inputClass} />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        비밀번호
        <input
          required
          type="password"
          name="password"
          minLength={4}
          maxLength={100}
          autoComplete="new-password"
          className={inputClass}
        />
        <span className="font-normal text-zinc-500">
          나중에 문의를 수정하거나 삭제할 때 필요합니다. (4자 이상)
        </span>
      </label>
      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="h-12 rounded-full bg-rose-500 font-semibold text-white transition-colors hover:bg-rose-600 disabled:opacity-60"
      >
        {pending ? "보내는 중…" : "보내기"}
      </button>
    </form>
  );
}
