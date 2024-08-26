"use client"

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react"
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input"
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { ImageIcon, LocateIcon, MailIcon, MessageCircleMoreIcon, PlusIcon, ScanFaceIcon, UserIcon, XIcon } from "lucide-react";
import { User } from "next-auth";

const defaultFormUser: User = {
    alias: "",
    bio: "",
    location: "",
    socialMedia: [],
    hideEmail: false,
    hideImage: false
}

export const ProfileForm = ({ user }: { user?: User | null }) => {
    const [formUser, setFormUser] = useState(user ?? defaultFormUser);

    const checkboxFields: { field: keyof User, label: string }[] = [
        {
            field: "hideEmail",
            label: "Ocultar Correo Electrónico",
        }, {
            field: "hideImage",
            label: "Ocultar Imagen"
        }
    ]

    const handleFormFieldChange = (e: any) => {
        console.log({
            e,
            target: e.target,
        })
        // const { name, value } = e.target;

        // setFormUser({
        //     ...formUser,
        //     [name]: value
        // });
    }

    const handleCheckboxChange = (field: keyof User, value: boolean) => {
        setFormUser({
            ...formUser,
            [field]: value,
        })
    }

    const setSocialMediaLinks = (link: string, index: number) => {
        const updatedLinks = [...formUser.socialMedia];
        updatedLinks[index] = link;
        setFormUser({
            ...formUser,
            socialMedia: updatedLinks
        });
    }

    const addSocialMediaLink = (e: any) => {
        e.preventDefault();

        if (formUser.socialMedia.length < 5) {
            setFormUser({
                ...formUser,
                socialMedia: [...formUser.socialMedia, '']
            });
        }
    };

    const removeSocialMediaLink = (e: any, index: number) => {
        e.preventDefault();

        const updatedLinks = formUser.socialMedia.filter((_, i) => i !== index);
        setFormUser({
            ...formUser,
            socialMedia: updatedLinks
        });
    };

    return (
        <form className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <UserIcon className="w-5 h-5" />
                        <Label htmlFor="name">Alias</Label>
                    </div>
                    <Input id="name" placeholder="Ingresa tu alias" value={formUser.alias} onChange={handleFormFieldChange} />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <MailIcon className="w-5 h-5" />
                        <Label htmlFor="email">Correo Electrónico</Label>
                    </div>
                    <Input id="email" type="email" placeholder="Ingresa tu correo electrónico" value={formUser.email!} onChange={handleFormFieldChange} disabled />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <LocateIcon className="w-5 h-5" />
                        <Label htmlFor="location">Ubicación</Label>
                    </div>
                    <Input id="location" placeholder="Ingresa tu ubicación" value={formUser.location} onChange={handleFormFieldChange} />
                </div>
            </div>
            <div className="grid gap-2">
                <div className="flex items-center gap-2">
                    <ScanFaceIcon className="w-5 h-5" />
                    <Label htmlFor="bio">Biografía</Label>
                </div>
                <Textarea id="bio" placeholder="Ingresa tu biografía" value={formUser.bio} onChange={handleFormFieldChange} />
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
                        <span>
                            Agregar enlace de red social
                        </span>
                    </Button>
                )}
            </div>
            <div className="grid gap-2">
                <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    <Label htmlFor="image">Imagen de Google {formUser.hideImage && "(privada)"}</Label>
                </div>
                <img
                    src={formUser.image ?? "/placeholder-user.svg"}
                    alt="Imagen del usuario"
                    width={200}
                    height={200}
                    className="rounded-full m-auto md:m-0"
                    style={{ aspectRatio: "200/200", objectFit: "cover" }}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {
                    checkboxFields.map(({ field, label }) => (
                        <div className="flex items-center gap-2 cursor-pointer" key={`checkbox:${field}`}>
                            <Checkbox
                                id={field}
                                checked={Boolean(formUser[field])}
                                onCheckedChange={(value) => handleCheckboxChange(field, Boolean(value))}
                            />
                            <Label htmlFor={field}>{label}</Label>
                        </div>
                    ))
                }
            </div>

            <div className="flex justify-end">
                <Button type="submit">Guardar Cambios</Button>
            </div>
        </form>
    )
}
