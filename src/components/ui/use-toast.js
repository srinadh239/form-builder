import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
export const useToast = () => {
    const [toast, setToast] = useState(null);
    const showToast = (toastDetails) => {
        setToast(toastDetails);
        setTimeout(() => setToast(null), 3000);
    };
    return {
        toast,
        showToast,
        ToastComponent: toast ? (_jsx("div", { className: `fixed top-4 right-4 p-3 rounded shadow-md ${toast.variant === "destructive" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`, children: toast.description })) : null,
    };
};
