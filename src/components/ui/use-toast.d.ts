type ToastType = {
    description: string;
    variant?: "success" | "destructive";
};
export declare const useToast: () => {
    toast: ToastType | null;
    showToast: (toastDetails: ToastType) => void;
    ToastComponent: import("react/jsx-runtime").JSX.Element | null;
};
export {};
