import Link from 'next/link';
import { CategorySection } from '@/components/CategorySection';
import { ProductCard } from '@/components/ProductCard';
import { SearchAndTrust } from '@/components/SearchAndTrust';
import { getProducts, getSiteConfig } from '@/lib/data';

export default async function HomePage() {
  const [products, config] = await Promise.all([getProducts(), getSiteConfig()]);

  const trustBadges = config?.trust_badges ?? [
    'Trusted handcrafted quality',
    'Secure checkout',
    'Custom notes and personalization'
  ];

  return (
    <main>
      <header className="header">
        <div className="container hero">
          <h1>{config?.hero_title ?? 'Meaningful Gifts & Sculptures for Every Bond'}</h1>
          <p>{config?.hero_subtitle ?? 'Build trust first, tell stories, then guide customers to purchase.'}</p>
          <SearchAndTrust trustBadges={trustBadges} />
          <div style={{ marginTop: 12 }}>
            <Link className="btn" href="/admin">
              Admin Panel
            </Link>
          </div>
        </div>
      </header>

      <CategorySection />

      <section className="section">
        <div className="container">
          <h2>Featured Sculptures & Gifts</h2>
          <div className="card-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <h3>Customer Connection</h3>
          <p>
            Need quick help? Talk to us on WhatsApp:{' '}
            <a href={config?.whatsapp_link ?? '#'}>{config?.whatsapp_link ?? 'Add WhatsApp link in admin config'}</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
