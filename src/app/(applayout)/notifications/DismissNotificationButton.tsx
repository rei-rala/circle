"use client"

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useFormStatus } from "react-dom"

export function DismissNotificationButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            type="submit"
            variant="ghost"
            size="sm"
            aria-label="Dismiss notification"
        >
            {
                pending
                    ? <div className="h-4 w-4 animate-spin"></div>
                    : <X className="h-4 w-4" />
            }
        </Button>
    )
}