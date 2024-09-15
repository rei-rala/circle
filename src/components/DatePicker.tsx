
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getFullDate } from "@/lib/date-fns";
import { cn } from '@/lib/utils';

type CustomDatePickerProps = React.ComponentProps<typeof Calendar> & {
    id: string;
    onChange: (date: Date | undefined) => void;
    disabled: boolean;
    minDate: Date;
    className?: string;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    id,
    selected,
    onChange,
    disabled,
    minDate,
    className,
    ...calendarProps
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button id={id} variant="outline" className={cn("w-full justify-start font-normal", className)} disabled={disabled}>
                    {selected ? getFullDate(selected as Date) : "Seleccionar fecha"}
                    <div className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selected ?? undefined}
                    onSelect={onChange}
                    disabled={disabled}
                    fromDate={minDate}
                    
                    // this will be like these because we'll use only single datepicker
                    {...calendarProps as any}
                />
            </PopoverContent>
        </Popover>
    );
};