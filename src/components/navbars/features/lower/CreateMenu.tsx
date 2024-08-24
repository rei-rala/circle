"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { usePopoverManagerContext } from "@/contexts/PopoverManagerProvider";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const POPOVER_ID = "#create-menu";

export const CreateMenu = ({ className }: { className: string }) => {
    const { currentPopoverId, setCurrentPopoverId, closePopover } = usePopoverManagerContext();
    const isOpen = currentPopoverId === POPOVER_ID;

    const toggleCurrentPopoverId = () => isOpen
        ? setCurrentPopoverId(null)
        : setCurrentPopoverId(POPOVER_ID);

    return (
        <Popover open={isOpen}>
            <PopoverTrigger asChild className={className}>
                <Link href={POPOVER_ID} prefetch={false} onClick={toggleCurrentPopoverId}>
                    <PlusIcon className="w-6 h-6" />
                    <span className="sr-only">Crear Evento</span>
                </Link>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h3 className="font-medium leading-none">Crear</h3>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Link
                                href={"/events/new"}
                                className="text-sm text-muted-foreground"
                                onClick={closePopover}
                            >
                                Evento
                            </Link>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
