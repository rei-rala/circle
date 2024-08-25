"use client"

import { CalendarIcon, ClockIcon, FilePenIcon, UsersIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { getFullDate, getHour, isDateInPast, shiftDateByDays } from "@/lib/date-fns";
import { PlaceInfo } from "./socialEventFormPartials.tsx/PlaceInfo";
import { EventField } from "./socialEventFormPartials.tsx/EventField";
import { setHours, setMinutes } from "date-fns";
import { PlaceSelector } from "./socialEventFormPartials.tsx/PlaceSelector";

const defaultSocialEvent: SocialEvent = {
    title: "",
    description: "",
    date: null,
    status: "draft",
    time: "",
    place: null,
    minAttendees: 0,
    attendees: [],
}

export const SocialEventForm = ({
    socialEvent: initialSocialEvent,
    mode = 'create'
}: {
    socialEvent?: SocialEvent | null;
    mode?: 'create' | 'edit' | "delete" | 'read-only';
}) => {
    const [socialEvent, setSocialEvent] = useState<SocialEvent>(initialSocialEvent || defaultSocialEvent);
    const isPastEvent = useMemo(() => isDateInPast(socialEvent.date), [socialEvent.date]);

    const disabled = mode === 'read-only' || mode === 'delete' || isPastEvent;
    const minDate = shiftDateByDays();
    const actionText = useMemo(() => {
        switch (mode) {
            case 'create':
                return "Crear Evento";
            case 'edit':
                return "Editar Evento";
            case 'delete':
                return "Eliminar Evento";
            case 'read-only':
                return "Ver Evento";
        }
    }, [mode]);

    const handleFieldChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!disabled) {
            const { name, value } = e.target;

            // TODO: Fix time resetting when date is changed
            if (name === "time") {
                const currentDate = socialEvent.date || new Date();
                const [hours, minutes] = value.split(":").map(Number);
                const updatedDate = setMinutes(setHours(currentDate, hours), minutes);

                setSocialEvent(prevEvent => ({
                    ...prevEvent,
                    date: updatedDate,
                    time: value,
                }));

                return;
            } else if (name === "date") {
                const currentDate = socialEvent.date || new Date();
                const currentTime = socialEvent.time ?? getHour(currentDate);
                const [hours, minutes] = currentTime.split(":").map(Number);

                const updatedDate = setMinutes(setHours(currentDate, hours), minutes);

                setSocialEvent(prevEvent => ({
                    ...prevEvent,
                    date: updatedDate,
                }));

                return;
            }

            setSocialEvent(prevEvent => ({
                ...prevEvent,
                [name]: value,
            }));
        }
    }, [socialEvent.time, socialEvent.date, disabled]);

    const handleCalendarSelect = useCallback((date: Date | undefined) => {
        if (!disabled) {
            setSocialEvent(prevSocialEvent => ({
                ...prevSocialEvent,
                date: date ?? null,
            }));
        }
    }, [disabled]);


    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        if (!disabled) {
            console.log(socialEvent);
        }
    }

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-6"
        >
            <input type="hidden" name="id" value={socialEvent.id} />

            <div className="flex flex-wrap gap-4">
                <EventField icon={<FilePenIcon className="w-5 h-5" />} label="Título" id="title" name="title" placeholder="Ingresa el título del evento" value={socialEvent.title} onChange={handleFieldChange} disabled={disabled} />
                <EventField icon={<UsersIcon className="w-5 h-5" />} label="Mínimo asistentes requerido" id="minAttendees" name="minAttendees" placeholder="Ingresa el mínimo de asistentes (0 sin mínimo)" value={String(socialEvent.minAttendees ?? 0)} onChange={handleFieldChange} disabled={disabled} type="number" />
            </div>

            <div className="flex flex-wrap gap-4">
                <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5" />
                        <Label htmlFor="date">Fecha</Label>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button id="date" variant="outline" className="w-full justify-start font-normal" disabled={disabled}>
                                {socialEvent.date ? getFullDate(socialEvent.date) : "Seleccionar fecha"}
                                <div className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar fromDate={minDate} mode="single" onSelect={handleCalendarSelect} />
                        </PopoverContent>
                    </Popover>
                </div>
                <EventField icon={<ClockIcon className="w-5 h-5" />} label="Hora" id="time" name="time" placeholder="" value={socialEvent.date ? getHour(socialEvent.date) : String(socialEvent.time)} onChange={handleFieldChange} disabled={disabled} type="time" />

            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <FilePenIcon className="w-5 h-5" />
                    <Label htmlFor="description">Descripción</Label>
                </div>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe el evento"
                    value={socialEvent.description}
                    onChange={handleFieldChange}
                    disabled={disabled}
                />
            </div>

            {socialEvent.place && (
                <>
                    <Separator />
                    <PlaceInfo place={socialEvent.place} disabled={disabled} />
                </>
            )}

            {!disabled &&
                (
                    <>
                        <Separator />
                        <PlaceSelector mapsPlace={socialEvent.place} setSocialEvent={setSocialEvent} disabled={disabled} />
                    </>
                )
            }

            {!disabled && (
                <div className="flex justify-end">
                    <Button type="submit">
                        {actionText}
                    </Button>
                </div>
            )}
        </form>
    )
}
