interface InputProps {
    type?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}
export declare const Input: React.FC<InputProps>;
export {};
