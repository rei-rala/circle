"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePopoverManagerContext } from "@/contexts/PopoverManagerProvider"
import Link from "next/link"

//const POPOVER_ID = "user-menu"
// this is a upper navbar component, but we use it at the bottom while features are being implemented
export const UserMenu = ({ className }: { className?: string }) => {
    const { } = usePopoverManagerContext();

    // habra que cambiar los links por buttons
    const handleClick = (e: any) => {
        e.preventDefault();
    }

    return (
        <Link href="" onClick={handleClick} className={className} prefetch={false}>
            <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar del usuario" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
        </Link>
    )
}