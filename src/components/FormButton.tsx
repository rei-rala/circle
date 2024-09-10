"use client"

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";

export function FormButton({ children, loadingIndicator = false, ...props }: ButtonProps & { loadingIndicator?: boolean }) {
    const form = useFormStatus();
    return <Button {...props} disabled={form.pending}>
        {
            loadingIndicator && form.pending
                ? <div className="animate-spin rounded-full w-4 h-4 border-t-4"></div>
                : children
        }
    </Button>
}