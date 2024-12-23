"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const FadeIn = ({
  children,
  direction = "up",
  order = 1,
  className,
  y = 20,
  x = 20,
  duration = 0.5,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: y };
      case "down":
        return { y: -y };
      case "left":
        return { x: x };
      case "right":
        return { x: -x };
      case "custom":
        return { x: x, y: y };
      default:
        return { y: y };
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, ...getDirectionOffset() },
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{
        duration: duration,
        delay: (order - 1) * 0.1,
        type: "spring",
        damping: 30,
        stiffness: 120,
      }}
      className={`${className}`}>
      {children}
    </motion.div>
  );
};

export default FadeIn;
