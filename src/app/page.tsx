import { LayoutCard } from "@/components/LayoutCard";
import { SocialEventCardSmall } from "@/components/SocialEvent/SocialEventCardSmall";
import getServerSession from "@/lib/getServerSession";
import { prisma } from "@/prisma";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();
  let events: SocialEvent[];

  try {
    // find events that are not in the past and not deleted, if logged, show only public events
    events = await prisma.socialEvent.findMany({
      where: {
        date: {
          gt: new Date(),
        },
        public: session?.user ? undefined : true,
      },
      orderBy: {
        date: "asc",
      },
    }) as SocialEvent[] || []
  } catch (err) {
    console.log("Error fetching events")
    console.log(err)
    events = [];
  }

  return (
    <>
      <h2 className="my-2">Próximos Eventos</h2>
      <div className="grid gap-4">
        {
          events.length === 0 && (
            <LayoutCard
              title="No hay eventos próximos"
              content={
                <p>
                  Puedes crear un evento desde el menú o ingresando desde
                  <Link href="/events/new">
                    acá
                  </Link>
                </p>
              }
            />
          )
        }
        {
          events.map((event, i) => <SocialEventCardSmall key={`event${event.id}`} event={event} />)
        }
      </div>

    </>
  )
}
