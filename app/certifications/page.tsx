import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import Timeline from "@/components/Timeline";
import { certifications } from "@/data/site";

export const metadata: Metadata = { title: "자격" };

export default function CertificationsPage() {
  return (
    <SectionPage href="/certifications">
      <Timeline items={certifications} />
    </SectionPage>
  );
}
