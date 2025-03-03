import { IoLogoWhatsapp } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import useThemeStore from "../store/useThemeStore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsArrowUpRightCircle, BsArrowUpRightSquare } from "react-icons/bs";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { RiArrowRightUpBoxLine } from "react-icons/ri";

export default function FixedBottom() {
  const { theme } = useThemeStore();
  const [showModal, setShowModal] = useState(false);
  const [showIcons, setShowIcon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowIcon(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const phoneNumbers = ["6238339877", "9656125576"];

  const openWhatsAppChat = (number) => {
    window.open(`https://wa.me/${number}`, "_blank");
    setShowModal(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
     initial={{y:100,opacity:0}}
     animate = {showIcons ?{y:0,opacity:1}:{y:100,opacity:0}}
     transition={{duration:0.5,ease:'easeInOut'}}
    className="fixed bottom-10 right-10 text-5xl space-y-5 flex flex-col items-end z-[9999]">
      <IoLogoWhatsapp
        className={`text-green-500 rounded-full p-2 shadow-md cursor-pointer transition-transform duration-200 hover:scale-110 ${
          theme === "dark" ? "shadow-gray-500" : "shadow-custom"
        }`}
        onClick={() => setShowModal(true)}
      />

      <IoIosArrowUp
        className={`rounded-full p-3 shadow-md cursor-pointer transition-transform duration-200 hover:scale-110 ${
          theme === "dark"
            ? "shadow-gray-500 text-neutral-200 bg-black"
            : "shadow-custom text-neutral-700 bg-white"
        }`}
        onClick={handleScrollToTop}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center ">
          <section className="grid grid-cols-1 bg-white md:grid-cols-2 w-full items-center  rounded-lg overflow-hidden shadow-2xl">
            <div className={`p-8 text-center `}>
              <h2 className="text-5xl font-semibold mb-10 text-black">
                Select a Number
              </h2>
              <div className=" flex flex-col md:flex-row gap-5 min-h-[200px]">
                {phoneNumbers.map((number, index) => (
                  <button
                    key={index}
                    onClick={() => openWhatsAppChat(number)}
                    className="cursor-pointer relative rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
                  >
                    <span className="absolute right-5 top-3 text-4xl"><BsArrowUpRightCircle/></span>
                  
                    {/* <span>< BsArrowUpRightSquare/></span> */}
                    <span className="text-3xl text-transparent bg-clip-text bg-gradient-to-br from-blue-300 via-white to-gray-200"> Chat on WhatsApp:</span>{" "}
                    <span className="text-5xl mt-2 text-transparent bg-clip-text  bg-gradient-to-tr from-white via-white to-blue-300">
                      {" "}
                      {number}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-10 px-4 cursor-pointer py-2 border border-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 text-gray-700 transition"
              >
                Cancel
              </button>
            </div>

            <div className="hidden md:block relative">
              <img
                src="https://img.freepik.com/free-vector/online-tutoring-app-software-abstract-concept-vector-illustration-online-tutoring-session-video-chat-elearning-quarantine-scheduling-software-personal-learning-plan-abstract-metaphor_335657-5876.jpg?t=st=1740918581~exp=1740922181~hmac=e9e291e4ead5541f2240d12e8fc4e39b27f38be4958fbec1a0d8bdfe8e7a1018&w=740"
                alt="WhatsApp Chat"
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        </div>
      )}
    </motion.div>
  );
}
