import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export function UserAvatar({ user, ...props }: { user?: User } & React.ComponentProps<typeof Avatar>) {
    const avatarImageSrc = user?.hideImage ? undefined : user?.image ?? undefined;
    const avatarFallbackName = user ? (user.alias?.[0] || user.name?.[0] || user.email?.[0]) : "?";
    
    return (
        <Avatar {...props}>
            <AvatarImage
                src={avatarImageSrc}
                alt={`Avatar de ${user ? user.email : "Invitado"}`}
            />
            <AvatarFallback>{avatarFallbackName}</AvatarFallback>
        </Avatar>
    )
}