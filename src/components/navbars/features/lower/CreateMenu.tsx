"use client"

import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { CustomPopover } from "@/components/CustomPopover";
import { usePopoverManagerContext } from "@/contexts/PopoverManagerProvider";
import { useAuth } from "@/contexts/AuthProvider";

const createMenuLinks = [
    { href: "/events/new", text: "Nuevo evento" },
]

export const CreateMenu = ({ className }: { className: string }) => {
    const { closePopover } = usePopoverManagerContext();
    const { user } = useAuth();

    const isAdmin = user?.role?.toUpperCase() === "ADMIN";

    const triggerComponent = (
        <button>
            <PlusIcon className="w-6 h-6" />
            <span className="sr-only">Crear Evento</span>
        </button>
    );

    const contentComponent = (
        <div className="flex flex-col gap-4">
            <h3 className="font-semibold leading-none">Crear</h3>
            <Separator />
            <div className="flex flex-col gap-3">
                {
                    createMenuLinks.map(({ href, text }) => (
                        <Link
                            key={text}
                            href={href}
                            className="text-sm text-muted-foreground w-full"
                            onClick={closePopover}
                        >
                            {text}
                        </Link>
                    ))
                }

                {
                    isAdmin &&
                    (
                        <Link
                            href={`/admissions`}
                            className="text-sm text-muted-foreground w-full"
                            onClick={closePopover}
                        >
                            Admisiones
                        </Link>
                    )
                }
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
