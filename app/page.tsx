import Hero from "@/components/Hero";
import SectionGrid from "@/components/SectionGrid";

export default function Home() {
  return (
    <div className="flex flex-col gap-24">
      <Hero />
      <SectionGrid />
    </div>
  );
}
