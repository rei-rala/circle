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
import { PlaceInfo } from "./socialEventFormPartials/PlaceInfo";
import { EventField } from "./socialEventFormPartials/EventField";
import { setHours, setMinutes } from "date-fns";
import { PlaceSelector } from "./socialEventFormPartials/PlaceSelector";
import { createSocialEvent, updateSocialEvent } from "@/services/socialEvents.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { compareChangesObject } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "next-auth";

type SocialEventDTO = Pick<SocialEvent, "id" | "public" | "title" | "photo" | "description" | "date" | "status" | "time" | "place" | "minAttendees">

const defaultSocialEvent: SocialEventDTO = {
    id: "",
    title: "",
    public: false,
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
    mode = 'create',
    user
}: {
    socialEvent?: SocialEvent | null;
    mode?: EditorMode;
    user?: User;
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [socialEvent, setSocialEvent] = useState<SocialEventDTO>(
        initialSocialEvent ?? defaultSocialEvent
    );

    const isPastEvent = useMemo(() => socialEvent.date ? isDateInPast(socialEvent.date) : false, [socialEvent.date]);

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

    const hasChanges = useMemo(() => {
        return compareChangesObject(socialEvent, initialSocialEvent);
    }, [socialEvent, initialSocialEvent]);

    const disabled = mode === 'read-only' || mode === 'delete' || isPastEvent && !(mode === "create" || mode === "edit")

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

    const handleCheckboxChange = useCallback((name: keyof SocialEventDTO, value: boolean) => {
        if (disabled) return;

        setSocialEvent(prevEvent => ({
            ...prevEvent,
            [name]: value
        }));
    }, [disabled]);

    const handleCalendarSelect = useCallback((date: Date | undefined) => {
        if (!disabled) {
            setSocialEvent(prevSocialEvent => ({
                ...prevSocialEvent,
                date: date ?? null,
            }));
        }
    }, [disabled]);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (disabled) {
            console.log(socialEvent);
            return;
        }

        setLoading(true);

        try {
            const handleEvent = async (action: 'create' | 'edit') => {
                const eventAction = action === 'create' ? createSocialEvent : updateSocialEvent;
                const { data, error, message } = await eventAction(socialEvent);

                if (error) {
                    toast.error(error);
                } else if (data) {
                    toast.success(message);
                    if (mode === 'create') router.replace(`/events/${data.id}`);
                }

            };

            if (mode === 'create' || mode === 'edit') {
                await handleEvent(mode);
            } else {
                toast.error("La acción no está permitida");
            }
        }
        catch (error) {
            console.error(error);
            toast.error("Error al procesar la solicitud");
        }

        setLoading(false);
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

            {!disabled && (
                <>
                    <Separator />
                    <PlaceSelector mapsPlace={socialEvent.place} setSocialEvent={setSocialEvent} disabled={disabled} />
                </>
            )}

            {user?.role === "admin" && (
                <div className="flex flex-col gap-4 border-red-600 border-2 p-2 rounded-lg">
                    <h2 className="text-red-600 text-lg text-center font-semibold">Opciones de Administrador</h2>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                            id={"publicEvent"}
                            checked={socialEvent.public}
                            onCheckedChange={(b) => handleCheckboxChange('public', Boolean(b))}
                            aria-label={"Esconder el event para usuarios no registrados"}
                        />
                        <Label htmlFor="publicEvent">Hacer evento público</Label>
                    </div>
                </div>
            )}

            <div className="flex justify-end">
                <Button type="submit" disabled={disabled || !hasChanges || loading}>
                    {
                        loading
                            ? <span className="mr-2 h-4 w-4 animate-spin" />
                            : actionText
                    }
                </Button>
            </div>
        </form>
    )
}