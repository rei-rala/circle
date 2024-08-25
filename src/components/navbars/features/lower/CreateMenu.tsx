"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { usePopoverManagerContext } from "@/contexts/PopoverManagerProvider";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const POPOVER_ID = "#create-menu";
const createMenuLinks = [
    { href: "/events/new", text: "Evento" },
]

export const CreateMenu = ({ className }: { className: string }) => {
    const { currentPopoverId, setCurrentPopoverId, closePopover } = usePopoverManagerContext();
    const isOpen = currentPopoverId === POPOVER_ID;

    const toggleCurrentPopoverId = (e: any) => {
        e.preventDefault();

        isOpen
            ? setCurrentPopoverId(null)
            : setCurrentPopoverId(POPOVER_ID);
    }

    return (
        <Popover open={isOpen}>
            <PopoverTrigger asChild className={className}>
                <Link href={POPOVER_ID} prefetch={false} onClick={toggleCurrentPopoverId}>
                    <PlusIcon className="w-6 h-6" />
                    <span className="sr-only">Crear Evento</span>
                </Link>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-4 w-auto">
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
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
