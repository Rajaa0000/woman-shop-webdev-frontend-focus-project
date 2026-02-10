'use client'
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/sanity.client";
import {motion,AnimatePresence} from 'framer-motion'
import Image from "next/image";
import Link from "next/link";

export default function MainProduct(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/productsByType", {
        method: 'POST',
        body: JSON.stringify({ type: props.type })
      });
    
      const data = await res.json();
      setProducts(data);
    }

    fetchProducts();
  }, []); // left as you had it (though usually we'd add props.type)
   let colors=[];
  if(products){
   colors=products.map((item)=>{
    <div className="w-[1rem] h-[1rem] padding-[0.5px]" style={{backgroundColor:`${item}`}}>
         
    </div>

   });

  }
  return (
    <div className="w-full">
      <Link className="relative w-full" href={`${props.type}`}>
        <div>
          <Image
            src={`/mainImages/${props.type}.avif`}
            alt={props.type}
            width={100}
            height={300}
            unoptimized
            priority
            className="w-full"
          />
          <div className="absolute top-[40%] w-full flex flex-col justify-center items-center gap-[1rem]">
            <p className="block text-[4rem] leading-none font-[sans]">{props.type}</p>
            <button className="px-[1rem] py-[0.5rem] bg-white tracking-[0.1rem] cursor-pointer">
              shop now
            </button>
          </div>
       
      </div>
     </Link>
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:4 ,ease:"linear"}}
      className=" flex flex-col  items-center py-[2rem] border-none gap-[3rem] md:flex-row md:px-[2rem] md:items-start">
        {products && products.map((product) => (
          <Link key={product._id} href={`/product/${product._id}`} 
          className='no-underline border-none w-[50%] py-[0]'>
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
               
                className="md:h-[35rem] py-[0] my-[0]"
         
                
              />
            )}
            <div>
              <div className="gap-[1rem] flex flex-col py-[0.5rem]">
                <p className="font-[sans] text-[2rem]  font-[600] leading-none">
                  {product.name}
                </p>

                <button className="border-b-[1px] border-b-gray-200 text-gray-500 w-[10rem] text-left cursor-pointer">SHOP NOW</button>
              </div>
            </div>
          
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
