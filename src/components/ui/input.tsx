import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;
export const Input = (props: InputProps) => (
  <>
    <label className="block text-sm font-medium text-gray-700">{props.placeholder}</label>
    <input className="border rounded-md p-2 w-full" {...props} />
  </>
);
