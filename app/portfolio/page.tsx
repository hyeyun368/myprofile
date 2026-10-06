import type { Metadata } from "next";
import PortfolioCard from "@/components/PortfolioCard";
import SectionPage from "@/components/SectionPage";
import { portfolio } from "@/data/site";

export const metadata: Metadata = { title: "포트폴리오" };

export default function PortfolioPage() {
  return (
    <SectionPage href="/portfolio">
      <div className="grid gap-6 sm:grid-cols-2">
        {portfolio.map((item) => (
          <PortfolioCard key={item.title} item={item} />
        ))}
      </div>
    </SectionPage>
  );
}
