/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { SocialEventCardSmall } from "../SocialEventCardSmall";


export async function EventsPageComponent() {
  const response = await fetch("http://localhost:3000/events.json");
  const events: SocialEvent[] = await response.json();

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">Próximos Eventos</div>
        <Link href="/events/new" className="bg-[#333333] text-white px-4 py-2 rounded-md hover:bg-[#444444]" prefetch={false}>
          Crear <span className="hidden sm:inline" >Nuevo</span> Evento
        </Link>
      </div>
      {
        events.map((event) => <SocialEventCardSmall key={`event:${event.id}`} event={event} />)
      }
    </div >
  )
}
