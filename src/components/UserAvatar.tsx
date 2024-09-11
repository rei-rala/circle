import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export function UserAvatar({ user, ...props }: { user?: User | null } & React.ComponentProps<typeof Avatar>) {
    const isAdmin = user?.role?.toUpperCase() === "ADMIN"
    const displayedUserText = isAdmin ? user?.alias || "Administrador" : (user?.alias || user?.name || user?.email || "Usuario")

    const avatarImageSrc = user?.hideImage ? undefined : user?.image ?? "/placeholder-user.jpg";

    return (
        <Avatar {...props}>
            <AvatarImage
                src={avatarImageSrc}
                alt={`Avatar de ${user ? user.email : "Invitado"}`}
            />
            <AvatarFallback className="uppercase">{displayedUserText[0]}</AvatarFallback>
        </Avatar>
    )
}