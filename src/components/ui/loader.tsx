import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <motion.div
      className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  );
};