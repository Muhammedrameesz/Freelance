import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import useThemeStore from "../store/useThemeStore";

export default function AnimatedButton({ text }) {
  const [hover, setHover] = useState(false);
  const { theme } = useThemeStore();

  // Theme-based colors
  const isDark = theme === "dark";

  return (
    <div className="mt-5">
      <motion.button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-full relative cursor-pointer
                    overflow-hidden transition-colors duration-300 border 
                    ${isDark ? "border-white bg-black text-white" : "border-black bg-white text-black"}`}
      >
        {/* Background Animation */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full w-full"
          initial={{ height: 0 }}
          animate={hover ? { height: "100%" } : { height: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ backgroundColor: isDark ? "#ffffff" : "#000000" }} // Dynamic bg color on hover
        />

        {/* Text */}
        <motion.span
          className="relative z-10"
          initial={{ color: isDark ? "#ffffff" : "#000000" }}
          animate={hover ? { color: isDark ? "#000000" : "#ffffff" } : { color: isDark ? "#ffffff" : "#000000" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text || "Add Text"}
        </motion.span>

        {/* Arrow Icon */}
        <motion.span
          className="relative z-10 inline-block"
          initial={{ color: isDark ? "#ffffff" : "#000000" }}
          animate={hover ? { color: isDark ? "#000000" : "#ffffff" } : { color: isDark ? "#ffffff" : "#000000" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <FaLongArrowAltRight />
        </motion.span>
      </motion.button>
    </div>
  );
}

AnimatedButton.propTypes = {
  text: PropTypes.string.isRequired,
};
