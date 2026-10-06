import Link from "next/link";

type Props = {
  size?: "sm" | "lg";
};

export default function ContactButton({ size = "lg" }: Props) {
  const sizeClass =
    size === "lg" ? "h-14 px-8 text-lg shadow-lg shadow-rose-500/30" : "h-9 px-4 text-sm";

  return (
    <Link
      href="/contact"
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-rose-500 font-semibold text-white transition-colors hover:bg-rose-600 ${sizeClass}`}
    >
      문의하기
      <span aria-hidden>→</span>
    </Link>
  );
}
