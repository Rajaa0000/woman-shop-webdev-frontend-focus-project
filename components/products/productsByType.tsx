'use client'
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsByType(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/productsByType", {
        method: 'POST',
        body: JSON.stringify({ type: props.type }),
      });
      const data = await res.json();
      setProducts(data);
    }

    fetchProducts();
  }, [props.type]); // added dependency for safety

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[2rem] px-[2rem] py-[3rem]">
      {products && products.map((product) => {
        const colorsList = product.colors?.map((item, index) => (
          <div
            key={index}
            className="w-[0.8rem] h-[0.8rem] border-[1px] border-gray-300 "
            style={{ backgroundColor: item.hex }}
          ></div>
        ));

        return (
          <Link
            key={product._id}
            href={`/product/${product._id}`}
            className="no-underline text-black flex flex-col items-center"
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-auto w-full object-cover"
              />
            )}
            <div className="py-[0.8rem] flex flex-col gap-[0.3rem] items-start ">
              <p className="font-[700] text-[1.4rem] leading-none">
                {product.name.toUpperCase()}
              </p>
              <p className="text-[1.2rem] font-[600]">{product.price} DA</p>
              <div className="flex gap-[0.5rem] py-[0.4rem]">{colorsList}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
