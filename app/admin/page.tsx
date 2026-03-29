'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAdminMutations, useAdminSession, useProducts, useSiteConfig } from '@/lib/queries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type LoginValues = { password: string };
type ProductValues = {
  title: string;
  slug: string;
  category: string;
  relationship: string;
  motto: string;
  image_url: string;
  story: string;
  why_buy: string;
  base_price: number;
  show_price: boolean;
  customizable: boolean;
};

type ConfigValues = {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  whatsapp_link: string;
  trust_badges: string;
};

export default function AdminPage() {
  const { data: session, refetch: refetchSession } = useAdminSession();
  const isAuthed = session?.isAuthenticated ?? false;
  const { data: products = [] } = useProducts();
  const { data: config } = useSiteConfig();
  const { createProductMutation, updateConfigMutation } = useAdminMutations();

  const loginForm = useForm<LoginValues>({ defaultValues: { password: '' } });
  const productForm = useForm<ProductValues>({
    defaultValues: { show_price: false, customizable: true }
  });
  const configForm = useForm<ConfigValues>({
    defaultValues: {
      id: '',
      hero_title: '',
      hero_subtitle: '',
      whatsapp_link: '',
      trust_badges: ''
    }
  });

  useEffect(() => {
    if (config) {
      configForm.reset({
        id: config.id,
        hero_title: config.hero_title,
        hero_subtitle: config.hero_subtitle,
        whatsapp_link: config.whatsapp_link,
        trust_badges: config.trust_badges.join('\n')
      });
    }
  }, [config, configForm]);

  const onLogin = loginForm.handleSubmit(async (values) => {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      loginForm.setError('password', { message: 'Invalid password' });
      return;
    }

    loginForm.reset();
    await refetchSession();
  });

  const onLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    await refetchSession();
  };

  if (!isAuthed) {
    return (
      <main className="py-10">
        <div className="container max-w-lg">
          <Card>
            <CardHeader>
              <CardTitle>Admin Panel Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={onLogin}>
                <div className="grid gap-2">
                  <Label htmlFor="password">Admin password</Label>
                  <Input id="password" type="password" {...loginForm.register('password', { required: 'Password is required' })} />
                  <p className="text-sm text-red-600">{loginForm.formState.errors.password?.message}</p>
                </div>
                <Button type="submit">Login</Button>
                <p className="text-xs">Set ADMIN_PANEL_PASSWORD and ADMIN_SESSION_SECRET in your .env.local file.</p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="py-8">
      <div className="container space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Owner Admin Panel</h1>
          <Button variant="secondary" onClick={onLogout}>
            Logout
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Add Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-3"
                onSubmit={productForm.handleSubmit(async (values) => {
                  await createProductMutation.mutateAsync(values);
                  productForm.reset({ show_price: false, customizable: true } as ProductValues);
                })}
              >
                <Input placeholder="Title" {...productForm.register('title', { required: true })} />
                <Input placeholder="Slug" {...productForm.register('slug', { required: true })} />
                <Input placeholder="Category" {...productForm.register('category', { required: true })} />
                <Input placeholder="Relationship" {...productForm.register('relationship', { required: true })} />
                <Input placeholder="Motto" {...productForm.register('motto', { required: true })} />
                <Input placeholder="Image URL" {...productForm.register('image_url', { required: true })} />
                <Textarea placeholder="Story" rows={3} {...productForm.register('story', { required: true })} />
                <Textarea placeholder="Why buy this" rows={3} {...productForm.register('why_buy', { required: true })} />
                <Input type="number" min="0" step="0.01" placeholder="Base price" {...productForm.register('base_price', { valueAsNumber: true })} />
                <div className="flex items-center gap-2">
                  <Checkbox checked={productForm.watch('show_price')} onCheckedChange={(checked) => productForm.setValue('show_price', Boolean(checked))} />
                  <Label>Show price on product page</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={productForm.watch('customizable')} onCheckedChange={(checked) => productForm.setValue('customizable', Boolean(checked))} />
                  <Label>Customizable</Label>
                </div>
                <Button type="submit" disabled={createProductMutation.isPending}>
                  Create Product
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Homepage Config</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-3"
                onSubmit={configForm.handleSubmit(async (values) => {
                  await updateConfigMutation.mutateAsync({
                    ...values,
                    trust_badges: values.trust_badges
                      .split('\n')
                      .map((item) => item.trim())
                      .filter(Boolean)
                  });
                })}
              >
                <Input type="hidden" {...configForm.register('id')} />
                <Input placeholder="Hero title" {...configForm.register('hero_title', { required: true })} />
                <Textarea rows={3} placeholder="Hero subtitle" {...configForm.register('hero_subtitle', { required: true })} />
                <Input placeholder="WhatsApp link" {...configForm.register('whatsapp_link', { required: true })} />
                <Textarea rows={4} placeholder="Trust badges (one per line)" {...configForm.register('trust_badges', { required: true })} />
                <Button type="submit" disabled={updateConfigMutation.isPending}>
                  Save Config
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Existing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-5">
              {products.map((product) => (
                <li key={product.id}>
                  {product.title} ({product.slug})
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
