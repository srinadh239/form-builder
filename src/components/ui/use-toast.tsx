import { useState } from "react";

type ToastType = { description: string; variant?: "success" | "destructive" };

export const useToast = () => {
  const [toast, setToast] = useState<ToastType | null>(null);

  const showToast = (toastDetails: ToastType) => {
    setToast(toastDetails);
    setTimeout(() => setToast(null), 3000);
  };

  return {
    toast,
    showToast,
    ToastComponent: toast ? (
      <div className={`fixed top-4 right-4 p-3 rounded shadow-md ${
        toast.variant === "destructive" ? "bg-red-500 text-white" : "bg-green-500 text-white"
      }`}>
        {toast.description}
      </div>
    ) : null,
  };
};