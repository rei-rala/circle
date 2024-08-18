import { ChevronRightIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { formatDate } from "@/lib/utils";

export type EventCardProps = {
    id: string;
    title: string;
    map: string;
    date: Date;
    description: string;
};

export function EventCard({ event }: { event: EventCardProps }) {
    return (
        <div className="flex items-center gap-4 p-3 rounded-lg bg-[#333333] hover:bg-[#444444]">
            <div className="flex-1">
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-[#aaa]">{formatDate(event.date)}</div>
            </div>
            <div className="flex items-center gap-2">
                <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${event.map}`}
                    target="_blank"
                    className="p-2 rounded-full hover:bg-[#444444]"
                    prefetch={false}
                >
                    <MapPinIcon className="w-5 h-5" />
                    <span className="sr-only">Ver en el mapa</span>
                </Link>

                <Link href={{
                    pathname: `/event/${event.id}`,
                    query: { event: JSON.stringify(event) },
                }} prefetch={false}>
                    <Button variant="ghost" size="icon">
                        <ChevronRightIcon className="w-5 h-5" />
                        <span className="sr-only">Ver Evento</span>
                    </Button>
                </Link>
            </div>
        </div>

    )
}