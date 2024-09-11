import { SocialEventCardSmall } from "@/components/SocialEvent/SocialEventCardSmall";
import getServerSession from "@/lib/getServerSession";
import { prisma } from "@/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EventsPageComponent() {
  const session = await getServerSession();

  if (!session?.user) {
    return redirect("/api/auth/signin?callbackUrl=/events");
  }

  const socialEvents = await prisma.socialEvent.findMany({
    where: {
      date: {
        gte: new Date(),
      },
      public: session?.user ? undefined : true,
    },
    orderBy: {
      date: "asc"
    },
    include: {
      owner: true,
    }
  }) as unknown as SocialEvent[];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">Próximos Eventos</div>
        <Link href="/events/new" className="bg-[#333333] text-white px-4 py-2 rounded-md hover:bg-[#444444]">
          Crear <span className="hidden sm:inline">Nuevo</span> Evento
        </Link>
      </div>
      {
        socialEvents.map((socialEvent) => (
          <SocialEventCardSmall
            key={`event:${socialEvent.id}`}
            event={socialEvent}
            user={session?.user}
          />
        ))
      }
    </div>
  )
}
