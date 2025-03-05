import React from "react";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import useThemeStore from "../store/useThemeStore";
import image from "../assets/images/team/TeamCropped.png";

const teamMembers = [
  {
    name: "Ramees",
    role: "Full Stack Developer",
    contact: "6238339833",
    email: "rameesta456@gmail.com",
    image: image,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure vitae voluptas molestiae qui doloremque maxime, numquam saepe eveniet at libero omnis ea, praesentium perferendis recusandae distinctio cupiditate, eius impedit nulla.",
  },
  {
    name: "Nisar",
    role: "Full Stack Developer",
    contact: "9656125576",
    email: "nizarta79@gmail.com",
    image: image,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure vitae voluptas molestiae qui doloremque maxime, numquam saepe eveniet at libero omnis ea, praesentium perferendis recusandae distinctio cupiditate, eius impedit nulla.",
  },
];

export default function OurTeam() {
  const { theme } = useThemeStore();

  return (
    <div className="py-14 px-6 md:px-10 mx-auto max-w-7xl">
      <h2 className="text-5xl font-bold text-center mb-20 md:mb-14">
        Meet Our Team
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-12 text-lg text-gray-600 dark:text-gray-300">
        We are a team of highly skilled web developers passionate about crafting
        exceptional digital experiences. From stunning UI/UX designs to robust
        backend solutions, we bring innovation and expertise to every project.
      </p>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-20 md:gap-10 max-w-3xl mx-auto">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex relative flex-col justify-center items-center space-y-4 p-8 rounded-3xl 
            ${
              theme === "dark"
                ? "bg-black text-white shadow-base shadow-gray-200"
                : "bg-white shadow-custom text-gray-900"
            }`}
          >
            <img
              src={member.image}
              alt={member.name}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-auto bg-inherit p-2 py-3 rounded-full"
            />
            <h3 className="text-2xl font-semibold mt-10">{member.name}</h3>
            <p className={`text-lg font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              {member.role}
            </p>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-center`}>{member.description}</p>
            <div className="flex items-center space-x-4 mt-4">
              <a
                href={`tel:${member.contact}`}
                className="text-purple-500 text-xl hover:text-green-500 transition-transform duration-300 transform hover:scale-110"
              >
                <IoMdCall />
              </a>
              <a
                href={`mailto:${member.email}`}
                className="text-purple-500 text-xl hover:text-green-500 transition-transform duration-300 transform hover:scale-110"
              >
                <IoMdMail />
              </a>
              <a
                href="#"
                className="text-purple-500 text-xl hover:text-green-500 transition-transform duration-300 transform hover:scale-110"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-purple-500 text-xl hover:text-green-500 transition-transform duration-300 transform hover:scale-110"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-purple-500 text-xl hover:text-green-500 transition-transform duration-300 transform hover:scale-110"
              >
                <FaFacebook />
              </a>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}