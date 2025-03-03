import {
  FaLaptopCode,
  FaMobileAlt,
  FaPaintBrush,
  FaRocket,
  FaDatabase,
  FaCloudUploadAlt,
  FaShieldAlt,
  FaBolt,
  FaCogs,
} from "react-icons/fa";
import Anim from "../ui/Anim.jsx";
import useThemeStore from "../store/useThemeStore";
import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    service: "Custom Web Development",
    icon: <FaLaptopCode />,
    description:
      "Building high-performance, scalable, and dynamic websites using the latest web technologies.",
  },
  {
    service: "Responsive UI/UX Design",
    icon: <FaPaintBrush />,
    description:
      "Crafting visually appealing, user-friendly, and responsive interfaces tailored to your brand.",
  },
  {
    service: "Mobile-Optimized Development",
    icon: <FaMobileAlt />,
    description:
      "Ensuring seamless mobile experiences with optimized layouts and fast performance.",
  },
  {
    service: "SEO & Performance Optimization",
    icon: <FaRocket />,
    description:
      "Improving website speed, SEO ranking, and user engagement with performance optimizations.",
  },
  {
    service: "Backend Development & API Integration",
    icon: <FaDatabase />,
    description:
      "Developing secure and efficient backend systems with API integrations for seamless functionality.",
  },
  {
    service: "Cloud Hosting & Deployment",
    icon: <FaCloudUploadAlt />,
    description:
      "Deploying and managing web applications on cloud platforms like AWS, Vercel, and DigitalOcean.",
  },
  {
    service: "Website Security & Maintenance",
    icon: <FaShieldAlt />,
    description:
      "Implementing security best practices and offering ongoing maintenance to keep your site secure.",
  },
  {
    service: "Lightning-Fast Web Apps",
    icon: <FaBolt />,
    description:
      "Using modern frameworks and optimizations to create fast-loading and interactive web apps.",
  },
  {
    service: "Custom Integrations & Automations",
    icon: <FaCogs />,
    description:
      "Integrating third-party services and automating workflows for better efficiency and functionality.",
  },
];

export default function ServicesList() {
  const { theme } = useThemeStore();
  const [hover, setHover] = useState(null);
  return (
    <section className="">
      <div>
        <h2 className="text-5xl text-center font-semibold ">Our Services</h2>
      </div>

      
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-10 mx-auto max-w-7xl py-10">
          {services.map((service, index) => (
            <Anim key={index} delay={index*.2}>
            <div
              key={index}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
              className={`flex min-h-[200px] items-start gap-4 p-5 rounded-lg shadow-md transform transition-transform duration-300 ${
                hover === index ? "hover:-translate-y-2 shadow-custom" : ""
              } ${theme === "dark" ? "shadow-gray-500" : "shadow-gray-300"}`}
            >
              {/* Icon Animation */}
              <motion.span
                initial={{ rotateY: 0 }}
                animate={
                  hover === index ? { rotateY: [0, 180, 0] } : { rotateY: 0 }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`text-3xl p-5 rounded-full shadow-md transition-colors duration-300 
                  ${hover!==index && theme === "dark" && "bg-black text-[#66ff00] shadow-[#66ff00]"}
                  ${hover!==index && theme !=="dark" &&  "bg-white text-[#66ff00] shadow-gray-400"}
                  ${theme==="dark"  &&  hover===index && "bg-[#66ff00] text-black"} 
                  ${theme!=="dark"  &&  hover===index && "bg-[#66ff00] text-white "}    
                `}
              >
                {service.icon}
              </motion.span>

              {/* Service Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">{service.service}</h3>
                <p
                  className={`font-medium transition-colors duration-300 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {service.description}
                </p>
              </div>
            </div>
            </Anim>
          ))}
        </div>
      
    </section>
  );
}
