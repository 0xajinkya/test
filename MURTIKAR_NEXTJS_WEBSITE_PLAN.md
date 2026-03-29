# Murtikar Next.js Website Plan

## 1) Brand Direction

Build a modern, trust-first ecommerce experience for gifting and sculptures. The website should look premium, guide users to purchase decisions, and keep product discovery simple.

### Color System
- **Primary text:** `#7B5844`
- **Background:** `#F0E6DC`
- **Dark accent:** `#3E2723`

### UI Tone
- Warm, handcrafted, elegant
- High-contrast CTAs using dark accent color
- Generous whitespace to showcase products and stories

---

## 2) Site Architecture (Conversion-Focused)

### Core Pages
1. **Home**
   - Hero with emotional gifting message
   - Highlighted search bar
   - Relationship categories + motto categories
   - Trust blocks (reviews, craftsmanship, delivery assurance)
   - “Customize Your Gift” teaser section

2. **Category Listing**
   - Relationship-based: Girlfriend, Parents, Friends
   - Motto-based gifting themes
   - Clear filters and sorting

3. **Product Detail Page (PDP)**
   - Storytelling imagery and meaning behind the product
   - “Why buy this” value section (Saatchi Art-inspired)
   - Customer note/message field
   - Customization options
   - Price shown **only after product selection/variant choice**
   - Reviews section at bottom (image/video)

4. **Customization Flow**
   - Guided personalization steps
   - Preview + notes + confirmation

5. **Contact / Buyer Connection**
   - Fast communication option (form + WhatsApp/chat link)
   - FAQ for gifting, shipping, custom orders

---

## 3) Information Architecture for Categories

### A. Relationship-Based Gifting
- Gifts for Girlfriend
- Gifts for Parents
- Gifts for Friends

### B. Motto-Based Gifting
- Love & Appreciation
- Motivation & Strength
- Gratitude & Celebration
- Spiritual & Meaningful

### C. Smart Suggestion System
- Input signals:
  - Relationship
  - Occasion
  - Budget range (optional, private in flow)
  - Style preference
- Output:
  - Curated recommendations with rationale (“Why this fits”)

---

## 4) Pricing & Trust Strategy

### Pricing Rule
- Do not show final pricing on the first page/home feed.
- Show pricing once user opens product and selects key options.

### Trust Builders
- Quality promise and material authenticity
- Real customer media reviews (image/video)
- Clear delivery timelines and returns policy
- Story-led product descriptions

---

## 5) Feature Requirements

## 5.1 Highlighted Search
- Prominent top placement on Home and PLP
- Search by relationship, occasion, motto, and product type
- Autocomplete with suggested intents

## 5.2 Customer Note / Message
- Add optional gift note at PDP/cart stage
- Character limit + preview
- Persist note to order metadata

## 5.3 Customize Your Gift
- Entry point from Home and PDP
- Step-by-step form:
  1. Choose base product
  2. Add name/date/message
  3. Upload reference image (optional)
  4. Select finish/material
  5. Review and submit

## 5.4 Reviews with Media
- Review block at bottom of PDP
- Support image and short video uploads
- Include customer name, occasion, and date
- Add moderation workflow before publishing

---

## 6) Saatchi Art-Inspired Content Model

Each product page should include:
1. **Story section:** emotional/cultural meaning
2. **Why this gift works:** recipient-fit and occasion-fit bullets
3. **Craftsmanship details:** material, handwork, process
4. **Visual narrative:** gallery with contextual lifestyle images

---

## 7) Suggested Tech Stack (Next.js)

- **Framework:** Next.js (App Router)
- **UI:** Tailwind CSS + component library (e.g., shadcn/ui)
- **Data:** PostgreSQL + Prisma (or headless CMS for content)
- **Auth (optional):** NextAuth
- **Media:** Cloudinary/S3 for product + review uploads
- **Search:** Meilisearch/Algolia (or PostgreSQL full-text initially)
- **Analytics:** GA4 + Meta pixel + event tracking

---

## 8) Suggested Page Components

- `HeroWithSearch`
- `RelationshipCategoryGrid`
- `MottoCategoryCarousel`
- `SmartGiftFinder`
- `TrustSignals`
- `ProductStorySection`
- `WhyBuyThis`
- `CustomizationConfigurator`
- `GiftNoteField`
- `MediaReviews`
- `StickyPurchaseBar`

---

## 9) Conversion Funnel (User Journey)

1. Land on Home and search/select category
2. Browse emotionally relevant collections
3. Open PDP and read story + value reasons
4. Customize product and add gift note
5. View pricing after selection
6. Add to cart and checkout
7. Post-purchase: request image/video review

---

## 10) MVP Delivery Roadmap

### Phase 1 (Weeks 1–2): Foundation
- Theme, layout, navigation, Home, Category, PDP skeleton
- Relationship and motto category structures

### Phase 2 (Weeks 3–4): Commerce Experience
- Product options and conditional pricing display
- Gift note support
- Checkout integration

### Phase 3 (Weeks 5–6): Differentiators
- Customization flow
- Smart gift suggestion logic
- Media reviews module

### Phase 4 (Week 7): Optimization
- Tracking events, funnel analysis, A/B tests
- Performance and SEO optimization

---

## 11) Success Metrics

- Conversion rate (home → PDP, PDP → cart, cart → purchase)
- Search-to-purchase rate
- Customization usage rate
- Review submission rate (image/video)
- Average order value

---

## 12) Immediate Next Actions

1. Approve sitemap and content hierarchy
2. Finalize category taxonomy and product attributes
3. Design wireframes for Home, PLP, PDP, and customization flow
4. Start Next.js project setup with core components
