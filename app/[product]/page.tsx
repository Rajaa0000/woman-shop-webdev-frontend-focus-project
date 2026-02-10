'use client'
import { use } from 'react';
import ProductsByType from "@/components/products/productsByType";
function Page({params}){
   const {product}=use(params);
   
return (
    <div>
        <ProductsByType type=
        {product}/> 
    </div>
)}

export default Page;