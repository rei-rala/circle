"use client"

import { HoverCardTrigger } from "@radix-ui/react-hover-card"
import { HoverCard, HoverCardContent } from "./ui/hover-card"
import { User } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { LocateIcon, MessageCircleCodeIcon, PhoneIcon, ScanFaceIcon } from "lucide-react"
import { getUrlDomain, truncateString } from "@/lib/utils"


export const UserHoverCard = ({ user }: { user: User }) => {
    return (
        <HoverCard>
            <HoverCardTrigger className="font-bold hover:underline">
                {user.alias || user.name || user.email}
            </HoverCardTrigger>
            <HoverCardContent className="flex flex-col gap-2 w-fit max-w-[75svw]">
                <div className="text-sm font-semibold m-auto">
                    <Avatar className="m-auto">
                        <AvatarImage src={user.image ?? undefined} />
                        <AvatarFallback>{user.alias && user.alias[0] || user.name && user.name[0] || user.email && user.email[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <h4 className="text-sm font-semibold">{user.name}</h4>
                </div>

                <div className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4 opacity-70" />
                    <a href={`mailto:${user.email}`} className="text-sm" target="_blank">{user.email}</a>
                </div>

                <div className="flex items-center gap-2">
                    <ScanFaceIcon className="h-4 w-4 opacity-70" />
                    {user.bio}
                </div>

                <div className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4 opacity-70" />
                    <a href={`https://wa.me/${user.phone}`} target="_blank">Whatsapp {user.phone}</a>
                </div>

                <div className="flex items-center gap-2">
                    <LocateIcon className="h-4 w-4 opacity-70" />
                    <span className="text-muted-foreground">
                        {user.location}
                    </span>
                </div>

                <div className="flex items-center gap-2 pt-2 text-xs ">
                    <MessageCircleCodeIcon className="h-4 w-4 opacity-70" />
                    <div className="flex flex-col gap-1">
                        {user.socialMedia?.map((socialMedia, index) => (
                            <a key={`${user.id}-socialMedia:${index}`} href={socialMedia} className="mr-2" target="_blank">
                                {truncateString(getUrlDomain(socialMedia), 50)}
                            </a>
                        ))}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}