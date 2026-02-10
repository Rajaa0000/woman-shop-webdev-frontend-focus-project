'use client'
import Link from "next/link";
import { motion,AnimatePresence } from "framer-motion";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState,useEffect } from "react";
import { faFacebook, faInstagram, faPinterest, faYoutube, faTiktok } from "@fortawesome/free-brands-svg-icons";

function Footer() {


  const [socialMedia, setSocialMedia] = useState(false);

  const socialMediaList = ['Facebook', 'Instagram', 'Pinterest', 'Youtube', 'Tiktok'];
  const socialMediaIcons = [faFacebook, faInstagram, faPinterest, faYoutube, faTiktok];

  const socialMedialist = socialMediaList.map((item, index) => {
    return (
      <li className="flex  gap-[1rem] px-[1rem]  py-[0.5rem] " key={index}>
       <FontAwesomeIcon icon={socialMediaIcons[index]} 
        className="text-[#757575] text-[1.5rem]"/>
        <p 
         className="text-[#757575]" >{item}</p>

      </li>
    );
  });

  const menuLinks = ["Delivery&Payment", "ourStores", "AboutUs", "ContactUs","Privacy&Terms"];
  const menuElements = ["Payment", "Our Stores", "About Us", "Contact Us","Privacy & Terms"];

  const linksList = menuLinks.map((item, index) => {
    return (
      <Link href={`/${item}`} key={index}
       className="py-[0.4rem] px-[1rem]  underline decoration-1 underline-offset-1 hover:text-gray-400 transition ">
        {menuElements[index]}
      </Link>
    );
  });

  return (
    <footer className="border-t-[1px] border-t-gray-200   flex flex-col">
      <div className="text-[1.2rem] font-[300]  w-full flex flex-col  md:items-center lg:grid-cols-2 md:grid">
        {linksList}
       
      </div>
    <div className="px-[1rem] flex gap-[0.5rem] text-[1.2rem] font-[300]  items-center">
          <p>get in touch </p>
          {socialMedia ? (
            <FontAwesomeIcon 
              icon={faChevronUp}
              onClick={() => setSocialMedia(false)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              onClick={() => setSocialMedia(true)}
            />
          )}
        </div >
        <AnimatePresence>
      {socialMedia && (
        <motion.ul className="py-[1rem] md:grid-cols-2  md:w-1/2 md:grid"             initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}>
          {socialMedialist}
        </motion.ul>
      )}
      </AnimatePresence>

      <div className="flex justify-center py-[0.5rem] px-[1rem] ">
        <p className="text-[#757575] text-[1rem] ">
          © 2025 RAJAA, Inc.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
