"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { getFullDateAndHourWithSeparator } from "@/lib/date-fns"
import { AtSignIcon, CalendarIcon, MailIcon, PhoneIcon, ScanFaceIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { User } from "next-auth"
import { Separator } from "@radix-ui/react-separator"

export const UserAdmissionCard = ({ user, admitUserAction }: { user: User, admitUserAction: (data: FormData) => void }) => {
    return (
        <Card
            key={user.id}
            className="p-4 rounded-lg"
        >
            <CardContent>
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarImage src="/placeholder-user.jpg" alt="Avatar del usuario" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2 text-lg font-semibold">
                        <span>{user.name}</span>
                    </div>
                </div>

                <Separator className="my-2 border-white" />

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-[#cccccc]">
                        <MailIcon className="w-4 h-4" />
                        <span>{user.email}</span>
                    </div>
                    {user.alias && (
                        <div className="flex items-center gap-2 text-sm text-[#cccccc]">
                            <AtSignIcon className="w-4 h-4" />
                            <span>{user.alias}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-[#cccccc]">
                        <ScanFaceIcon className="w-4 h-4" />
                        <span>{user.bio}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#cccccc]">
                        <PhoneIcon className="w-4 h-4" />
                        <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#cccccc]">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{getFullDateAndHourWithSeparator(user.createdAt)}</span>
                    </div>
                </div>
                {
                    admitUserAction && (
                        <div className="flex justify-end gap-2 mt-4">
                            <form action={admitUserAction}>
                                <input type="hidden" name="userId" value={user.id} />
                                <Button>Admitir</Button>
                            </form>
                        </div>
                    )
                }

            </CardContent>
        </Card>
    )
}