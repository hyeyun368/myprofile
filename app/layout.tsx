import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "정혜윤 | 콘텐츠 마케터",
    template: "%s | 정혜윤",
  },
  description: "콘텐츠 마케터 정혜윤의 포트폴리오 사이트",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black">
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
