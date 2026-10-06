import { sections } from "@/data/site";
import PageHeader from "./PageHeader";

type Props = {
  href: string;
  children: React.ReactNode;
};

// 하위 페이지 공통 틀: sections 데이터에서 제목·설명을 찾아 헤더를 그린다.
export default function SectionPage({ href, children }: Props) {
  const section = sections.find((s) => s.href === href)!;

  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        english={section.english}
        title={section.title}
        description={section.description}
      />
      {children}
    </div>
  );
}
