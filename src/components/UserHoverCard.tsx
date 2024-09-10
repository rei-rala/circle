"use client"

import { HoverCardProps, HoverCardTrigger, HoverCardTriggerProps } from "@radix-ui/react-hover-card"
import { HoverCard, HoverCardContent } from "./ui/hover-card"
import { Session, User } from "next-auth"
import { LocateIcon, MailIcon, MessageCircleCodeIcon, PhoneIcon, ScanFaceIcon } from "lucide-react"
import { getUrlDomain, truncateString } from "@/lib/utils"
import { Button } from "./ui/button"
import { UserAvatar } from "./UserAvatar"

type UserHoverCardProps = {
    user: User,
    hoverCardProps?: HoverCardProps,
    hoverCardTriggerProps?: HoverCardTriggerProps
    children?: React.ReactNode,
}


export const UserHoverCard = ({ user, children, hoverCardProps, hoverCardTriggerProps }: UserHoverCardProps) => {
    const userButtonText = user.alias || user.name || user.email

    return (
        <HoverCard {...hoverCardProps}>
            <HoverCardTrigger {...hoverCardTriggerProps}>
                {children || (
                    <Button variant="link" className="font-bold hover:underline p-0">
                        {userButtonText}
                    </Button>
                )}
            </HoverCardTrigger>
            <HoverCardContent className="flex flex-col gap-2 w-fit max-w-[99svw]">
                <div className="flex flex-col justify-center items-center text-sm font-semibold">
                    <UserAvatar user={user} />
                    <h4 className="text-sm font-semibold">{user.name}</h4>
                </div>

                {!user.hideEmail && (
                    <div className="flex items-center gap-2">
                        <MailIcon className="h-4 w-4 opacity-70" />
                        <a href={`mailto:${user.email}`} className="text-sm" target="_blank">{user.email}</a>
                    </div>
                )}

                {
                    user.bio && (
                        <div className="flex items-center gap-2">
                            <ScanFaceIcon className="h-4 w-4 opacity-70" />
                            <span className="flex-1">
                                {user.bio}
                            </span>
                        </div>
                    )
                }

                {!user.hidePhone && user.phone && (
                    <div className="flex items-center gap-2">
                        <PhoneIcon className="h-4 w-4 opacity-70" />
                        <a className="flex-1 text-muted-foreground" href={`https://wa.me/${user.phone}`} target="_blank">Whatsapp: {user.phone}</a>
                    </div>
                )}

                {user.location && (
                    <div className="flex items-center gap-2">
                        <LocateIcon className="h-4 w-4 opacity-70" />
                        <span className="flex-1 text-muted-foreground">
                            {user.location}
                        </span>
                    </div>
                )}

                {user.socialMedia?.length > 0 && (
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
                )}
            </HoverCardContent>
        </HoverCard>
    )
}