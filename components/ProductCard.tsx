import Link from 'next/link';
import { Product } from '@/lib/types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={product.image_url} alt={product.title} style={{ width: '100%', height: 190, objectFit: 'cover' }} />
      <div className="card-content">
        <h3>{product.title}</h3>
        <p style={{ fontSize: 14 }}>{product.why_buy}</p>
        <p style={{ fontSize: 12, opacity: 0.85 }}>
          {product.relationship} · {product.motto}
        </p>
        <Link className="btn" href={`/products/${product.slug}`}>
          View Product
        </Link>
      </div>
    </article>
  );
}
