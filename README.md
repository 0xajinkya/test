# Murtikar Next.js Website (Supabase + shadcn/ui)

This project is a sales-focused gifting & sculpture website with:

- Next.js App Router storefront + product detail pages
- shadcn/ui component patterns across forms and layout
- React Query for all API data fetching/mutation
- React Hook Form for search, admin, and customization forms
- Supabase-backed products + site configuration
- Hardened admin guard using signed, expiring HTTP-only cookies

## 1) Environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_PANEL_PASSWORD=choose_a_secure_password
ADMIN_SESSION_SECRET=long_random_secret_at_least_24_chars
```

## 2) Database setup

Run SQL in Supabase SQL editor:

- `supabase/schema.sql`

Then add one initial row to `site_config`:

```sql
insert into public.site_config (hero_title, hero_subtitle, whatsapp_link, trust_badges)
values (
  'Meaningful Gifts & Sculptures for Every Bond',
  'Story-led gifting that builds trust and converts beautifully.',
  'https://wa.me/10000000000',
  '{Trusted handcrafted quality,Secure checkout,Customization available}'
);
```

## 3) Run locally

```bash
npm install
npm run dev
```

Open:

- Storefront: `http://localhost:3000`
- Admin panel: `http://localhost:3000/admin`

## 4) Admin security guards

- Password comparison uses timing-safe checks
- Session cookie is HTTP-only + SameSite strict + signed HMAC token
- Session token has 8-hour expiry and is validated server-side on every admin mutation
- All admin writes are gated in API handlers (`/api/products`, `/api/site-config`)

## 5) Suggested next enhancements

- Add Supabase Auth users + role table for multi-admin teams
- Add Supabase Storage for review media uploads
- Add checkout provider (Stripe/Razorpay)
- Add semantic product search/reranking for smart suggestions
