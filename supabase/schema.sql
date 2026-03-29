create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  relationship text not null,
  motto text not null,
  story text not null,
  why_buy text not null,
  image_url text not null,
  base_price numeric(10,2) not null default 0,
  show_price boolean not null default false,
  customizable boolean not null default true,
  created_at timestamp with time zone default now()
);

create table if not exists public.site_config (
  id uuid primary key default gen_random_uuid(),
  hero_title text not null,
  hero_subtitle text not null,
  whatsapp_link text not null,
  trust_badges text[] not null default '{}'
);

alter table public.products enable row level security;
alter table public.site_config enable row level security;

create policy "public read products" on public.products
for select using (true);

create policy "public read site_config" on public.site_config
for select using (true);
