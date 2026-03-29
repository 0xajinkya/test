import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/data';

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="section">
      <div className="container" style={{ display: 'grid', gap: '1rem' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image_url} alt={product.title} style={{ width: '100%', maxHeight: 450, objectFit: 'cover' }} />
        <h1>{product.title}</h1>
        <p>{product.story}</p>

        <section>
          <h3>Why buy this</h3>
          <p>{product.why_buy}</p>
        </section>

        {product.customizable && (
          <section>
            <h3>Customize Your Gift</h3>
            <p>Personalize name, date, message and finish after selection.</p>
          </section>
        )}

        <section>
          <h3>Customer Note</h3>
          <textarea placeholder="Write a gift message for your recipient" rows={4} />
        </section>

        <section>
          <h3>Pricing</h3>
          <p>
            {product.show_price ? `Price: $${product.base_price.toFixed(2)}` : 'Select product options to reveal pricing.'}
          </p>
        </section>

        <section>
          <h3>Image & Video Reviews</h3>
          <p>Customers can upload photo/video reviews after purchase. (Connect your upload flow in Supabase Storage.)</p>
        </section>
      </div>
    </main>
  );
}
