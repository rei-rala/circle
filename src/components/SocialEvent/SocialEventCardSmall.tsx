/* eslint-disable @next/next/no-img-element */
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDistanceFromNow, getNamedDateMinimal } from "@/lib/date-fns";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import { UserHoverCard } from "../UserHoverCard";
import Image from "next/image";
import { ImageWithLoader } from "../ImageWithLoader";

export function SocialEventCardSmall({ event, user }: { event: SocialEvent, user?: User }) {
    const isOwner = event.ownerId === user?.id;

    return (
        <div
            className={
                cn(event.public ? "border-red-600" : isOwner && "border-green-500", "flex items-center gap-3 p-2 rounded-lg bg-[#333333] hover:bg-[#444444] border-2 max-w-full")
            }
        >
            <ImageWithLoader src={event.photo} alt={event.title} width={100} height={100} className="aspect-square rounded-lg" />

            <div className="flex-1 overflow-x-hidden">
                <div className="font-medium truncate">{event.title}</div>
                {event.owner && (
                    <div className="flex flex-wrap items-center gap-2 mb-2 text-sm">
                        <UserHoverCard user={event.owner} />
                        {isOwner && (
                            <i className="text-xs text-[#aaa]">(Tú)</i>
                        )}
                    </div>
                )}
                <div className="text-sm text-[#aaa] mt-1 line-clamp-1">{event.place?.name || "Lugar a definir"}</div>
                <div className="text-sm text-[#aaa] capitalize">
                    {
                        event.date
                            ? getNamedDateMinimal(event.date, "-")
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