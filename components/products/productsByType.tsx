'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";

// 1. Define the interfaces to match your schema and state
interface ProductColor {
  name: string;
  hex: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string; // This comes from your GROQ projection in the API
  colors?: ProductColor[];
}

interface ProductsByTypeProps {
  type: string;
}

export default function ProductsByType({ type }: ProductsByTypeProps) {
  // 2. Type the state array
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/productsByType", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type }),
        });
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products by type:", err);
      }
    }

    fetchProducts();
  }, [type]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[2rem] px-[2rem] py-[3rem]">
      {products && products.map((product) => {
        // 3. React.ReactNode is the best type for JSX mapped lists
        const colorsList: React.ReactNode = product.colors?.map((item, index) => (
          <div
            key={index}
            className="w-[0.8rem] h-[0.8rem] border-[1px] border-gray-300"
            style={{ backgroundColor: item.hex }}
            title={item.name} // Accessibility bonus!
          ></div>
        ));

        return (
          <Link
            key={product._id}
            href={`/product/${product._id}`}
            className="no-underline text-black flex flex-col items-center group"
          >
            {product.imageUrl && (
              <div className="overflow-hidden w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="py-[0.8rem] flex flex-col gap-[0.3rem] items-start w-full">
              <p className="font-[700] text-[1.2rem] leading-none">
                {product.name.toUpperCase()}
              </p>
              <p className="text-[1.1rem] font-[600]">{product.price} DA</p>
              <div className="flex gap-[0.5rem] py-[0.4rem]">{colorsList}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}