'use client'
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/sanity.client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { faChevronUp, faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductsByType from "./productsByType";

export default function NewProducts(props) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Set initial width
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [product, setProduct] = useState(null);
  const [colorsAppear, setColorAppear] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shopNowOn, setShopNowOn] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let res = await fetch("/api/oneProduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: props.id }),
        });
        let data = await res.json();
        setProduct(data[0]);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, [props.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShopNowOn(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 1500);
  };

  const components = {
    types: {
      image: ({ value }) => (
        <img src={urlFor(value).width(600).url()} alt="PortableText image" />
      ),
    },
    marks: {
      link: ({ children, value }) => (
        <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          {children}
        </a>
      ),
    },
    block: {
      h1: ({ children }) => <h1 className="text-[2rem] pb-[0.5rem] font-bold underline">{children}</h1>,
      h2: ({ children }) => <h2 className="text-[1.5rem] pb-[0.5rem] font-bold underline">{children}</h2>,
    },
  };

  let colorsList = [];
  if (product && product.colors) {
    colorsList = product.colors.slice(1).map((item, index) => (
      <div key={index} className="flex justify-between border-r-[2px] border-b-[2px] border-l-[2px] border-gray-300 w-[60%] px-[1rem] py-[0.5rem] items-center">
        <div className="flex gap-[1rem] items-center ">
          <div className="w-[1.2rem] h-[1.2rem]" style={{ backgroundColor: `${item.hex}` }}></div>
          <p>{item.name}</p>
        </div>
      </div>
    ));
  }

  return (
    <div className="w-full flex flex-col relative overflow-x-hidden">
      {product && (
        <div className="w-screen md:flex md:flex-col gap-[2rem] ">
          {/* ================= DIV 1: IMAGES + INFO ================= */}
          <div className="md:flex md:items-center md:justify-center ">
            <div className="md:w-1/2 lg:w-[70%] ">
              <div
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide relative w-full"
                onScroll={(e) => {
                  const scrollLeft = e.currentTarget.scrollLeft;
                  const itemWidth = e.currentTarget.clientWidth;
                  const idx = Math.round(scrollLeft / itemWidth);
                  setActiveIndex(idx);
                }}
              >
                {[product.mainImage, ...(product.images || [])].map((img, i) => (
                  <Image
                    key={i}
                    src={urlFor(img).url()}
                    alt={`${product.name}-${i}`}
                    width={600}
                    height={800}
                    className="w-full md:w-[100%] h-[700px] object-cover lg:w-[50%]"
                    quality={100}
                  />
                ))}
              </div>

              <div className="flex justify-center gap-2 mt-2 lg:hidden">
                {[product.mainImage, ...(product.images || [])].map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-6 h-[2px] rounded-full ${idx === activeIndex ? "bg-black" : "bg-gray-300"}`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center font-[sans] font-bold gap-[1rem] py-[1.5rem]">
              <p className="text-[1.2rem]">{product.name}</p>
              <p className="text-[1rem] font-[800]">{product.price}da</p>

              {product.type === "clothes" && product.size && (
                <div className="border-gray-300 border-[2px] flex">
                  {product.size.map((item, index) => (
                    <p className="py-[0.5rem] px-[1rem]" key={index}>{item}</p>
                  ))}
                </div>
              )}
              {product.type === "shoes" && (
                <div className="border-gray-300 border-[2px] flex">
                  {["37", "39", "40", "41"].map((item, index) => (
                    <p className="py-[0.5rem] px-[1rem]" key={index}>{item}</p>
                  ))}
                </div>
              )}

              {/* COLORS SECTION */}
              {product.colors && product.colors.length > 0 && (
                width < 900 ? (
                  <div className="flex flex-col w-full items-center">
                    <div className="flex justify-between w-[60%] px-[1rem] py-[0.5rem] items-center border-gray-300 border-[2px]">
                      <div className="flex items-center gap-[1rem]">
                        <div className="w-[1.2rem] h-[1.2rem]" style={{ backgroundColor: `${product.colors[0].hex}` }}></div>
                        <p>{product.colors[0].name}</p>
                      </div>
                      <p onClick={() => setColorAppear((prev) => !prev)} className="cursor-pointer">
                        <FontAwesomeIcon icon={colorsAppear ? faChevronDown : faChevronUp} />
                      </p>
                    </div>
                    <AnimatePresence>
                      {colorsAppear && (
                        <motion.div
                          className="w-full flex flex-col items-center"
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          exit={{ opacity: 0, scaleY: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          style={{ transformOrigin: "top" }}
                        >
                          {colorsList}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex flex-col w-full items-center">
                    <div className="flex justify-between border border-gray-400 w-[60%] px-[1rem] py-[0.5rem] items-center">
                      <div className="flex gap-[1rem] items-center ">
                        <div className="w-[1.2rem] h-[1.2rem]" style={{ backgroundColor: `${product.colors[0].hex}` }}></div>
                        <p>{product.colors[0].name}</p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-center">{colorsList}</div>
                  </div>
                )
              )}

              <button
                className="py-[0.5rem] px-[2rem] bg-black text-white font-[serif] hover:bg-gray-500 transition rounded-md"
                onClick={() => setShopNowOn(true)}
              >
                Shop Now
              </button>
            </div>
          </div>

          <div className="mx-[1rem] lg:w-[80%] lg:mx-auto normal-case">
            <PortableText value={product.productDesc} components={components} />
          </div>
        </div>
      )}

      {product && (
        <div className="w-full">
          <p className="text-[3rem] text-center py-[3rem] font-[700]">discover more of our products</p>
          <ProductsByType type={product.type} />
        </div>
      )}

      {/* SHOP FORM MODAL */}
      {shopNowOn && product && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[90%] md:w-[50%] h-[80vh] relative shadow-xl overflow-y-auto p-6">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-black" onClick={() => setShopNowOn(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="flex flex-col items-center gap-3 mb-4">
              <Image
                src={urlFor(product.mainImage).width(400).url()}
                alt={product.name}
                width={200}
                height={250}
                className="rounded-md object-contain"
              />
              <p className="font-semibold text-lg">{product.name}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-md" required />
              <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-md" required />
              <input type="tel" placeholder="Phone Number" className="w-full p-3 border rounded-md" required />

              <label className="font-semibold block">Choose Size</label>
              <select className="w-full p-3 border rounded-md" required>
                {product.type === "clothes" ? product.size?.map((s, i) => <option key={i} value={s}>{s}</option>) : 
                 ["37", "39", "40", "41"].map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>

              <label className="font-semibold block">Choose Color</label>
              <select className="w-full p-3 border rounded-md" required>
                {product.colors?.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
              </select>

              <button type="submit" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition w-full">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="text-white font-semibold text-center fixed inset-0 z-[100] flex justify-center items-center bg-black/50">
          <div className="bg-black p-8 rounded-lg">
            <p>Buying completed successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}