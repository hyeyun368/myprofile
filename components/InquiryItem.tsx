"use client";

import { useActionState } from "react";
import { deleteInquiry, type InquiryActionState } from "@/app/admin/actions";
import DeleteConfirm from "@/components/DeleteConfirm";
import InquiryContent from "@/components/InquiryContent";
import type { Inquiry } from "@/lib/supabase";

const initialState: InquiryActionState = { status: "idle" };

// 관리자 화면의 문의 한 건. 관리자는 삭제만 할 수 있고 수정은 작성자만 한다.
export default function InquiryItem({ inquiry }: { inquiry: Inquiry }) {
  const [state, deleteAction, deleting] = useActionState(
    deleteInquiry.bind(null, inquiry.id),
    initialState,
  );

  return (
    <li className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <InquiryContent inquiry={inquiry} />
      <div className="mt-4 flex justify-end text-sm">
        <DeleteConfirm action={deleteAction} pending={deleting} />
      </div>
      {state.error && (
        <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}
    </li>
  );
}
