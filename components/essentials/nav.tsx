'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useState,useEffect } from "react";
import {motion,AnimatePresence} from 'framer-motion'

function Nav() {
     const [menuBar, setMenuBar] = useState(false);
   const [width,setWidth]=useState();
    useEffect(() => {
       // Function to update width on resize
       const handleResize = () =>{ setWidth(window.innerWidth)
        if(width>900){
         setMenuBar(false);
        }
      }
   
       // Add listener when component mounts
       window.addEventListener("resize", handleResize);
   
       // Remove listener when component unmounts
       return () => window.removeEventListener("resize", handleResize);
     }, []);


  const list = ['accessories', 'shoes', 'clothes'];
  const theMenuList = list.map((item, index) => (
    <Link
      key={index}
      href={`/${item}`}
      className="text-lg font-medium py-2 hover:bg-gray-100"
      onClick={()=>{setMenuBar(false)}}
    >
      {item}
    </Link>
  ));

  return (
<nav className="fixed py-[1rem] bg-white flex justify-between
 z-90 w-full items-center px-[1rem] border-b-[1px] border-b-gray-200">
 { width<900 ? <FontAwesomeIcon icon={faBars} className="text-[2rem]"
   onClick={()=>{setMenuBar(true)}}/>
   
   :
   <div  className="flex gap-[2rem] px-[1rem]"
   >{theMenuList}
      </div>}
   <Image src={'/logo.png'}  priority quality={100}
   alt="this is the logo image" width={600} height={300} className="
   w-[10rem] object-cover h-[4rem]"/>
   <AnimatePresence>
   {
   (menuBar) &&
   //
  
   <motion.div initial={{translateX:-400,opacity:0}} animate={{translateX:0,opacity:1}} 
   exit={{translateX:-400,opacity:0}}
   transition={{duration:0.5 , ease:'linear'}}
   className="fixed  inset top-0 z-95 left-0 w-[50%] h-screen flex flex-col 
   bg-white p-[1.5rem]  ">
      <div className="flex justify-end">
      <FontAwesomeIcon  icon={faXmark}  className="text-[2rem]"
   onClick={()=>{setMenuBar(false)}}/>
      </div>

   <div className="flex flex-col">
       {theMenuList}
   </div>
   <section className=" flex  text-gray-400 flex-col justify-left pt-[10rem]">
  <p className="max-w-2xl text-[1.1rem] leading-relaxed">
    Rajaa Shop is a modern women’s fashion brand dedicated to bringing elegance, comfort, and confidence
    to every woman.
  </p>

  <div className=" px-6 py-4 rounded-lg ">
    <p className="text-sm mt-1 underline decoration-1">Phone: <span className="font-medium">+213 555 123 456</span></p>
    <p className="text-sm underline decoration-1">Email: <span className="font-medium">contact@rajaashop.com</span></p>
  </div>
</section>
     
      </motion.div>
   }
   </AnimatePresence>
</nav>
  );
}

export default Nav;
