'use client'
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/sanity.client";
import Image from "next/image";
import Link from "next/link";

// Define the Product interface
interface Product {
  _id: string;
  name: string;
  price: number;
  mainImage?: string;
  soldOrNot: boolean;
  colors: {
    hex: string;
  }[];
}

export default function NewProducts() {
  // Use the interface in useState
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/newProducts");
      const data = await res.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <div className="py-[0.5rem] ">
      <h1 className=" text-[3rem] border-b-[2px] font-[600] font-[sans]" >Explore Our New Products</h1>
      <div className=" w-full flex flex-col justify-center items-center md:grid md:grid-cols-2 xl:grid-cols-3 pt-[1rem]">
        {products && products.map((product) => {
          // Added optional chaining here for safety
          const colorsList = product.colors?.map((item, index) => {
            return (
              <div 
                className="w-[0.8rem] h-[0.8rem] border-[1px] border-gray-300" 
                key={index} 
                style={{ backgroundColor: `${item.hex}` }}
              ></div>
            )
          })

          return (
            <Link key={product._id} href={`/product/${product._id}`} className="no-underline py-[2rem] w-full flex gap-[1rem]">
              {product.mainImage && (
                <img src={product.mainImage} alt={product.name} width={150} className="h-auto w-[50%] " />
              )}
              <div className="py-[1rem] flex flex-col gap-[0.5rem] ">
                <p className="font-[600] text-[1rem] leading-none">{product.name.toUpperCase()}</p>
                <p className="text-[1.2rem] font-[600] py-[0]">{product.price}da</p>
                <div className="flex gap-[0.5rem] py-[0.4rem]">{colorsList}</div>
                <p className="font-[600] text-[1rem] "> {product.soldOrNot ? 'sold' : 'available'}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}