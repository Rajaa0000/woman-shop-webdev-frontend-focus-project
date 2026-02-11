'use client'
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/sanity.client";
import { motion, AnimatePresence } from 'framer-motion'
import Image from "next/image";
import Link from "next/link";

interface MainProductProps {
  type: string;
}

interface Product {
  _id: string;
  name: string;
  imageUrl?: string;
}

export default function MainProduct(props: MainProductProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/productsByType", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: props.type })
        });
        const data = await res.json();
        if (data.length >8 ){ setProducts(data.slice(0,6)) ;}
        else setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [props.type]);

  return (
    <div className="w-full ">
      {/* 1. Main Banner Section - Fixed Width/Height Logic */}
      <Link className="block relative w-full h-[60vh] md:h-[80vh]" href={`/${props.type}`}>
        <Image
          src={`/mainImages/${props.type}.avif`}
          alt={props.type}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 bg-black/10">
          <h2 className="text-[3rem] md:text-[5rem] lg:text-[7rem] uppercase leading-none font-serif text-black drop-shadow-sm">
            {props.type}
          </h2>
          <button className="px-6 py-2 bg-white text-black text-sm uppercase tracking-[0.2rem] hover:bg-gray-100 transition-colors shadow-md">
            shop now
          </button>
        </div>
      </Link>

      {/* 2. Product List Section - Fixed Responsiveness */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-10 py-10 px-4 items-stretch">
      
        {products  && products.map((product) => (
          <Link 
            key={product._id} 
            href={`/product/${product._id}`} 
            // Changed w-[50%] to w-full for mobile, md:w-[45%] for desktop to prevent the "space" issue
            className='no-underline block w-full md:w-[100%] lg:w-[100%] group'
          >
            {product.imageUrl && (
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            
            <div className="flex flex-col gap-3 py-6">
              <p className=" text-[1.5rem] md:text-[2rem] font-semibold leading-tight uppercase tracking-tighter">
                {product.name}
              </p>
              <button className="border-b border-gray-300 text-gray-500 w-fit text-left text-xs tracking-widest pb-1 hover:border-black hover:text-black transition-all">
                SHOP NOW
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}