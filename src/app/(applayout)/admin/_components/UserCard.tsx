import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { getFullDateAndHourWithSeparator } from "@/lib/date-fns"
import { CalendarIcon, MailIcon, PhoneIcon, ScanFaceIcon, UserIcon } from "lucide-react"
import { User } from "next-auth"
import { Separator } from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"
import { FormActionButton } from "@/components/forms/FormActionButton"

export type UserCardProps = {
    user: User,
    actionLabel: string,
    actionVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    actionClassName?: string
    formAction?: (formData: FormData) => Promise<void>
}

export const UserCard = ({ user, actionLabel, actionVariant = "default", actionClassName, formAction }: UserCardProps) => {
    return (
        <Card
            key={user.id}
            className="flex flex-col gap-2 p-4 rounded-lg hover:brightness-110"
        >
            <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                        <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
                        <AvatarFallback>{user.name?.charAt(0).toUpperCase() ?? ""}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.id}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <MailIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{user.email}</span>
                    </div>
                    {user.phone && (
                        <div className="flex items-center space-x-2">
                            <PhoneIcon className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{user.phone}</span>
                        </div>
                    )}
                    {user.bio && (
                        <div className="flex items-center space-x-2">
                            <ScanFaceIcon className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{user.bio}</span>
                        </div>
                    )}
                    {user.createdAt && (
                        <div className="flex items-center space-x-2">
                            <CalendarIcon className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{getFullDateAndHourWithSeparator(user.createdAt)}</span>
                        </div>
                    )}
                </div>

                <Separator className="my-4" />

                <div className="flex space-x-2 mb-4 text-red-500">
                    {!user.name && <UserIcon className="h-4 w-4" />}
                    {!user.email && <MailIcon className="h-4 w-4" />}
                    {!user.phone && <PhoneIcon className="h-4 w-4" />}
                    {!user.bio && <ScanFaceIcon className="h-4 w-4" />}
                    {!user.createdAt && <CalendarIcon className="h-4 w-4" />}
                </div>

                {formAction && (
                    <form action={formAction}>
                        <input type="hidden" name="userId" value={user.id} />
                        <FormActionButton
                            variant={actionVariant}
                            className={cn(actionClassName, "w-full")}
                        >
                            {actionLabel}
                        </FormActionButton>
                    </form>
                )}
            </CardContent>
        </Card>
    )
}