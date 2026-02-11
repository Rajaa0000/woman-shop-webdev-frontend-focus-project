'use client'
import NewProducts from "@/components/products/newProducts";
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/sanity.client";
import Link from "next/link";

// Define the interface to describe the product data
interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  colors: {
    hex: string;
    name: string;
  }[];
}

export default function ProductsByType() {
  // Pass the interface to useState so TypeScript knows 'products' is an array of Products
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/productsByType", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'clothes' })
        });
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="p-[2rem]">
      <h1 className="font-[700] text-[3rem] border-b-[1px] ">Discover Our Special pieces</h1>
      <div className=" w-full flex flex-col justify-center gap-[2rem] items-center md:items-start md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {products && products.map((product) => {
          // Use optional chaining (?.) to prevent errors if colors is undefined
          const colorsList = product.colors?.map((item, index) => {
            return (
              <div 
                className="w-[0.6rem] h-[0.6rem] border-[1px] border-gray-300" 
                key={index} 
                style={{ backgroundColor: `${item.hex}` }}
              ></div>
            );
          });

          return (
            <Link key={product._id} href={`/product/${product._id}`} className="no-underline py-[2rem] w-[100%]">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} width={150} className="h-auto w-[100%] " />
              )}
              <div className="py-[0.5rem] flex flex-col gap-[0.1rem] ">
                <p className="font-[700] text-[1.5rem] leading-none">{product.name.toUpperCase()}</p>
                <p className="text-[1.2rem] font-[600] py-[0]">{product.price}da</p>
                <div className="flex gap-[0.5rem] py-[0.4rem]">{colorsList}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <NewProducts />
    </div>
  );
}