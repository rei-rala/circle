"use client"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { cn, getEmailUserName, hasElevatedRole } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { CustomPopover } from "@/components/CustomPopover"
import { UserAvatar } from "@/components/UserAvatar"
import { usePopoverManagerContext } from "@/contexts/PopoverManagerProvider"
import { useAuth } from "@/contexts/AuthProvider"

// this is a upper navbar component, but we use it at the bottom while features are being implemented
export const UserMenu = ({ className }: { className?: string }) => {
    const pathName = usePathname();
    const { user, isLoadingSession } = useAuth();
    const { closePopover } = usePopoverManagerContext();

    const userMenuLinks = [
        { children: "Mi perfil", href: "/profile", hidden: !user },
        { children: user ? "Cerrar Sesión" : "Iniciar Sesión", href: user ? `/logout?callbackUrl=/` : `/login?callbackUrl=${pathName}` },
    ]

    const triggerComponent = (
        <button>
            {
                isLoadingSession
                    ? <div className="animate-pulse bg-slate-400 w-10 h-10 rounded-full" />
                    : (
                        <UserAvatar
                            user={user}
                            className={cn(
                                "border-2 border-solid cursor-pointer",
                                hasElevatedRole(user)
                                    ? "border-red-700 hover:border-red-400"
                                    : "border-slate-400 hover:border-white"
                            )}
                        />
                    )
            }
        </button>
    );

    const contentComponent = (
        <div className="flex flex-col gap-4 w-auto">
            <h3 className="flex gap-2 leading-none m-auto">
                {
                    user?.email
                        ? getEmailUserName(user.email)
                        : "Usuario"
                }
            </h3>
            <Separator />
            <div className="flex flex-col gap-3">
                {
                    userMenuLinks.map(({ children, href, hidden }) => {
                        if (hidden) return null;

                        return (
                            <Link
                                key={children}
                                href={href}
                                className="text-sm text-muted-foreground"
                                onClick={closePopover}
                            >
                                {children}
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );

    return (
        <CustomPopover
            triggerComponent={triggerComponent}
            contentComponent={contentComponent}
            className={className}
            disabled={isLoadingSession}
        />
    )
}