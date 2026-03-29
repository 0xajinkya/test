'use client';

import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProduct } from '@/lib/queries';

type CustomizationForm = {
  name: string;
  date: string;
  message: string;
  customerNote: string;
};

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const slug = params?.id ?? '';
  const { data: product, isLoading } = useProduct(slug);
  const { register, handleSubmit } = useForm<CustomizationForm>();

  if (isLoading) return <main className="container py-8">Loading...</main>;
  if (!product) return <main className="container py-8">Product not found.</main>;

  return (
    <main className="py-8">
      <div className="container grid gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image_url} alt={product.title} className="max-h-[450px] w-full rounded-xl object-cover" />
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p>{product.story}</p>

        <Card>
          <CardHeader>
            <CardTitle>Why buy this</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{product.why_buy}</p>
          </CardContent>
        </Card>

        {product.customizable && (
          <Card>
            <CardHeader>
              <CardTitle>Customize Your Gift</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-3" onSubmit={handleSubmit(() => undefined)}>
                <div className="grid gap-2">
                  <Label>Name engraving</Label>
                  <Input {...register('name')} placeholder="Recipient name" />
                </div>
                <div className="grid gap-2">
                  <Label>Special date</Label>
                  <Input type="date" {...register('date')} />
                </div>
                <div className="grid gap-2">
                  <Label>Gift message</Label>
                  <Textarea {...register('message')} rows={3} />
                </div>
                <div className="grid gap-2">
                  <Label>Customer Note</Label>
                  <Textarea {...register('customerNote')} rows={3} placeholder="Write a gift message for your recipient" />
                </div>
                <Button type="submit">Save customization draft</Button>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{product.show_price ? `Price: $${product.base_price.toFixed(2)}` : 'Select product options to reveal pricing.'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Image & Video Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Customers can upload photo/video reviews after purchase. (Connect your upload flow in Supabase Storage.)</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
