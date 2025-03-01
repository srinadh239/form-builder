import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium focus:outline-none w-full sm:w-full md:w-auto";
  const variants = {
    primary: "bg-white text-white hover:bg-gray-200 border border-gray-200 disabled:bg-gray-100 disabled:text-gray-800",
    secondary: "bg-slate-500 text-gray-800 hover:bg-gray-400 disabled:bg-gray-600 disabled:text-gray-300",
  };
  return <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />;
};