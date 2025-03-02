interface SelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
    placeholder?: string;
    className?: string;
}
export declare const Select: React.FC<SelectProps>;
export {};
