import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Product, SiteConfig } from '@/lib/types';

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    }
  });
}

export function useProduct(slug: string) {
  return useQuery<Product>({
    queryKey: ['product', slug],
    queryFn: async () => {
      const response = await fetch(`/api/products/${slug}`);
      if (!response.ok) throw new Error('Product not found');
      return response.json();
    },
    enabled: Boolean(slug)
  });
}

export function useSiteConfig() {
  return useQuery<SiteConfig | null>({
    queryKey: ['site-config'],
    queryFn: async () => {
      const response = await fetch('/api/site-config');
      if (!response.ok) throw new Error('Failed to fetch site config');
      return response.json();
    }
  });
}

export function useAdminSession() {
  return useQuery<{ isAuthenticated: boolean }>({
    queryKey: ['admin-session'],
    queryFn: async () => {
      const response = await fetch('/api/admin/session');
      if (!response.ok) throw new Error('Failed to fetch admin session');
      return response.json();
    }
  });
}

export function useAdminMutations() {
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Failed to create product');
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] })
  });

  const updateConfigMutation = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await fetch('/api/site-config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Failed to save config');
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['site-config'] })
  });

  return { createProductMutation, updateConfigMutation };
}
