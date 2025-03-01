import React from "react";
import useThemeStore from "../store/useThemeStore";
import { motion } from "framer-motion";
import AnimatedButton from "../ui/AnimatedButton";
import Anim from "../ui/Anim.jsx"
import HeaderImage from "../assets/images/HeaderImage1.png"
import Image2 from "../assets/images/2826448_20742-removebg-preview.png"

export default function Header() {
  const { theme } = useThemeStore();
  const headerText =
    "Elevate Your Digital Presence with High Performance Web Solutions.".split(
      ""
    );
  return (
    <div className={`py-10 pt-36 `}>
      <main className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-10 mx-auto max-w-7xl">
        <section className=" space-y-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1}}
            className={`font-semibold  `}
          >
            {headerText.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.1 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <Anim delay={6}>
          <p className={`text-lg font-medium ${theme==='dark' ?"text-gray-400":"text-gray-600" }`}>
            We craft high-performance, responsive, and dynamic websites with
            seamless animations, unmatched scalability, and enterprise-grade
            security. From development to end-to-end hosting, we deliver
            next-gen web solutions that elevate your brand.
          </p>
          </Anim>
          <Anim delay={7}>
          <h2 className="font-semibold text-2xl">
            Let’s create something extraordinary—together!
          </h2>
          </Anim>
        
         <AnimatedButton text={['Contact Us']}/>
        
        </section>

        <section>
          <img
            src={theme==='dark'?HeaderImage:Image2}
            alt="web"
            className="w-full h-auto"
          />
        </section>
      </main>
    </div>
  );
}
