"use client"

import { cn } from "@/lib/utils"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export const GoBackButton = ({ children, className }: {
    children?: React.ReactNode
    className?: string
}) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    // doesnt work as intended because of google auth callbackurl can't have params
    // i wanted to hide the button because if clicked, it would redirect to googles signin page
    // i'll include it for now, maybe we can use it later
    const cantBack = searchParams.get("canback") === "false";

    if (cantBack) {
        return null;
    }

    return (
        <button className={cn( "z-50 flex items-center bg-[#333333] text-white p-2 rounded-md hover:bg-[#444444] w-fit", className)} onClick={() => router.back()}>

            {
                children
                    ? children
                    : (
                        <>
                            <ChevronLeftIcon className="relative left-[-5%] w-5 h-5" />
                            <span>
                                Volver
                            </span>
                        </>
                    )
            }
        </button>
    )
}