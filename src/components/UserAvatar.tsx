import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export function UserAvatar({ user, ...props }: { user: User } & React.ComponentProps<typeof Avatar>) {
    const avatarFallbackName = user.alias?.[0] || user.name?.[0] || user.email?.[0] || "?";

    return (
        <Avatar {...props}>
            <AvatarImage src={user.hideImage ? undefined : user.image ?? undefined} />
            <AvatarFallback>{avatarFallbackName}</AvatarFallback>
        </Avatar>
    )
}