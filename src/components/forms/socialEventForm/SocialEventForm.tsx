/* eslint-disable @next/next/no-img-element */
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
import { compareChangesObject, fileToBase64 } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "next-auth";

type SocialEventDTO = Pick<SocialEvent, "id" | "public" | "title" | "photo" | "description" | "date" | "status" | "time" | "place" | "minAttendees" | "publicAttendees">

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
    publicAttendees: true,
}

export const SocialEventForm = ({
    socialEvent: initialSocialEvent,
    mode = 'create',
    disabled = false,
    adminOptions = false
}: {
    socialEvent?: SocialEvent | null;
    mode?: EditorMode;
    disabled?: boolean;
    adminOptions?: boolean;
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [socialEvent, setSocialEvent] = useState<SocialEventDTO>(
        initialSocialEvent ?? defaultSocialEvent
    );
    const [imageFile, setImageFile] = useState<File | null>(null);

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

    const disableForm = mode === 'read-only' || mode === 'delete' || isPastEvent && !(mode === "create" || mode === "edit") || disabled

    const handleFieldChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (disableForm) return;

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
    }, [disableForm]);

    const handleCheckboxChange = useCallback((name: keyof SocialEventDTO, value: boolean) => {
        if (disableForm) return;

        setSocialEvent(prevEvent => ({
            ...prevEvent,
            [name]: value
        }));
    }, [disableForm]);

    const handleCalendarSelect = useCallback((date: Date | undefined) => {
        if (!disableForm) {
            setSocialEvent(prevSocialEvent => ({
                ...prevSocialEvent,
                date: date ?? null,
            }));
        }
    }, [disableForm]);


    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && !disableForm) {
            setImageFile(file);
        }
    }, [disableForm]);

    const uploadImage = async (file: File): Promise<string> => {
        const base64 = await fileToBase64(file);
        const response = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64 }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data.url;
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (disableForm) {
            console.log(socialEvent);
            return;
        }

        setLoading(true);

        try {
            let photo = socialEvent.photo;

            if (imageFile) {
                photo = await uploadImage(imageFile);
            }

            const handleEvent = async (action: 'create' | 'edit') => {
                const eventAction = action === 'create' ? createSocialEvent : updateSocialEvent;
                const { data, error, message } = await eventAction({ ...socialEvent, photo });

                if (error) {
                    toast.error(error);
                    return null;
                } else if (data) {
                    toast.success(message);
                    return data;
                }
            };

            if (mode === 'create' || mode === 'edit') {
                const event = await handleEvent(mode);

                if (event) {
                    if (mode === 'create') {
                        router.replace(`/events/${event.id}`);
                    } else {
                        router.refresh();
                    }
                    setLoading(false);
                }
            } else {
                toast.error("La acción no está permitida");
                setLoading(false);
            }
        }
        catch (error) {
            console.error(error);
            toast.error("Error al procesar la solicitud");
            setLoading(false);
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
                <EventField icon={<FilePenIcon className="w-5 h-5" />} label="Título" id="title" name="title" placeholder="Ingresa el título del evento" value={socialEvent.title} onChange={handleFieldChange} disabled={disableForm} />
                <EventField icon={<UsersIcon className="w-5 h-5" />} label="Mínimo asistentes requerido" id="minAttendees" name="minAttendees" placeholder="Ingresa el mínimo de asistentes (0 sin mínimo)" value={String(socialEvent.minAttendees ?? 0)} onChange={handleFieldChange} disabled={disableForm} type="number" />
            </div>

            <div className="flex flex-wrap gap-4">
                <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5" />
                        <Label htmlFor="date">Fecha</Label>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button id="date" variant="outline" className="w-full justify-start font-normal" disabled={disableForm}>
                                {socialEvent.date ? getFullDate(socialEvent.date) : "Seleccionar fecha"}
                                <div className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar fromDate={minDate} mode="single" onSelect={handleCalendarSelect} />
                        </PopoverContent>
                    </Popover>
                </div>
                <EventField icon={<ClockIcon className="w-5 h-5" />} label="Hora" id="time" name="time" placeholder="" value={String(socialEvent.time)} onChange={handleFieldChange} disabled={disableForm} type="time" />
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
                    disabled={disableForm}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="photo">Imagen del evento</Label>
                <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={disableForm}
                />
                {(imageFile || socialEvent.photo) && (
                    <div className="flex justify-center">
                        <img
                            src={imageFile ? URL.createObjectURL(imageFile) : socialEvent.photo || ''}
                            alt="Event"
                            width={600}
                            height={400}
                            className="mt-2 w-full max-w-[600px] object-cover"
                        />
                    </div>
                )}
            </div>

            {socialEvent.place && (
                <>
                    <Separator />
                    <PlaceInfo place={socialEvent.place} disabled={disableForm} />
                </>
            )}

            {!disableForm && (
                <>
                    <Separator />
                    <PlaceSelector mapsPlace={socialEvent.place} setSocialEvent={setSocialEvent} disabled={disableForm} />
                </>
            )}

            {adminOptions && (
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
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                            id={"publicAttendees"}
                            checked={socialEvent.publicAttendees}
                            onCheckedChange={(b) => handleCheckboxChange('publicAttendees', Boolean(b))}
                            aria-label={"Esconder los asistentes del evento"}
                        />
                        <Label htmlFor="publicAttendees">Mostrar asistentes</Label>
                    </div>
                </div>
            )}

            <div className="flex justify-end">
                <Button
                    type={loading ? "button" : "submit"}
                    disabled={loading || disableForm || !hasChanges}
                    className="transition-all duration-300 ease-in-out opacity-100 scale-100 translate-y-0"
                >
                    {loading ? (
                        <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-primary-foreground animate-spin"></div>
                    ) : (
                        actionText
                    )}
                </Button>
            </div>
        </form>
    )
}