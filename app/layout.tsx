import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Murtikar Gifts & Sculptures',
  description: 'Modern gifting storefront for artistic sculptures and meaningful gifts.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
