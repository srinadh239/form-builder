import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium focus:outline-none";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
  };
  return <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />;
};