"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import autoAnimate from "@formkit/auto-animate";
import { MessageCircleMoreIcon, PlusIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";

type SocialMediaLinksProps = {
    socialMedia: string[];
    setSocialMediaLinks?: (value: string, index: number) => void;
    addSocialMediaLink?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    removeSocialMediaLink?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => void;
}

export const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ socialMedia, setSocialMediaLinks, addSocialMediaLink, removeSocialMediaLink }) => {
    const socialMediaContainer = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (socialMediaContainer.current) autoAnimate(socialMediaContainer.current)
    }, [socialMediaContainer])

    return (
        <div className="grid gap-2">
            <div className="flex items-center gap-2 h-5">
                <MessageCircleMoreIcon className="w-5 h-5" />
                <Label htmlFor="socialMedia">Redes Sociales</Label>
            </div>
            <div ref={socialMediaContainer} className="flex flex-col items-stretch gap-1">
                {socialMedia.map((link, index) => (
                    <div key={`socialMedia:${index}`} className="flex items-center gap-2 animate-in fade-in-0 duration-300">
                        <Input
                            id={`socialMedia${index + 1}`}
                            placeholder={`Ingresa el enlace Nro ${index + 1}`}
                            value={link}
                            onChange={(e) => setSocialMediaLinks!(e.target.value, index)}
                            className="animate-in slide-in-from-left-5 duration-300"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-[#333333] animate-in slide-in-from-right-5 duration-300"
                            value={index}
                            onClick={(ev) => removeSocialMediaLink!(ev, index)}
                        >
                            <XIcon className="w-5 h-5" />
                            <span className="sr-only">Eliminar enlace de red social</span>
                        </Button>
                    </div>
                ))}
                {socialMedia.length < 5 && (
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
        </div>
    );
};
