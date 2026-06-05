export type Language = 'en' | 'ar';

export type Page = 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact';

export interface TranslationModel {
  brand: string;
  brandSub: string;
  tagline: string;
  taglineSub: string;
  exploreBtn: string;
  contactBtn: string;
}

export interface Metric {
  id: string;
  value: string;
  label: { en: string; ar: string };
  description: { en: string; ar: string };
}

export interface ServiceItem {
  id: string;
  title: { en: string; ar: string };
  shortDesc: { en: string; ar: string };
  longDesc: { en: string; ar: string };
  benefits: { en: string[]; ar: string[] };
  process: { title: { en: string; ar: string }; desc: { en: string; ar: string } }[];
  iconName: string;
  duration: { en: string; ar: string };
  industrialStat: { en: string; ar: string };
  image?: string;
}

export interface ProjectItem {
  id: string;
  title: { en: string; ar: string };
  category: string; // 'villas' | 'towers' | 'warehouses' | 'roads' | 'government'
  client: { en: string; ar: string };
  location: { en: string; ar: string };
  year: string;
  area: { en: string; ar: string };
  image: string;
  overview: { en: string; ar: string };
  challenge: { en: string; ar: string };
  solution: { en: string; ar: string };
  result: { en: string; ar: string };
  valValue: { en: string; ar: string };
}

export interface TestimonialItem {
  id: string;
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  company: { en: string; ar: string };
  content: { en: string; ar: string };
  rating: number;
  image: string;
}

export interface FAQItem {
  id: string;
  question: { en: string; ar: string };
  answer: { en: string; ar: string };
}

export interface BlogPostItem {
  id: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  content: { en: string; ar: string };
  category: { en: string; ar: string };
  author: { en: string; ar: string };
  date: string;
  readTime: { en: string; ar: string };
  image: string;
}

export interface MilestoneItem {
  year: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
}

export interface TeamMemberItem {
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  image: string;
  bio: { en: string; ar: string };
}

export interface CertificateItem {
  id: string;
  title: { en: string; ar: string };
  issuer: { en: string; ar: string };
  year: string;
}
