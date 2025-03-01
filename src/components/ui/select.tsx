import { useState } from "react";

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ value, onChange, children, placeholder, className }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative border rounded-md px-3 pt-5 pb-2 ${isFocused ? "border-blue-500" : "border-gray-300"} ${className}`}> 
      <label 
        className={`absolute left-3 text-gray-400 text-sm transition-all ${isFocused || value ? "top-1 text-xs text-blue-500" : "top-4 text-sm"}`} 
      >
        {placeholder}
      </label>
      <select
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent outline-none text-gray-700 pt-1"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </select>
    </div>
  );
};