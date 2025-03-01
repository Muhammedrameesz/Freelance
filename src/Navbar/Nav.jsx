import React, { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import Logo from "../assets/images/Logo1.png";
import { motion, AnimatePresence } from "framer-motion";
import useThemeStore from "../store/useThemeStore";
import { FaSun, FaMoon } from "react-icons/fa"; // React Icons FA
import { MoonStar } from "lucide-react"; // Lucide React

export default function Nav() {
  const { theme, toggleTheme } = useThemeStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTheme,setCurrentTheme] = useState(theme)

  const text = "WelCome To DevPixel.Studio...".split("");

  // Precompute cumulative non-space counts and total non-spaces
  let cumulativeNonSpaces = [];
  let totalNonSpaces = 0;
  text.forEach((letter, index) => {
    if (letter !== " ") totalNonSpaces++;
    cumulativeNonSpaces[index] = totalNonSpaces;
  });

  const [isReversing, setIsReversing] = useState(false);

  useEffect(() => {
    const animationDuration = ((totalNonSpaces - 1) * 0.3 + 0.3) * 1000;
    const timeout = setTimeout(() => {
      setIsReversing((prev) => !prev);
    }, animationDuration);

    return () => clearTimeout(timeout);
  }, [isReversing]);

  useEffect(()=>{
    setCurrentTheme (localStorage.getItem('theme'))
  },[theme])

  return (
    <nav
      style={{ zIndex: 1000 }}
      className={`w-full  fixed z-50 left-1/2 -translate-x-1/2 top-2 px-6 py-4 
        max-w-7xl rounded-full transition-colors duration-300 
        ${
          theme === "dark"
            ? "shadow-gray-500 shadow-base bg-black text-white"
            : "shadow-custom shadow-gray-300 bg-white text-black"
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-around items-center">
        {/* Logo */}
        <motion.img
          src={Logo}
          alt="Logo"
          className="h-[60px] w-[60px] cursor-pointer"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
        />

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <motion.h2 className={`text-2xl  font-semibold  flex gap-1`}>
            {text.map((letter, index) => {
              const isSpace = letter === " ";
              const isLastNonSpace =
                cumulativeNonSpaces[index] === totalNonSpaces;

              return (
                <motion.span
                  key={index}
                  initial={{ opacity: isSpace ? 1 : 0 }}
                  animate={{
                    opacity: isSpace
                      ? 1
                      : isReversing
                      ? isLastNonSpace
                        ? [1, 0]
                        : [1, 1, 0]
                      : [0, 1],
                  }}
                  transition={{
                    duration: isSpace ? 0 : 0.3,
                    delay: isSpace
                      ? 0
                      : isReversing
                      ? (totalNonSpaces - cumulativeNonSpaces[index]) * 0.2
                      : (cumulativeNonSpaces[index] - 1) * 0.2,
                    ease: "easeInOut",
                  }}
                  className={` text-green-500 font-doto ${
                    index > 9 && index <= 19 && "text-red-600"
                  }
                    ${index > 19 && "text-violet-600"}
                  `}
                >
                  {letter}
                </motion.span>
              );
            })}
          </motion.h2>
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-4">
        
          <motion.div
            className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all
          ${theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`}
            onClick={toggleTheme}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
          >
            <motion.div
              className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg
                ${theme==='dark' ?"bg-black ":"bg-white "} `}
              initial={{ x: theme === "dark" ? 28 : 0 }}
              animate={{ x: theme === "dark" ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {currentTheme === "dark" ? (
                <Moon className="text-gray-50" />
              ) : (
                <FaSun className="text-yellow-500" />
              )}
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Mobile Menu"
            className="md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute  top-20 right-5 flex flex-col space-y-4  text-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            {["Home", "About", "Service"].map((item, index) => (
              <motion.h2
                key={index}
                className="cursor-pointer text-lg transition duration-300 text-gray-800 dark:text-white hover:text-[#ff6600] dark:hover:text-[#ff6600]"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.h2>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
