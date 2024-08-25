"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useSession } from "next-auth/react"

//const POPOVER_ID = "user-menu"
// this is a upper navbar component, but we use it at the bottom while features are being implemented
export const UserMenu = ({ className }: { className?: string }) => {
    const { data: session } = useSession();

    return (
        <Link href="/api/auth/signin" className={className} prefetch={false}>
            <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar del usuario" />
                <AvatarFallback>
                    {session?.user?.name ? session.user.name[0] : "X"}
                </AvatarFallback>
            </Avatar>
        </Link>
    )
}