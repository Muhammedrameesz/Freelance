import React from "react";
import PropTypes from "prop-types";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SmoothSlide = ({ children, delay = 0.2, threshold = 0.2 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const animationVariants = {
    hidden: { opacity: 0, x: -150 }, 
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween", 
        ease: "easeOut", 
        duration: 1.1, 
        delay, 
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animationVariants}
    >
      {children}
    </motion.div>
  );
};

// PropTypes validation
SmoothSlide.propTypes = {
  children: PropTypes.node.isRequired, 
  delay: PropTypes.number,            
  threshold: PropTypes.number,       
};

export default SmoothSlide;
