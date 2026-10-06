import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import Timeline from "@/components/Timeline";
import { career } from "@/data/site";

export const metadata: Metadata = { title: "경력" };

export default function CareerPage() {
  return (
    <SectionPage href="/career">
      <Timeline items={career} />
    </SectionPage>
  );
}
