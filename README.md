# Murtikar Next.js Website (Supabase-powered)

This project is a working starter for a **sales-focused gifting & sculpture website** with:

- Modern themed storefront using your brand colors
- Product listing + product detail storytelling
- Trust-first purchase flow (price revealed on product selection pages)
- Admin panel (`/admin`) for owner-managed products and homepage configuration
- Supabase integration for products and website settings

## 1) Environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_PANEL_PASSWORD=choose_a_secure_password
```

## 2) Database setup

Run SQL in Supabase SQL editor:

- `supabase/schema.sql`

Then add one initial row to `site_config`, for example:

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

## 4) Admin panel behavior

- Login with `ADMIN_PANEL_PASSWORD`
- Add products with story + rationale + pricing behavior
- Configure hero content, WhatsApp link, and trust badges

## 5) Suggested next enhancements

- Add Supabase Auth for role-based admin users
- Add Supabase Storage for customer review media uploads
- Add checkout provider (Stripe/Razorpay)
- Add search indexing for smarter gift suggestions
