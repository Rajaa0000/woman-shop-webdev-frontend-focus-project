import NewProducts from "@/components/products/newProducts";
import Image from "next/image";
import ProductsByType from "@/components/products/productsByType";
import MainProduct from '@/components/products/MainProduct';
import Link from "next/link";
function Page(){
  
  return (
  <main>
    <div className=" h-[700px] w-full relative flex items-center justify-center flex-col bg-[#f2f2f2] gap-[2rem]">
        <p className=" text-center text-[2.5rem] " ><span className="block text-[4rem] leading-none "><br/>SALE</span>UP TO 50% OFF</p>
        <Link href={"/clothes"} className="px-[1rem] py-[0.5rem]  bg-white tracking-[0.1rem] cursor-pointer" >shop now</Link>
    </div>
    <section >
      <MainProduct type='clothes'/>
    </section>
    <section >
      <MainProduct type='shoes'/>
    </section>
    <section >
      <MainProduct type='accessories'/>
    </section>
    <NewProducts/>
   
   
   
   
  </main>)
}
export default Page;