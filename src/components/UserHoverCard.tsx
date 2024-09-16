"use client"

import { HoverCardProps, HoverCardTrigger, HoverCardTriggerProps } from "@radix-ui/react-hover-card"
import { HoverCard, HoverCardContent } from "./ui/hover-card"
import { User } from "next-auth"
import { CakeIcon, LocateIcon, MailIcon, MessageCircleCodeIcon, PersonStandingIcon, PhoneIcon, ScanFaceIcon } from "lucide-react"
import { getUrlDomain, getZodiacSign, hasElevatedRole, truncateString } from "@/lib/utils"
import { Button } from "./ui/button"
import { UserAvatar } from "./UserAvatar"
import { format } from "date-fns"

type UserHoverCardProps = {
    user: User,
    hoverCardProps?: HoverCardProps,
    hoverCardTriggerProps?: HoverCardTriggerProps
    children?: React.ReactNode,
}

const InfoItem = ({ icon: Icon, content, href }: { icon: React.ElementType, content: string, href?: string }) => (
    <div className="flex items-center gap-2 text-sm">
        <Icon className="h-4 w-4 opacity-70" />
        {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>
        ) : (
            <span className="flex-1 text-muted-foreground">{content}</span>
        )}
    </div>
)

export const UserHoverCard = ({ user, children, hoverCardProps, hoverCardTriggerProps }: UserHoverCardProps) => {
    const isAdmin = hasElevatedRole(user)
    const displayedUserText = isAdmin ? user?.alias || "Administrador" : user?.alias || user?.name || user?.email || "Usuario"

    return (
        <HoverCard {...hoverCardProps}>
            <HoverCardTrigger {...hoverCardTriggerProps} href={`#${user.id}`}>
                {children || (
                    <Button variant="link" className="font-bold hover:underline p-0">
                        {displayedUserText}
                    </Button>
                )}
            </HoverCardTrigger>
            <HoverCardContent className="flex flex-col gap-2 w-fit max-w-[99svw]">
                <div className="flex flex-col justify-center items-center text-sm font-semibold">
                    <UserAvatar user={user} />
                    <h4 className="text-sm font-semibold">{displayedUserText} <span>
                        {(!user.gender || user.gender === "") ? "" : (user.gender === "masculino" ? "♂️" : "♀️")}
                    </span></h4>
                </div>

                {!user.hideEmail && user.email && <InfoItem icon={MailIcon} content={user.email} href={`mailto:${user.email}`} />}
                {user.bio && <InfoItem icon={ScanFaceIcon} content={user.bio} />}
                {user.birthDate && (
                    <InfoItem 
                        icon={CakeIcon} 
                        content={`${format(user.birthDate, "dd/MM")} ${getZodiacSign(user.birthDate).emoji}`} 
                    />
                )}
                {!user.hidePhone && user.phone && <InfoItem icon={PhoneIcon} content={`Whatsapp: ${user.phone}`} href={`https://wa.me/${user.phone}`} />}
                {user.location && <InfoItem icon={LocateIcon} content={user.location} />}

                {user.socialMedia?.length > 0 && (
                    <div className="flex items-center gap-2 pt-2 text-xs">
                        <MessageCircleCodeIcon className="h-4 w-4 opacity-70" />
                        <div className="flex-1 flex flex-col gap-1">
                            {user.socialMedia.map((socialMedia, index) => (
                                <a key={`${user.id}-socialMedia:${index}`} href={socialMedia} className="mr-2" target="_blank" rel="noopener noreferrer">
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