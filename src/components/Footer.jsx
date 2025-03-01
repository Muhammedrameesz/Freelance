import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";
import useThemeStore from "../store/useThemeStore";
import Logo1 from "../assets/images/Logo1.png";

export default function Footer() {
  const { theme } = useThemeStore();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`w-full py-10 px-6 md:px-10 border-t ${
        theme === "dark"
          ? "bg-black border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-evenly  gap-8">
        {/* Branding & About */}
        <div className="max-w-sm">
          <img src={Logo1} alt="logo" className="w-[100px] h-[100px]" />
          <h2 className="font-doto text-xl flex"><span className="text-red-600">DevPixel.</span> <span className="text-violet-600">Studio</span></h2>
          <p
            className={`mt-2 ${
              theme === "dark" ? "text-gray-400" : " dark:text-gray-600"
            }`}
          >
            Crafting high-performance, scalable, and secure web solutions to
            elevate your brand.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-1">
            {["Home", "About", "Services", "Contact"].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 5 }}
                className="cursor-pointer hover:text-[#66ff00] transition-colors duration-300"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold">Connect with Me</h3>
          <div className="flex space-x-4 mt-3">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaEnvelope].map(
              (Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  className="p-2 rounded-full border  transition-colors duration-300"
                  style={{
                    borderColor: theme === "dark" ? "#dddddd" : "#213547",
                    color: theme === "dark" ? "#dddddd" : "#213547",
                  }}
                >
                  <Icon size={18} />
                </motion.a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm mt-8 border-t pt-4 border-gray-300 dark:border-gray-600">
        <p>&copy; {new Date().getFullYear()} DevPixel.Studio All rights reserved.</p>
      </div>
    </motion.footer>
  );
}
