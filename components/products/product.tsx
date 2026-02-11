'use client'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import React, { useEffect, useState } from "react";
import { urlFor } from "@/sanity/sanity.client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { TypedObject } from "@portabletext/types";
import { faChevronUp, faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProductColor {
  name: string;
  hex: string;
}

interface Product {
  _id?: string;
  name: string;
  price: number;
  type: string;
  slodOrNot: boolean;
 productImage: SanityImageSource;    // Fixed: replaced 'any'
  productImages?: SanityImageSource[];
  size?: string[];
  productDesc: TypedObject | TypedObject[];
  colors?: ProductColor[];
}

interface NewProductsProps {
  id: string;
}

export default function NewProducts({ id }: NewProductsProps) {
  const [width, setWidth] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [colorsAppear, setColorAppear] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shopNowOn, setShopNowOn] = useState(false);
  // Helper to safely get images
  const allImages = product ? [product.productImage, ...(product.productImages || [])].filter((img): img is SanityImageSource & { asset: object } => {
        return (typeof img === 'object' && img !== null && 'asset' in img);
      }) 
    : [];

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/oneProduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const data = await res.json();
        if (data && data[0]) {
          setProduct(data[0]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    }
    fetchProducts();
  }, [id]);

  const components: PortableTextComponents = {
    types: {
     image: ({ value }: { value: SanityImageSource }) => {
        // Check if value is the object type we need
        const isImageObject = typeof value === 'object' && value !== null && 'asset' in value;
        
        if (!isImageObject) return null;

        return (
          <img 
            src={urlFor(value).width(800).url()} 
            alt="Product detail" 
            className="rounded-lg my-4 w-full h-auto" 
          />
        );
      },
    },
    block: {
      h1: ({ children }) => <h1 className="text-[2rem] pb-[0.5rem] font-bold">{children}</h1>,
      normal: ({ children }) => <p className="text-gray-700 leading-relaxed pb-4">{children}</p>,
    },
  };

 

  return (
    <div className="w-full flex flex-col relative overflow-x-hidden min-h-screen bg-white
    ">
      {product ? (
        <div className="w-full md:flex md:flex-col gap-[2rem]">
          <div className="md:flex md:items-center md:justify-center">
            {/* Image Gallery */}
            <div className="md:w-1/2 lg:w-[60%]">
              <div
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide relative w-full"
                onScroll={(e) => {
                  const target = e.currentTarget;
                  const idx = Math.round(target.scrollLeft / target.clientWidth);
                  setActiveIndex(idx);
                }}
              >
                {allImages.map((img, i) => (
                  <div key={i} className="lg:w-[50%] w-[100%] h-[900px] md:h-[900px] flex-shrink-0 flex relative">
                    <Image
                      src={urlFor(img).url()}
                      alt={`${product.name}-${i}`}
                      className="object-cover"
                      priority={i === 0}
                      
                      fill
                      
                    />
                  </div>
                ))}
              </div>

              {/* Dots for mobile */}
              <div className="flex justify-center gap-2 mt-4 lg:hidden">
                {allImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-6 h-[2px] transition-all ${idx === activeIndex ? "bg-black" : "bg-gray-300"}`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 flex flex-col items-center font-bold gap-[1.5rem] py-[1.5rem] px-4 text-center">
              <h1 className="text-[1.8rem] uppercase tracking-tighter">{product.name}</h1>
              <p className="text-[1.4rem] font-black">{product.price} DA</p>

              {product.slodOrNot && (
                <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm uppercase">Sold Out</span>
              )}

              {/* Size Selector */}
              {product.size && (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Sizes</p>
                  <div className="flex border border-black divide-x divide-black">
                    {product.type=="clothes"  && product.size.map((s, i) => (
                      <span key={i} className="px-4 py-2 hover:bg-black hover:text-white cursor-pointer transition-colors uppercase">
                        {s}
                      </span>
                    ))}
                      {product.type=="shoes"  && ["40","41","39","38"].map((s, i) => (
                      <span key={i} className="px-4 py-2 hover:bg-black hover:text-white cursor-pointer transition-colors uppercase">
                        {s}
                      </span>
                    ))}
                    
                  </div>
                </div>
              )}
              {/* Colors Section */}
{product.colors && product.colors.length > 0 && (
  <div className="flex flex-col items-center gap-2">
    <p className="text-xs text-gray-400 uppercase tracking-widest">Available Colors</p>
    <div className="flex flex-wrap justify-center gap-3">
      {product.colors.map((color, i) => (
        <div key={i} className="flex flex-col items-center gap-1 group">
          <div 
            className="w-8 h-8  border border-gray-200 shadow-sm transition-transform group-hover:scale-110"
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
          <span className="text-[10px] uppercase text-black font-medium">{color.name}</span>
        </div>
      ))}
    </div>
  </div>
)}

              <button
                disabled={product.slodOrNot}
                onClick={() => setShopNowOn(true)}
                className="w-full max-w-xs py-4 bg-black text-white uppercase tracking-widest hover:bg-gray-900 transition-colors disabled:bg-gray-300"
              >
                {product.slodOrNot ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-4xl mx-auto px-6 py-12 border-t w-full">
            <h3 className="uppercase tracking-widest mb-6 text-gray-400 text-sm">Description</h3>
            <PortableText value={product.productDesc} components={components} />
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-black"></div>
        </div>
      )}
   

    

      {/* Checkout Modal */}
      <AnimatePresence>
        {shopNowOn && product && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ y: 50 }} animate={{ y: 0 }}
              className="bg-white p-8 rounded-none max-w-md w-full relative"
            >
              <button className="absolute top-4 right-4" onClick={() => setShopNowOn(false)}>
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold uppercase mb-2">Checkout</h2>
                <div className="w-20 h-20 mx-auto relative mb-4">
                  <Image src={urlFor(product.productImage).url()} fill className="object-cover" alt="item" />
                </div>
                <p>{product.name}</p>
              </div>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShopNowOn(false); }}>
                <input type="text" placeholder="Full Name" className="w-full p-3 border border-gray-300 focus:border-black outline-none" required />
                <input type="tel" placeholder="Phone Number" className="w-full p-3 border border-gray-300 focus:border-black outline-none" required />
                <button className="w-full bg-black text-white py-3 uppercase tracking-widest">Confirm Order</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}