import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
export const Accordion = ({ headerContent, children, isOpen, onToggle }) => {
    return (_jsxs("div", { className: "bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mb-4", children: [!isOpen &&
                _jsxs("div", { className: "flex justify-between items-center p-4 cursor-pointer bg-gray-100", onClick: onToggle, children: [_jsx(Square3Stack3DIcon, { className: "h-6 w-6 text-gray-600 mr-4" }), headerContent] }), _jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }, transition: { duration: 0.3, ease: "easeInOut" }, className: "overflow-hidden", children: _jsx("div", { className: "p-4", onClick: onToggle, children: children }) })) })] }));
};
