import { motion, AnimatePresence } from "framer-motion";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";

interface AccordionProps {
  headerContent: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export const Accordion: React.FC<AccordionProps> = ({ headerContent, children, isOpen, onToggle }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mb-4">
      {!isOpen && 
        <div 
          className="flex justify-between items-center p-4 cursor-pointer bg-gray-100" 
          onClick={onToggle}
        >
          <Square3Stack3DIcon className="h-6 w-6 text-gray-600 mr-4" />
          {headerContent}
        </div>
      }
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4" onClick={onToggle}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};