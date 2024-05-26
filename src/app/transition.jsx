"use client";

import { motion } from "framer-motion";
import React from "react";

function ChildTransition({ children }) {
  return (
    <motion.div animate={{ y: 0, opacity: 1 }} initial={{ y: 20, opacity: 0 }}>
      {children}
    </motion.div>
  );
}

export default ChildTransition;
