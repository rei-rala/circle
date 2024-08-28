"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState } from "react";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
    ImageIcon,
    ImageOffIcon,
    LocateIcon,
    MailIcon,
    MailXIcon,
    MessageCircleMoreIcon,
    PhoneIcon,
    PhoneOffIcon,
    PlusIcon,
    ScanFaceIcon,
    UserIcon,
    XIcon,
} from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { updateUserProfile } from "@/app/profile/actions";
import Image from "next/image";
import { toast } from "sonner";

const defaultFormUser: User = {
    role: null,
    alias: "",
    bio: "",
    location: "",
    phone: "",
    socialMedia: [],
    hideEmail: false,
    hideImage: false,
    hidePhone: false,
};

const keys: (keyof UserProfileDTO)[] = [
    "alias",
    "bio",
    "location",
    "phone",
    "socialMedia",
    "hideEmail",
    "hideImage",
    "hidePhone",
];

function checkUserProfileChanges(
    newUser: UserProfileDTO,
    user?: User | null
): boolean {
    if (!user) return false;

    for (const key of keys) {
        if (key === "socialMedia") {
            if (newUser[key].length !== user[key].length) return true;

            for (let i = 0; i < newUser[key].length; i++) {
                if (newUser[key][i] !== user[key][i]) return true;
            }
        } else {
            if (newUser[key] !== user[key]) return true;
        }
    }

    return false;
}

// //TODO: usar esta hermosa funcion en lugar de la de arriba
// function checkUserProfileChanges(
//   newUser: UserProfileDTO,
//   user?: User | null
// ): boolean {
//   if (!user) return false;
//   return compareChangesObject<UserProfileDTO>(newUser, user);
// }

export const ProfileForm = () => {
    const session = useSession();
    const [formUser, setFormUser] = useState(
        session.data?.user ?? defaultFormUser
    );

    const [adminCardHidePreference, setAdminCardHidePreference] = useState(localStorage.getItem("adminCardHidePreference") === "true");

    const { profileChanged, adminPreferenceChanged } = useMemo(() => {
        const profileChanged = checkUserProfileChanges(formUser, session?.data?.user);
        const adminPreferenceChanged = (localStorage.getItem("adminCardHidePreference") === "true") !== adminCardHidePreference;

        return {
            profileChanged,
            adminPreferenceChanged
        };
    }, [formUser, session?.data?.user, adminCardHidePreference]);

    const disableForm = profileChanged || adminPreferenceChanged;

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

    const handleFormFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (Object.keys(defaultFormUser).includes(name))
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

    const addSocialMediaLink = (e: any) => {
        e.preventDefault();

        if (formUser.socialMedia.length < 5) {
            setFormUser({
                ...formUser,
                socialMedia: [...formUser.socialMedia, ""],
            });
        }
    };

    const removeSocialMediaLink = (e: any, index: number) => {
        e.preventDefault();

        const updatedLinks = formUser.socialMedia.filter((_, i) => i !== index);
        setFormUser({
            ...formUser,
            socialMedia: updatedLinks,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!disableForm) return;

        if (adminPreferenceChanged) {
            localStorage.setItem("adminCardHidePreference", String(adminCardHidePreference));
            setAdminCardHidePreference(adminCardHidePreference);
            toast.success("Preferencia de ocultar cartel admin actualizada correctamente");
        }

        if (profileChanged && await updateUserProfile(formUser)) {
            toast.success("Perfil actualizado correctamente");
            session.update();
        } else if (profileChanged) {
            toast.error("No se pudo actualizar el perfil");
        }
    };

    return (
        <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
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
                    <div className="flex items-center gap-2">
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
                    <div className="flex items-center gap-2">
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
                    <div className="flex items-center gap-2">
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
                <div className="flex items-center gap-2">
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
            <div className="grid gap-2">
                <div className="flex items-center gap-2">
                    <MessageCircleMoreIcon className="w-5 h-5" />
                    <Label htmlFor="socialMedia">Redes Sociales</Label>
                </div>
                {formUser.socialMedia.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Input
                            id={`socialMedia${index + 1}`}
                            placeholder={`Ingresa el enlace Nro ${index + 1}`}
                            value={link}
                            onChange={(e) => setSocialMediaLinks(e.target.value, index)}
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-[#333333]"
                            value={index}
                            onClick={(e) => removeSocialMediaLink(e, index)}
                        >
                            <XIcon className="w-5 h-5" />
                            <span className="sr-only">Eliminar enlace de red social</span>
                        </Button>
                    </div>
                ))}
                {formUser.socialMedia.length < 5 && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex gap-1 text-white hover:bg-[#333333] w-full px-3"
                        onClick={addSocialMediaLink}
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Agregar enlace de red social</span>
                    </Button>
                )}
            </div>
            <div className="grid gap-2">
                <div className="flex items-center gap-2">
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
                    src={session.data?.user.image || "/placeholder-user.jpg"}
                    alt="Imagen del usuario"
                    width={200}
                    height={200}
                    className="rounded-full m-auto md:m-0 text-white"
                    style={{ aspectRatio: "200/200", objectFit: "cover" }}
                />
            </div>

            {
                session.data?.user.role === "admin" &&
                (
                    <div className="flex flex-col gap-4 border-red-600 border-2 p-2 rounded-lg">
                        <h2 className="text-red-600 text-lg text-center font-semibold">Opciones de Administrador</h2>
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <Checkbox
                                id={"adminCardHidePreference"}
                                checked={adminCardHidePreference}
                                onChange={checked => setAdminCardHidePreference(Boolean(checked))}
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
                <Button
                    type="submit"
                    disabled={!disableForm}
                >
                    Guardar Cambios
                </Button>
            </div>
        </form >
    );
};
