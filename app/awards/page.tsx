import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import Timeline from "@/components/Timeline";
import { awards } from "@/data/site";

export const metadata: Metadata = { title: "수상" };

export default function AwardsPage() {
  return (
    <SectionPage href="/awards">
      <Timeline items={awards} />
    </SectionPage>
  );
}
