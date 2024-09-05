"use client"

import { HoverCardProps, HoverCardTrigger, HoverCardTriggerProps } from "@radix-ui/react-hover-card"
import { HoverCard, HoverCardContent } from "./ui/hover-card"
import { User } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { LocateIcon, MailIcon, MessageCircleCodeIcon, PhoneIcon, ScanFaceIcon } from "lucide-react"
import { getUrlDomain, truncateString } from "@/lib/utils"
import { Button } from "./ui/button"


export const UserHoverCard = ({ user, hoverCardProps, hoverCardTriggerProps }: { user: User, hoverCardProps?: HoverCardProps, hoverCardTriggerProps?: HoverCardTriggerProps }) => {
    const userButtonText = user.alias || user.name || user.email;
    const avatarFallbackName = user.alias && user.alias[0] || user.name && user.name[0] || user.email && user.email[0] || "U";

    return (
        <HoverCard {...hoverCardProps}>
            <HoverCardTrigger className="font-bold hover:underline" {...hoverCardTriggerProps}>
                <Button variant="link" className="p-0">
                    {userButtonText}
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="flex flex-col gap-2 w-fit max-w-[100svw]">
                <div className="text-sm font-semibold m-auto">
                    <Avatar className="m-auto">
                        <AvatarImage src={user.image ?? undefined} />
                        <AvatarFallback>{avatarFallbackName}</AvatarFallback>
                    </Avatar>
                    <h4 className="text-sm font-semibold">{user.name}</h4>
                </div>

                <div className="flex items-center gap-2">
                    <MailIcon className="h-4 w-4 opacity-70" />
                    <a href={`mailto:${user.email}`} className="text-sm" target="_blank">{user.email}</a>
                </div>

                <div className="flex items-center gap-2">
                    <ScanFaceIcon className="h-4 w-4 opacity-70" />
                    <span className="flex-1">
                        {user.bio}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4 opacity-70" />
                    <a className="flex-1 text-muted-foreground" href={`https://wa.me/${user.phone}`} target="_blank">Whatsapp {user.phone}</a>
                </div>

                {
                    user.location && (
                        <div className="flex items-center gap-2">
                            <LocateIcon className="h-4 w-4 opacity-70" />
                            <span className="flex-1 text-muted-foreground">
                                {user.location}
                            </span>
                        </div>
                    )
                }

                {
                    user.socialMedia?.length > 0 && (
                        <div className="flex items-center gap-2 pt-2 text-xs ">
                            <MessageCircleCodeIcon className="h-4 w-4 opacity-70" />
                            <div className="flex-1 flex flex-col gap-1">
                                {user.socialMedia.map((socialMedia, index) => (
                                    <a key={`${user.id}-socialMedia:${index}`} href={socialMedia} className="mr-2" target="_blank">
                                        {truncateString(getUrlDomain(socialMedia), 50)}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )
                }
            </HoverCardContent>
        </HoverCard>
    )
}