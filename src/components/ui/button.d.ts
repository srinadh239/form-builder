import { ButtonHTMLAttributes } from "react";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
};
export declare const Button: ({ variant, className, ...props }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export {};
