
'use client'
import { use } from 'react';
import Product from '@/components/products/product';
export default function ProductPage({ params }) {
  
 const{ productIndex} = use(params);



  return (
    <main>
      <Product id={productIndex}/>
     
    </main>
  );
}
