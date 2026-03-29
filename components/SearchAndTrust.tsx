'use client';

import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type SearchValues = { query: string };

export function SearchAndTrust({ trustBadges }: { trustBadges: string[] }) {
  const { register } = useForm<SearchValues>({ defaultValues: { query: '' } });

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <Label htmlFor="gift-search">Find the perfect gift</Label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#9b7f6d]" />
          <Input id="gift-search" className="pl-9" placeholder="Search by relationship, occasion, or sculpture style" {...register('query')} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {trustBadges.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </div>
  );
}
