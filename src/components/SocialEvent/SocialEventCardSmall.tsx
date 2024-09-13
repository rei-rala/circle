/* eslint-disable @next/next/no-img-element */
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDistanceFromNow, getNamedDateMinimal } from "@/lib/date-fns";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import { UserHoverCard } from "../UserHoverCard";
import Image from "next/image";

export function SocialEventCardSmall({ event, user }: { event: SocialEvent, user?: User }) {
    const isOwner = event.ownerId === user?.id;

    return (
        <div
            className={
                cn(event.public ? "border-red-600" : isOwner && "border-green-500", "flex items-center gap-4 p-3 rounded-lg bg-[#333333] hover:bg-[#444444] border-2 max-w-full")
            }
        >
            {
                event.photo && (
                    <div className="h-full max-w-[30%] aspect-square grid place-items-center">
                        <Image
                            src={event.photo}
                            alt={`Imagen de evento: ${event.title}`}
                            width={150}
                            height={150}
                            className="w-full rounded-lg object-cover aspect-square max-w-[150px] max-h-[150px]"
                        />
                    </div>
                )
            }
            <div className="flex-1">
                <div className="font-medium">{event.title}</div>
                <div className="flex flex-wrap items-center gap-2 mb-2 text-sm">
                    <UserHoverCard user={event.owner} />
                    {
                        isOwner && (
                            <i className="text-xs text-[#aaa]">(Tú)</i>
                        )
                    }
                </div>
                <div className="text-sm text-[#aaa] mt-1">{event.place?.name || "Lugar a definir"}</div>
                <div className="text-sm text-[#aaa] capitalize">
                    {
                        event.date
                            ? getNamedDateMinimal(event.date)
                            : "Sin definir"
                    }
                </div>
                {
                    event.date && (
                        <div className="text-xs capitalize mt-2">
                            {getDistanceFromNow(event.date)}
                        </div>
                    )
                }
            </div>
            <div className="grid place-items-center">
                <Link href={`/events/${event.id}`} className="block">
                    <Button variant="ghost" className="p-2 w-20 h-20 aspect-square">
                        <ChevronRightIcon className="w-12 h-12" />
                        <span className="sr-only">Ver Evento</span>
                    </Button>
                </Link>
            </div>
        </div>

    )
}