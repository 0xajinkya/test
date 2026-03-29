import Link from 'next/link';
import { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={product.image_url} alt={product.title} className="h-48 w-full object-cover" />
      <CardContent className="space-y-3 p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-sm">{product.why_buy}</p>
        <div className="flex gap-2">
          <Badge>{product.relationship}</Badge>
          <Badge variant="secondary">{product.motto}</Badge>
        </div>
        <Button asChild>
          <Link href={`/products/${product.slug}`}>View Product</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
