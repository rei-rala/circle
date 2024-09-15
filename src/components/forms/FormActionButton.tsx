"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";


export function FormActionButton({ loading, ...props }: React.ComponentProps<typeof Button> & { loading?: boolean }) {
    const { pending } = useFormStatus();
    const isLoading = String(loading) === "true";

    return (
        <Button
            {...props}
            disabled={pending || props.disabled || isLoading}
            type="submit">
            {
                pending || isLoading
                    ? <div className="animate-spin rounded-full w-4 h-4 border-t-4"></div>
                    : props.children
            }
        </Button>
    )
}