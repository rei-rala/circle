"use client"

import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { CustomPopover } from "@/components/CustomPopover";
import { usePopoverManagerContext } from "@/contexts/PopoverManagerProvider";
import { useAuth } from "@/contexts/AuthProvider";
import { hasElevatedRole } from "@/lib/utils";

const DefaultMenuLinks = ({ closePopover, className, wrapperClassName }: { closePopover: () => void, className?: string, wrapperClassName?: string }) => {
    const defaultMenuLinks = [
        { href: "/events/new", text: "Nuevo evento" },
    ];

    return (
        <div className={wrapperClassName}>
            {defaultMenuLinks.map(({ href, text }) => (
                <Link
                    key={text}
                    href={href}
                    className={`text-sm text-muted-foreground w-full ${className}`}
                    onClick={closePopover}
                >
                    {text}
                </Link>
            ))}
        </div>
    );
};

const AdminMenuLinks = ({ closePopover, className, wrapperClassName }: { closePopover: () => void, className?: string, wrapperClassName?: string }) => {
    const adminMenuLinks = [
        { href: "/admin/admissions", text: "Admisiones" },
        { href: "/admin/ban", text: "Banear usuarios" },
    ];

    return (
        <div className={wrapperClassName}>
            {adminMenuLinks.map(({ href, text }) => (
                <Link
                    key={text}
                    href={href}
                    className={`text-sm text-muted-foreground w-full ${className}`}
                    onClick={closePopover}
                >
                    {text}
                </Link>
            ))}
        </div>
    );
};

const MasterMenuLinks = ({ closePopover, className, wrapperClassName }: { closePopover: () => void, className?: string, wrapperClassName?: string }) => {
    const masterMenuLinks = [
        { href: "/admin/admins", text: "Administradores" },
    ];

    return (
        <div className={wrapperClassName}>
            {masterMenuLinks.map(({ href, text }) => (
                <Link
                    key={text}
                    href={href}
                    className={`text-sm text-muted-foreground w-full ${className}`}
                    onClick={closePopover}
                >
                    {text}
                </Link>
            ))}
        </div>
    );
};

export const MainMenu = ({ className }: { className: string }) => {
    const { closePopover } = usePopoverManagerContext();
    const { user } = useAuth();

    const isAdmin = hasElevatedRole(user);
    const isMaster = user?.role?.toUpperCase() === "MASTER";

    const triggerComponent = (
        <button>
            <PlusIcon className="w-6 h-6" />
            <span className="sr-only">Menu principal</span>
        </button>
    );

    const contentComponent = (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
                <h3 className="font-semibold leading-none">Menu</h3>
                <Separator />
            </div>
            <div className="flex flex-col gap-3">
                <DefaultMenuLinks closePopover={closePopover} className="block" wrapperClassName="flex flex-col gap-2" />
                {isAdmin && (
                    <>
                        <Separator />
                        <AdminMenuLinks closePopover={closePopover} className="block" wrapperClassName="flex flex-col gap-2" />
                    </>
                )}
                {isMaster && (
                    <>
                        <Separator />
                        <MasterMenuLinks closePopover={closePopover} className="block" wrapperClassName="flex flex-col gap-2" />
                    </>
                )}
            </div>
        </div>
    );

    return (
        <CustomPopover
            triggerComponent={triggerComponent}
            contentComponent={contentComponent}
            className={className}
        />
    );
};
