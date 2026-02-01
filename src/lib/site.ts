import siteData from '@data/site.json';

// 型定義
export interface NavItem {
  label: string;
  href: string;
}

export interface Region {
  name: string;
  isMain: boolean;
  worksCount?: number;
  districts?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features?: string[];
  image: string;
  icon?: string;
  priceRange?: string;
  priceNote?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon?: string;
  badge?: string;
}

export interface Reason {
  number: string;
  title: string;
  description: string;
  icon?: string;
}

export interface HistoryItem {
  year: string;
  content: string;
  isCurrent?: boolean;
}

export interface Certification {
  name: string;
  detail?: string;
  image?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SiteData {
  navigation: {
    main: NavItem[];
    footer: NavItem[];
    cta: NavItem;
  };
  company: {
    name: string;
    nameShort: string;
    nameEn: string;
    id: string;
    ceo: string;
    ceoTitle?: string;
    established: string;
    capital: string;
    employees: string;
    business: string;
    license: string;
    associations?: string[];
    catchphrase: string;
    mission: string;
    vision?: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    phoneTel: string;
    fax: string;
    email: string;
    hours: string;
    hoursNote?: string;
  };
  locations: {
    headquarters: {
      name: string;
      zipCode: string;
      prefecture?: string;
      city?: string;
      address: string;
      fullAddress?: string;
      access: string | string[];
      parking?: string;
      mapUrl: string;
      lat?: number;
      lng?: number;
    };
    branches: Array<{
      name: string;
      zipCode: string;
      address: string;
      access: string;
    }>;
  };
  social: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    line?: string;
  };
  images: {
    logo: string;
    logoWhite?: string;
    logoSquare: string;
    logoOnly: string;
    ogImage?: string;
    heroMain?: string;
    companyExterior?: string;
    ceoPortrait?: string;
    areaMap?: string;
  };
  seo: {
    siteUrl: string;
    titleSuffix: string;
    defaultTitle: string;
    defaultDescription: string;
  };
  stats: {
    yearsInBusiness: number;
    yearsInBusinessLabel: string;
    yearsInBusinessUnit: string;
    projectsCompleted: number;
    projectsCompletedLabel: string;
    projectsCompletedUnit: string;
    localYears: number;
    localYearsLabel: string;
    localYearsUnit: string;
    employees: number;
    repeatRate?: number;
    repeatRateLabel?: string;
    repeatRateUnit?: string;
  };
  localVisual: {
    mainRegion: string;
    regions: Region[];
    areaNote?: string;
    areaOutsideNote?: string;
  };
  services: Service[];
  additionalServices?: Array<{
    id: string;
    title: string;
    icon?: string;
  }>;
  pricing?: Array<{
    service: string;
    price: string;
    note?: string;
  }>;
  process: ProcessStep[];
  reasons: Reason[];
  history: HistoryItem[];
  certifications?: Certification[];
  ceo: {
    name: string;
    nameKana?: string;
    title: string;
    image: string;
    greeting?: {
      catchphrase: string;
      paragraphs: string[];
    };
  };
  faq: FAQ[];
  works: Array<{
    slug: string;
    title: string;
    area: string;
    category: string;
    thumbnailImage: string;
  }>;
  news: Array<{
    date: string;
    category: string;
    title: string;
    slug: string;
  }>;
}

// サイトデータをエクスポート
export const site: SiteData = siteData as SiteData;

// よく使うデータへのショートカット
export const navigation = site.navigation;
export const company = site.company;
export const contact = site.contact;
export const locations = site.locations;
export const seo = site.seo;
export const images = site.images;
export const stats = site.stats;
export const localVisual = site.localVisual;
export const services = site.services;
export const reasons = site.reasons;
export const process = site.process;
export const history = site.history;
export const certifications = site.certifications;
export const ceo = site.ceo;
export const faq = site.faq;

// ヘルパー関数
export function getMainRegion(): string {
  return site.localVisual.mainRegion;
}

export function getRegions(): Region[] {
  return site.localVisual.regions;
}

export function getServiceById(id: string): Service | undefined {
  return site.services.find(s => s.id === id);
}

export function getStatsForHero() {
  return [
    {
      label: site.stats.yearsInBusinessLabel,
      value: site.stats.yearsInBusiness,
      unit: site.stats.yearsInBusinessUnit,
    },
    {
      label: site.stats.projectsCompletedLabel,
      value: site.stats.projectsCompleted,
      unit: site.stats.projectsCompletedUnit,
    },
    {
      label: site.stats.localYearsLabel,
      value: site.stats.localYears,
      unit: site.stats.localYearsUnit,
    },
  ];
}
