/* eslint-disable @next/next/no-img-element */
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getDistanceFromNow, getFullDateAndHourWithSeparator } from "@/lib/date-fns";
import { cn } from "@/lib/utils";

export function SocialEventCardSmall({ event }: { event: SocialEvent }) {
    return (
        <div
            className={
                cn(event.public && "border-green-500", "flex items-center gap-4 p-3 rounded-lg bg-[#333333] hover:bg-[#444444] border-2")
            }
        >
            {
                event.photo && (
                    <div className="h-full max-w-[30%] aspect-square grid place-items-center">
                        <img
                            src={event.photo}
                            alt={`Imagen de evento: ${event.title}`}
                            className="w-full rounded-lg object-cover aspect-square"
                        />
                    </div>
                )
            }
            <div className="flex-1">
                <div className="font-medium">{event.title}</div>
                <Separator />
                <div className="text-sm text-[#aaa] mt-1">{event.place?.name || "Lugar a definir"}</div>
                <div className="text-sm text-[#aaa]">
                    {
                        event.date
                            ? getFullDateAndHourWithSeparator(event.date)
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
            <div className="flex items-center gap-2">
                <Link href={`/events/${event.id}`} prefetch={false}>
                    <Button variant="ghost" size="icon">
                        <ChevronRightIcon className="w-5 h-5" />
                        <span className="sr-only">Ver Evento</span>
                    </Button>
                </Link>
            </div>
        </div>

    )
}