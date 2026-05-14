"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export default function MotionWrapper({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div {...props}>
      {children}
    </motion.div>
  );
}
