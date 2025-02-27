import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";

export const toastRedirect = (
    message: string,
    navigate: NavigateFunction,
    redirectUrl: string,
    type: "success" | "warning" | "error" = "success",
    autoClose: number = Number(import.meta.env.VITE_TIMEOUT_REDIRECT)
) => {
    
    const toastId = toast[type](message, {
        autoClose,
        onClick: () => {
            toast.dismiss(toastId);
            navigate(redirectUrl);
        }
    });

    setTimeout(() => {
        navigate(redirectUrl);
    }, autoClose);
};
