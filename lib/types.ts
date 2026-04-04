export type Product = {
  id: string;
  title: string;
  slug: string;
  category: string;
  relationship: string;
  motto: string;
  story: string;
  why_buy: string;
  image_url: string;
  base_price: number | null;
  show_price: boolean;
  customizable: boolean;
  created_at?: string;
};

export type SiteConfig = {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  whatsapp_link: string;
  trust_badges: string[];
};
