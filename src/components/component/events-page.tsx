/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { EventCardProps } from "../EventCard"
import { CalendarIcon, ClockIcon, MapPinIcon } from "../icons"
import { format, formatDate, parse } from "date-fns"
import { EventCardCustom } from "@/app/(events)/events/[id]/EventCardCustom"
//import { formatDate } from "@/lib/utils"


export async function EventsPageComponent() {
  const response = await fetch("http://localhost:3000/events.json");
  const events: EventCardProps[] = await response.json();

  return (
    <div className="flex-1 overflow-auto bg-[#1a1a1a] page-inner">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">Próximos Eventos</div>
          <Link href="/events/new" className="bg-[#333333] text-white px-4 py-2 rounded-md hover:bg-[#444444]" prefetch={false}>
            Crear Nuevo Evento
          </Link>
        </div>
        {
          events.map((event) => <EventCardCustom key={`event:${event.id}`} event={event} />)
        }
      </div>
    </div >
  )
}
