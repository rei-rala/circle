"use client"

import { CalendarIcon, ClockIcon, FilePenIcon, UsersIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { getFullDate, getHour, isDateInPast, shiftDateByDays } from "@/lib/date-fns";
import { PlaceInfo } from "./socialEventFormPartials.tsx/PlaceInfo";
import { EventField } from "./socialEventFormPartials.tsx/EventField";
import { setHours, setMinutes } from "date-fns";
import { PlaceSelector } from "./socialEventFormPartials.tsx/PlaceSelector";
import { createEvent, updateEvent } from "@/app/(events)/events/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type SocialEventDTO = Pick<SocialEvent, "id" | "title" | "photo" | "description" | "date" | "status" | "time" | "place" | "minAttendees">

const defaultSocialEvent: SocialEventDTO = {
    id: "",
    title: "",
    photo: "",
    description: "",
    date: null,
    status: "DRAFT",
    time: "",
    place: null,
    minAttendees: 0,
}


export const SocialEventForm = ({
    socialEvent: initialSocialEvent,
    mode = 'create'
}: {
    socialEvent?: SocialEvent | null;
    mode?: EditorMode;
}) => {
    const router = useRouter();
    const [socialEvent, setSocialEvent] = useState<SocialEventDTO>(
        initialSocialEvent
            ? {
                ...initialSocialEvent,
                place: typeof initialSocialEvent.place === 'string' ? JSON.parse(initialSocialEvent.place) : initialSocialEvent.place
            }
            : defaultSocialEvent
    );

    const isPastEvent = useMemo(() => socialEvent.date ? isDateInPast(socialEvent.date) : false, [socialEvent.date]);

    const disabled = mode === 'read-only' || mode === 'delete' || isPastEvent && !(mode === "create" || mode === "edit")
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
        if (disabled) return;

        const name = e.target.name as keyof SocialEventDTO;
        const value = e.target.value;


        if (["time", "date"].includes(name) === false) {
            setSocialEvent(prevEvent => ({
                ...prevEvent,
                [name]: value
            }));
            return;
        }

        setSocialEvent(prevEvent => {
            const updatedEvent: SocialEventDTO = { ...prevEvent };

            if (name === "time") {
                const currentDate = updatedEvent.date || new Date();
                const [hours, minutes] = value.split(":").map(Number);
                const updatedDate = setMinutes(setHours(currentDate, hours), minutes);
                updatedEvent.date = updatedDate;
                updatedEvent.time = value;
            }
            else if (name === "date") {
                const currentDate = new Date(value);
                const currentTime = updatedEvent.time ?? getHour(currentDate);
                const [hours, minutes] = currentTime.split(":").map(Number);
                const updatedDate = setMinutes(setHours(currentDate, hours), minutes);
                updatedEvent.date = updatedDate;
            }

            return updatedEvent;
        });
    }, [disabled]);

    const handleCalendarSelect = useCallback((date: Date | undefined) => {
        if (!disabled) {
            setSocialEvent(prevSocialEvent => ({
                ...prevSocialEvent,
                date: date ?? null,
            }));
        }
    }, [disabled]);


    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        
        if (disabled) {
            console.log(socialEvent);
            return;
        }

        const socialEventToUpdate = {
            ...socialEvent,
            place: JSON.stringify(socialEvent.place) as any,
        }

        switch (mode) {
            case "create":
                const created = await createEvent(socialEventToUpdate);
                if (created) {
                    toast.success("Evento creado exitosamente");
                    router.replace(`/events/${created.id}`);
                } else {
                    toast.error("No se pudo crear el evento");
                }
                break;
            case "edit":
                const updated = await updateEvent(socialEventToUpdate);
                if (updated) {
                    toast.success("Evento actualizado exitosamente");
                } else {
                    toast.error("No se pudo actualizar el evento");
                }
                break;
                //case "delete":
                //actionFunction = deleteEvent as typeof actionFunction;
                //actionText = "Eliminación";
                break;
            default:
                toast.error("La acción no está permitida");
                return;
        }
    }

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-6"
        >
            {
                mode !== "create" && <input type="hidden" name="id" value={socialEvent.id} />
            }

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
                <EventField icon={<ClockIcon className="w-5 h-5" />} label="Hora" id="time" name="time" placeholder="" value={String(socialEvent.time)} onChange={handleFieldChange} disabled={disabled} type="time" />

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
