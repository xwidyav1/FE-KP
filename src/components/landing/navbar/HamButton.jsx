import React from "react";
import { MotionConfig, motion } from "framer-motion";

const Hambutton = ({ active, toggleActive }) => {
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}>
      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={toggleActive}
        className="relative h-[10vw] w-[16vw] rounded-[2vw] transition-colors">
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-[0.9vw] w-[8vw] bg-neutral-700"
          style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-[0.9vw] w-[8vw] bg-neutral-700"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-[0.9vw] w-[3vw] bg-neutral-700"
          style={{
            x: "-50%",
            y: "50%",
            bottom: "35%",
            left: "50%",
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 10px)",
    },
  },
};

export default Hambutton;
