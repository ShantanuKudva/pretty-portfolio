"use client";

import { motion, stagger } from "framer-motion";
import React from "react";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function LeftToRightTransiton({ children }) {
  return (
    <motion.div
      // whileHover={{ y: -10, opacity: 0.8, transition: "easeIn" }}
      whileHover={{
        y: -8,
      }}
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: 100, opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

export default LeftToRightTransiton;
