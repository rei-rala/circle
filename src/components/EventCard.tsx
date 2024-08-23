import { ChevronRightIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { format } from 'date-fns'

export type EventCardProps = SocialEvent & {
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
                <div className="text-sm text-[#aaa]">{format(new Date(event.date), "dd/mm - hh:mm")}</div>
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