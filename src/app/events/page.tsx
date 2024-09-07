import { SocialEventCardSmall } from "@/components/SocialEventCardSmall";
import { prisma } from "@/prisma";
import Link from "next/link";

export default async function EventsPageComponent() {
  const socialEvents = await prisma.socialEvent.findMany({}) as SocialEvent[];

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
