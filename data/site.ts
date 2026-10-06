// 사이트 전반에서 쓰는 내용. 실제 정보로 바꿔 쓰면 모든 페이지에 반영된다.
// 아래 항목들은 모두 예시 내용이다.

export const profile = {
  name: "정혜윤",
  role: "Content Marketer",
  headline: "사람의 마음을 움직이는 콘텐츠를 만듭니다.",
  summary:
    "브랜드가 가진 이야기를 고객이 공감할 수 있는 언어로 풀어내는 콘텐츠 마케터를 준비하고 있습니다. 무엇을 말할지보다 누구에게, 어떻게 전할지를 먼저 고민합니다.",
  keywords: ["스토리텔링", "SNS 콘텐츠", "데이터 기반 개선"],
};

export type Section = {
  href: string;
  title: string;
  english: string;
  description: string;
};

export const sections: Section[] = [
  {
    href: "/portfolio",
    title: "포트폴리오",
    english: "Portfolio",
    description: "기획하고 제작한 콘텐츠와 캠페인",
  },
  {
    href: "/career",
    title: "경력",
    english: "Career",
    description: "일하며 쌓아 온 경험",
  },
  {
    href: "/awards",
    title: "수상",
    english: "Awards",
    description: "공모전과 대외활동에서 받은 상",
  },
  {
    href: "/certifications",
    title: "자격",
    english: "Certifications",
    description: "마케팅·데이터 관련 자격증",
  },
  {
    href: "/etc",
    title: "그 외",
    english: "More",
    description: "교육, 대외활동, 관심사",
  },
];

export type PortfolioItem = {
  title: string;
  category: string;
  description: string;
  tags: string[];
};

export const portfolio: PortfolioItem[] = [
  {
    title: "브랜드 인스타그램 리뉴얼 기획",
    category: "SNS",
    description: "톤앤매너를 재정의하고 카드뉴스 시리즈를 기획했습니다.",
    tags: ["Instagram", "카드뉴스", "브랜딩"],
  },
  {
    title: "블로그 SEO 콘텐츠 시리즈",
    category: "Blog",
    description: "검색 키워드 분석을 바탕으로 정보성 글 10편을 작성했습니다.",
    tags: ["SEO", "키워드 분석", "글쓰기"],
  },
  {
    title: "숏폼 영상 캠페인",
    category: "Video",
    description: "릴스·쇼츠용 15초 영상의 기획과 스크립트를 맡았습니다.",
    tags: ["Reels", "Shorts", "스크립트"],
  },
  {
    title: "뉴스레터 콘텐츠 제작",
    category: "Newsletter",
    description: "구독자 관심사에 맞춘 주간 뉴스레터를 기획했습니다.",
    tags: ["뉴스레터", "카피라이팅"],
  },
];

export type TimelineItem = {
  period: string;
  title: string;
  organization: string;
  description?: string;
};

export const career: TimelineItem[] = [
  {
    period: "2025.07 – 2025.12",
    title: "콘텐츠 마케팅 인턴",
    organization: "OO 스타트업",
    description: "브랜드 SNS 채널 운영, 콘텐츠 기획 및 성과 리포트 작성",
  },
  {
    period: "2025.01 – 2025.06",
    title: "서포터즈 콘텐츠 크리에이터",
    organization: "OO 기업 대학생 서포터즈",
    description: "월 4회 체험 콘텐츠 제작 및 블로그 발행",
  },
];

export const awards: TimelineItem[] = [
  {
    period: "2025.11",
    title: "우수상",
    organization: "OO 마케팅 공모전",
    description: "Z세대 타깃 SNS 캠페인 기획안",
  },
  {
    period: "2025.05",
    title: "장려상",
    organization: "OO 콘텐츠 아이디어 공모전",
  },
];

export const certifications: TimelineItem[] = [
  {
    period: "2025.09",
    title: "GAIQ (Google Analytics 자격)",
    organization: "Google",
  },
  {
    period: "2025.06",
    title: "사회조사분석사 2급",
    organization: "한국산업인력공단",
  },
  {
    period: "2024.12",
    title: "컴퓨터활용능력 1급",
    organization: "대한상공회의소",
  },
];

export const etc: TimelineItem[] = [
  {
    period: "2025.03 – 2025.08",
    title: "디지털 마케팅 실무 과정 수료",
    organization: "OO 교육기관",
  },
  {
    period: "2024 –",
    title: "개인 블로그 운영",
    organization: "콘텐츠 트렌드 기록",
    description: "매주 마케팅 사례를 분석해 글로 정리하고 있습니다.",
  },
];
