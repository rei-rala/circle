"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Popover } from "@radix-ui/react-popover"
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { usePopoverManagerContext } from "@/contexts/PopoverManagerProvider"
import { Separator } from "@/components/ui/separator"
import { cn, getEmailUserName } from "@/lib/utils"
import clsx from "clsx"

const POPOVER_ID = "user-menu"
// this is a upper navbar component, but we use it at the bottom while features are being implemented
export const UserMenu = ({ className }: { className?: string }) => {
    const { data: session, status } = useSession();
    const { currentPopoverId, setCurrentPopoverId, closePopover } = usePopoverManagerContext();
    const isOpen = currentPopoverId === POPOVER_ID;

    const toggleCurrentPopoverId = (e: any) => {
        e.preventDefault();

        if (status === "loading") return;

        isOpen
            ? setCurrentPopoverId(null)
            : setCurrentPopoverId(POPOVER_ID);
    }

    const borderColor = session?.user.role === "admin"
        ? "border-red-700 hover:border-red-400"
        : "border-slate-400 hover:border-white"

    return (
        <Popover open={isOpen}>
            <PopoverTrigger
                asChild
                className={className}
                onClick={toggleCurrentPopoverId}
                disabled={status === "loading"}
                aria-roledescription="user menu"
            >
                <Link href={POPOVER_ID}>
                    <Avatar className={cn(borderColor, "w-8 h-8 border-2 border-solid cursor-pointer")}>
                        <AvatarImage
                            src={
                                session?.user?.image && !session.user.hideImage
                                    ? session.user.image
                                    : "/placeholder-user.jpg"
                            }
                            alt={`Avatar de ${session?.user ? session.user.email : "Usuario"}`}
                        />
                        <AvatarFallback>
                            {session?.user?.name ? session.user.name[0] : "X"}
                        </AvatarFallback>
                    </Avatar>
                </Link>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="w-fit" alignOffset={-10}>
                <div className="flex flex-col gap-4 w-auto">
                    <h3 className="flex gap-2 leading-none m-auto">
                        {
                            session?.user?.email
                                ? getEmailUserName(session.user.email)
                                : "Usuario"
                        }
                    </h3>
                    <Separator />
                    <div className="flex flex-col gap-3">
                        {
                            [
                                { children: "Mi perfil", href: "/profile", hidden: !session },
                                { children: session ? "Cerrar Sesión" : "Iniciar Sesión", href: session ? "/api/auth/signout" : "/api/auth/signin" },
                            ].map(({ children, href, hidden }) => (
                                !hidden &&
                                (
                                    <span
                                        key={children}
                                    >
                                        <Link
                                            href={href}
                                            className="text-sm text-muted-foreground"
                                            onClick={closePopover}
                                        >
                                            {children}
                                        </Link>
                                    </span>
                                )
                            ))
                        }
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}