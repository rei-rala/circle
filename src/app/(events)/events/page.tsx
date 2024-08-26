import { SocialEventCardSmall } from "@/components/SocialEventCardSmall";
import { getSocialEvents } from "@/services/socialEvents.services";
import Link from "next/link";

export default async function EventsPageComponent() {
  let { data: socialEvents } = await getSocialEvents();
  socialEvents ??= []; // why can't I assign this in the previous line?

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">Próximos Eventos</div>
        <Link href="/events/new" className="bg-[#333333] text-white px-4 py-2 rounded-md hover:bg-[#444444]">
          Crear <span className="hidden sm:inline" >Nuevo</span> Evento
        </Link>
      </div>
      {
        socialEvents.map((socialEvent) => <SocialEventCardSmall key={`event:${socialEvent.id}`} event={socialEvent} />)
      }
    </div >
  )
}
