import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { usePopoverManagerContext } from "@/contexts/PopoverManagerProvider";

export const CustomPopover = ({
    onToggle,
    triggerComponent,
    contentComponent,
    className,
    disabled
}: {
    onToggle?: (e: React.MouseEvent) => void,
    triggerComponent: React.ReactNode,
    contentComponent: React.ReactNode,
    className?: string,
    disabled?: boolean
}) => {
    const { currentPopoverRef, setCurrentPopoverRef, closePopover } = usePopoverManagerContext();
    const popoverRef = useRef<HTMLDivElement>(null);
    const isPopoverOpen = currentPopoverRef === popoverRef;

    const handleClick = (e: React.MouseEvent) => {
        setCurrentPopoverRef(popoverRef);
        onToggle && onToggle(e);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                closePopover();
                onToggle && onToggle(event as unknown as React.MouseEvent);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onToggle, closePopover]);

    return (
        <Popover open={!disabled && isPopoverOpen}>
            <PopoverTrigger asChild className={className} onClick={handleClick}>
                {triggerComponent}
            </PopoverTrigger>
            <PopoverContent side="bottom" className="w-fit" alignOffset={-10} ref={popoverRef}>
                {contentComponent}
            </PopoverContent>
        </Popover>
    );
};