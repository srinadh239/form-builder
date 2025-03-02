import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export const Select = ({ value, onChange, children, placeholder, className }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (_jsxs("div", { className: `relative border rounded-md px-3 pt-5 pb-2 ${isFocused ? "border-blue-500" : "border-gray-300"} ${className}`, children: [_jsx("label", { className: `absolute left-3 text-gray-400 text-sm transition-all ${isFocused || value ? "top-1 text-xs text-blue-500" : "top-4 text-sm"}`, children: placeholder }), _jsx("select", { value: value, onChange: onChange, onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), className: "w-full bg-transparent outline-none text-gray-700 pt-1", onClick: (e) => e.stopPropagation(), children: children })] }));
};
