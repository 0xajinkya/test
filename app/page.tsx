'use client';

import Link from 'next/link';
import { CategorySection } from '@/components/CategorySection';
import { ProductCard } from '@/components/ProductCard';
import { SearchAndTrust } from '@/components/SearchAndTrust';
import { Button } from '@/components/ui/button';
import { useProducts, useSiteConfig } from '@/lib/queries';

export default function HomePage() {
  const { data: products = [] } = useProducts();
  const { data: config } = useSiteConfig();

  const trustBadges = config?.trust_badges ?? ['Trusted handcrafted quality', 'Secure checkout', 'Custom notes and personalization'];

  return (
    <main>
      <header className="py-6">
        <div className="container rounded-2xl bg-gradient-to-r from-[#f8f2ec] to-[#eadacb] p-8">
          <h1 className="text-4xl font-bold">{config?.hero_title ?? 'Meaningful Gifts & Sculptures for Every Bond'}</h1>
          <p className="mt-2 text-lg">{config?.hero_subtitle ?? 'Build trust first, tell stories, then guide customers to purchase.'}</p>
          <div className="mt-6">
            <SearchAndTrust trustBadges={trustBadges} />
          </div>
          <div className="mt-4">
            <Button asChild>
              <Link href="/admin">Admin Panel</Link>
            </Button>
          </div>
        </div>
      </header>

      <CategorySection />

      <section className="py-6">
        <div className="container">
          <h2 className="mb-4 text-2xl font-semibold">Featured Sculptures & Gifts</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-6">
        <div className="container rounded-xl border border-[#dcc8b6] bg-white p-6">
          <h3 className="text-xl font-semibold">Customer Connection</h3>
          <p className="mt-2">
            Need quick help? Talk to us on WhatsApp: <a href={config?.whatsapp_link ?? '#'}>{config?.whatsapp_link ?? 'Add WhatsApp link in admin config'}</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
