"use client";

import { motion } from "framer-motion";

interface IProps {
  children: React.ReactNode;
  delay: number;
}

const FormMotion = ({ children, delay }: IProps) => {
  return (
    <>
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default FormMotion;
