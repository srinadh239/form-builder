import { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;
export const Select = (props: SelectProps) => (
  <>
    <label className="block text-sm font-medium text-gray-700">{props.name}</label>
    <select className="border rounded-md p-2 w-full" {...props} />
  </>
);
