"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    CakeIcon,
    ImageIcon,
    ImageOffIcon,
    LocateIcon,
    MailIcon,
    MailXIcon,
    PersonStandingIcon,
    PhoneIcon,
    PhoneOffIcon,
    ScanFaceIcon,
    UserIcon,
} from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import { toast } from "sonner";
import { compareChangesObject, getGender, getZodiacSign, hasElevatedRole } from "@/lib/utils";
import { updateUserProfile } from "@/services/profile.services";
import { defaultUser } from "@/constants";
import { useAuth } from "@/contexts/AuthProvider";
import { FormActionButton } from "../FormActionButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isValid } from "date-fns";
import { SocialMediaLinks } from "./profileFormPartials/socialMediaLinks";

function checkUserProfileChanges(
    newUser: UserProfileDTO,
    user?: User | null
): boolean {
    if (!user) return false;
    return compareChangesObject<UserProfileDTO>(newUser, user);
}

export const ProfileForm = ({ user }: { user: User }) => {
    const { update: updateSession } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formUser, setFormUser] = useState<User>(user ?? defaultUser);
    const [adminCardHidePreference, setAdminCardHidePreference] = useState(false);

    const { profileChanged, adminPreferenceChanged } = useMemo(() => {
        const profileChanged = checkUserProfileChanges(formUser, user);
        let adminPreferenceChanged = adminCardHidePreference;

        if (typeof window !== "undefined") {
            adminPreferenceChanged = adminCardHidePreference !== (localStorage?.getItem("adminCardHidePreference") === "true");
        }

        return {
            profileChanged,
            adminPreferenceChanged
        };
    }, [formUser, adminCardHidePreference, user]);

    const enableForm = adminPreferenceChanged || profileChanged;

    const checkboxFields: { field: keyof User; label: string }[] = [
        {
            field: "hideEmail",
            label: "Ocultar Email",
        },
        {
            field: "hideImage",
            label: "Ocultar Imagen",
        },
        {
            field: "hidePhone",
            label: "Ocultar Celular"
        }
    ];

    const zodiacSign = useMemo(() => {
        if (!formUser.birthDate || !isValid(new Date(formUser.birthDate))) return null;
        return getZodiacSign(new Date(formUser.birthDate));
    }, [formUser.birthDate]);

    const handleFormFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name === "birthDate") {
            const date = new Date(value);
            if (isValid(date)) {
                setFormUser({
                    ...formUser,
                    [name]: date,
                });
            }
            return;
        }

        if (Object.keys(defaultUser).includes(name))
            setFormUser({
                ...formUser,
                [name]: value,
            });
    };

    const handleCheckboxChange = (field: keyof User, value: boolean) => {
        setFormUser({
            ...formUser,
            [field]: value,
        });
    };

    const setSocialMediaLinks = (link: string, index: number) => {
        const updatedLinks = [...formUser.socialMedia];
        updatedLinks[index] = link;
        setFormUser({
            ...formUser,
            socialMedia: updatedLinks,
        });
    };

    const addSocialMediaLink = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (formUser.socialMedia.length < 5) {
            setFormUser({
                ...formUser,
                socialMedia: [...formUser.socialMedia, ""],
            });
        }
    };

    const removeSocialMediaLink = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();

        const updatedLinks = formUser.socialMedia.filter((_, i) => i !== index);
        setFormUser({
            ...formUser,
            socialMedia: updatedLinks,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!enableForm) return;

        setLoading(true);

        if (adminPreferenceChanged) {
            localStorage.setItem("adminCardHidePreference", String(adminCardHidePreference));
            setAdminCardHidePreference(adminCardHidePreference);
            toast.success("Preferencia de ocultar cartel admin actualizada correctamente");
        }

        try {
            if (profileChanged) {
                const { error, data, message } = await updateUserProfile(formUser);

                if (data) {
                    toast.success(message);
                    updateSession();
                } else if (error) {
                    toast.error(error);
                } else {
                    throw new Error("No se pudo actualizar el perfil");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("No se pudo actualizar el perfil");
        }

        setLoading(false);
    };


    useEffect(() => {
        if (typeof window !== "undefined") {
            setAdminCardHidePreference(localStorage?.getItem("adminCardHidePreference") === "true");
        }
    }, []);

    return (
        <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2 h-5">
                        <UserIcon className="w-5 h-5" />
                        <Label htmlFor="alias">Alias</Label>
                    </div>
                    <Input
                        id="alias"
                        name="alias"
                        placeholder="Ingresa tu alias"
                        value={formUser.alias}
                        onChange={handleFormFieldChange}
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center gap-2 h-5">
                        {formUser.hideEmail ? (
                            <MailXIcon className="w-5 h-5" />
                        ) : (
                            <MailIcon className="w-5 h-5" />
                        )}
                        <Label htmlFor="email">Email</Label>
                    </div>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Ingresa tu correo electrónico"
                        value={String(formUser.email)}
                        onChange={handleFormFieldChange}
                        disabled
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2 h-5">
                        {
                            formUser.gender
                                ? getGender(formUser.gender).emoji
                                : <PersonStandingIcon className="w-5 h-5" />
                        }
                        <Label htmlFor="gender">Sexo</Label>
                    </div>
                    <Select
                        onValueChange={(value) => setFormUser({ ...formUser, gender: value })}
                        defaultValue={formUser.gender ?? undefined}
                        value={formUser.gender ?? undefined}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona tu sexo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="femenino">Femenino</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center gap-2 h-5">
                        {
                            zodiacSign
                                ? <span className="text-sm">{zodiacSign.emoji}</span>
                                : <CakeIcon className="w-5 h-5" />
                        }
                        <Label htmlFor="birthDate">Nacimiento</Label>
                    </div>
                    {/* 
                    <CustomDatePicker
                        id="birthDate"
                        selected={formUser.birthDate ? new Date(formUser.birthDate) : undefined}
                        onChange={(date) => setFormUser({ ...formUser, birthDate: date ?? new Date() })}
                        disabled={false}
                        minDate={new Date(1900, 1, 1)}
                        className="max-w-full inline-block"
                        showMonthYearPicker
                        dateFormat="MM/yyyy"
                        showFullMonthYearPicker
                    /> */}
                    <Input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formUser.birthDate ? new Date(formUser.birthDate).toISOString().split('T')[0] : ''}
                        onChange={handleFormFieldChange}
                        min="1900-01-01"
                        max={new Date().toISOString().split('T')[0]}
                        className="max-w-full inline-block text-white"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2 h-5">
                        {
                            formUser.hidePhone
                                ? <PhoneOffIcon className="w-5 h-5" />
                                : <PhoneIcon className="w-5 h-5" />
                        }
                        <Label htmlFor="phone">Celular</Label>
                    </div>
                    <Input
                        id="phone"
                        name="phone"
                        placeholder="Ingresa tu numero de celular"
                        value={formUser.phone}
                        onChange={handleFormFieldChange}
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center gap-2 h-5">
                        <LocateIcon className="w-5 h-5" />
                        <Label htmlFor="location">Ubicación</Label>
                    </div>
                    <Input
                        id="location"
                        name="location"
                        placeholder="Ingresa tu ubicación"
                        value={formUser.location}
                        onChange={handleFormFieldChange}
                    />
                </div>
            </div>
            <div className="grid gap-2">
                <div className="flex items-center gap-2 h-5">
                    <ScanFaceIcon className="w-5 h-5" />
                    <Label htmlFor="bio">Biografía</Label>
                </div>
                <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Ingresa tu biografía"
                    value={formUser.bio}
                    onChange={handleFormFieldChange}
                />
            </div>
            <SocialMediaLinks
                socialMedia={formUser.socialMedia}
                setSocialMediaLinks={setSocialMediaLinks}
                addSocialMediaLink={addSocialMediaLink}
                removeSocialMediaLink={removeSocialMediaLink}
            />
            <div className="grid gap-2">
                <div className="flex items-center gap-2 h-5">
                    {formUser.hideImage ? (
                        <ImageOffIcon className="w-5 h-5" />
                    ) : (
                        <ImageIcon className="w-5 h-5" />
                    )}
                    <Label htmlFor="image">
                        Imagen de Google {formUser.hideImage && "(privada)"}
                    </Label>
                </div>

                <Image
                    src={user?.image || "/placeholder-user.jpg"}
                    alt="Imagen del usuario"
                    width={200}
                    height={200}
                    className="rounded-full m-auto md:m-0 text-white"
                    style={{ aspectRatio: "200/200", objectFit: "cover" }}
                />
            </div>

            {
                hasElevatedRole(user) &&
                (
                    <div className="flex flex-col gap-4 border-red-600 border-2 p-2 rounded-lg">
                        <h2 className="text-red-600 text-lg text-center font-semibold">Opciones de Administrador</h2>
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <Checkbox
                                id={"adminCardHidePreference"}
                                checked={adminCardHidePreference}
                                onCheckedChange={(b) => { setAdminCardHidePreference(Boolean(b)) }}
                                aria-label={"Hide admin card checkbox"}
                            />
                            <Label htmlFor="adminCardHidePreference">Ocultar cartel admin</Label>
                        </div>
                        {checkboxFields.map(({ field, label }) => (
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                key={`checkbox:${field}`}
                            >
                                <Checkbox
                                    id={field}
                                    checked={Boolean(formUser[field])}
                                    onCheckedChange={(value) =>
                                        handleCheckboxChange(field, Boolean(value))
                                    }
                                    aria-label={label}
                                />
                                <Label htmlFor={field}>{label}</Label>
                            </div>
                        ))}

                    </div>
                )
            }

            <div className="flex justify-end">
                <FormActionButton disabled={loading || !enableForm} loading={loading}>
                    Guardar Cambios
                </FormActionButton>
            </div>
        </form >
    );
};
