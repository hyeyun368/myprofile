"use client";

import { useState } from "react";

type Props = {
  action: () => void;
  pending: boolean;
};

// 삭제 버튼을 누르면 한 번 더 확인한 뒤에 action을 실행한다.
export default function DeleteConfirm({ action, pending }: Props) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-full px-3 py-1 text-zinc-500 hover:text-red-600"
      >
        삭제
      </button>
    );
  }

  return (
    <form action={action} className="flex items-center gap-2">
      <span className="text-zinc-500">정말 삭제할까요?</span>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        disabled={pending}
        className="rounded-full px-3 py-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50"
      >
        취소
      </button>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-red-600 px-3 py-1 font-semibold text-white hover:bg-red-500 disabled:opacity-60"
      >
        {pending ? "삭제 중…" : "삭제"}
      </button>
    </form>
  );
}
