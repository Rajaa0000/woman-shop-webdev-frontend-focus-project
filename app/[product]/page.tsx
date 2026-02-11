'use client'
import { use } from 'react';
import ProductsByType from "@/components/products/productsByType";

// Define the interface for the dynamic route parameters
interface PageProps {
  params: Promise<{
    product: string;
  }>;
}

function Page({ params }: PageProps) {
  // Use the use() hook to unwrap the params Promise
  const { product } = use(params);
   
  return (
    <div>
      <ProductsByType type={product} /> 
    </div>
  );
}

export default Page;