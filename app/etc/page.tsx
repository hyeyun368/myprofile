import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import Timeline from "@/components/Timeline";
import { etc } from "@/data/site";

export const metadata: Metadata = { title: "그 외" };

export default function EtcPage() {
  return (
    <SectionPage href="/etc">
      <Timeline items={etc} />
    </SectionPage>
  );
}
