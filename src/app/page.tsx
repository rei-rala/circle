import { SocialEventCardSmall } from "@/components/SocialEventCardSmall";
import { prisma } from "@/prisma";

export default async function Home() {
  // find events that are not in the past and not deleted
  const events = await prisma.socialEvent.findMany({
    where: {
      date: {
        gt: new Date(),
      },
      status: "PUBLISHED",
    },
    orderBy: {
      date: "asc",
    },
  }) as SocialEvent[]

  return (
    <>
      <h2 className="my-2">Próximos Eventos</h2>
      <div className="grid gap-4">
        {
          events.map((event, i) => <SocialEventCardSmall key={`event${event.id}`} event={event} />)
        }
      </div>

    </>
  )
}
