"use client";

import { useActionState, useState } from "react";
import {
  deleteMyInquiry,
  findMyInquiries,
  updateMyInquiry,
  type MyInquiriesState,
  type MyInquiryActionState,
} from "@/app/contact/actions";
import DeleteConfirm from "@/components/DeleteConfirm";
import InquiryContent from "@/components/InquiryContent";
import type { Inquiry } from "@/lib/supabase";

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition-colors focus:border-rose-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50";

const labelClass = "flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300";

type Found = { inquiries: Inquiry[]; password: string };

export default function MyInquiries() {
  // 비밀번호는 저장하지 않고 이 화면에 있는 동안만 기억해 수정·삭제 요청에 함께 보낸다.
  const [found, setFound] = useState<Found | null>(null);

  const [state, lookupAction, looking] = useActionState(
    async (prev: MyInquiriesState, formData: FormData) => {
      const result = await findMyInquiries(prev, formData);
      if (result.status === "success") {
        setFound({ inquiries: result.inquiries, password: String(formData.get("password")) });
      }
      return result;
    },
    { status: "idle" },
  );

  if (found) {
    if (found.inquiries.length === 0) {
      return (
        <div className="flex flex-col items-start gap-4">
          <p className="text-zinc-600 dark:text-zinc-400">남아 있는 문의가 없습니다.</p>
          <button onClick={() => setFound(null)} className="text-sm text-rose-500 hover:underline">
            다른 문의 찾기
          </button>
        </div>
      );
    }
    return (
      <ul className="flex flex-col gap-4">
        {found.inquiries.map((inquiry) => (
          <MyInquiryItem
            key={inquiry.id}
            inquiry={inquiry}
            password={found.password}
            onUpdated={(updated) =>
              setFound({
                ...found,
                inquiries: found.inquiries.map((i) => (i.id === updated.id ? updated : i)),
              })
            }
            onDeleted={() =>
              setFound({ ...found, inquiries: found.inquiries.filter((i) => i.id !== inquiry.id) })
            }
          />
        ))}
      </ul>
    );
  }

  return (
    <form action={lookupAction} className="flex flex-col gap-5">
      <label className={labelClass}>
        이메일
        <input required type="email" name="email" autoComplete="email" className={inputClass} />
      </label>
      <label className={labelClass}>
        비밀번호
        <input
          required
          type="password"
          name="password"
          autoComplete="current-password"
          className={inputClass}
        />
      </label>
      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={looking}
        className="h-12 rounded-full bg-rose-500 font-semibold text-white transition-colors hover:bg-rose-600 disabled:opacity-60"
      >
        {looking ? "찾는 중…" : "내 문의 찾기"}
      </button>
    </form>
  );
}

type ItemProps = {
  inquiry: Inquiry;
  password: string;
  onUpdated: (inquiry: Inquiry) => void;
  onDeleted: () => void;
};

function MyInquiryItem({ inquiry, password, onUpdated, onDeleted }: ItemProps) {
  const [editing, setEditing] = useState(false);

  const [updateState, updateAction, updating] = useActionState(
    async (prev: MyInquiryActionState, formData: FormData) => {
      const result = await updateMyInquiry(inquiry.id, password, prev, formData);
      if (result.status === "success") {
        setEditing(false);
        onUpdated(result.inquiry);
      }
      return result;
    },
    { status: "idle" },
  );
  const [deleteState, deleteAction, deleting] = useActionState(
    async () => {
      const result = await deleteMyInquiry(inquiry.id, password);
      if (result.status === "success") onDeleted();
      return result;
    },
    { status: "idle" },
  );

  const error = editing
    ? updateState.status === "error" && updateState.error
    : deleteState.status === "error" && deleteState.error;

  return (
    <li className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      {editing ? (
        <form action={updateAction} className="flex flex-col gap-4">
          <label className={labelClass}>
            이름 / 회사명
            <input name="name" required maxLength={100} defaultValue={inquiry.name} className={inputClass} />
          </label>
          <label className={labelClass}>
            이메일
            <input
              name="email"
              type="email"
              required
              maxLength={200}
              defaultValue={inquiry.email}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            문의 내용
            <textarea
              name="message"
              required
              rows={6}
              maxLength={5000}
              defaultValue={inquiry.message}
              className={inputClass}
            />
          </label>
          <div className="flex justify-end gap-2 text-sm">
            <button
              type="button"
              onClick={() => setEditing(false)}
              disabled={updating}
              className="rounded-full px-4 py-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={updating}
              className="rounded-full bg-zinc-900 px-4 py-2 font-semibold text-white hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900"
            >
              {updating ? "저장 중…" : "저장"}
            </button>
          </div>
        </form>
      ) : (
        <>
          <InquiryContent inquiry={inquiry} />
          <div className="mt-4 flex justify-end gap-2 text-sm">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="rounded-full px-3 py-1 text-zinc-500 hover:text-rose-500"
            >
              수정
            </button>
            <DeleteConfirm action={deleteAction} pending={deleting} />
          </div>
        </>
      )}
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </li>
  );
}
