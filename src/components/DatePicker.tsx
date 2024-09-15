
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getFullDate } from "@/lib/date-fns";

interface CustomDatePickerProps {
    id: string;
    selected: Date | null;
    onChange: (date: Date | undefined) => void;
    disabled: boolean;
    minDate: Date;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    id,
    selected,
    onChange,
    disabled,
    minDate
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button id={id} variant="outline" className="w-full justify-start font-normal" disabled={disabled}>
                    {selected ? getFullDate(selected) : "Seleccionar fecha"}
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
                />
            </PopoverContent>
        </Popover>
    );
};