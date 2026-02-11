'use client'
import { use } from 'react';
import Product from '@/components/products/product';

// Define the shape of the dynamic parameters
interface PageProps {
  params: Promise<{
    product: string;
    productIndex: string;
  }>;
}

export default function ProductPage({ params }: PageProps) {
  // Unwrap the params promise using the use() hook
  const { productIndex } = use(params);

  return (
    <main>
      <Product id={productIndex}/>
    </main>
  );
}