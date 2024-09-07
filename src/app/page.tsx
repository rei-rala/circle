import { SocialEventCardSmall } from "@/components/SocialEvent/SocialEventCardSmall";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { prisma } from "@/prisma";
import Link from "next/link";

export default async function Home() {
  let events: SocialEvent[];

  try {
    // find events that are not in the past and not deleted
    events = await prisma.socialEvent.findMany({
      where: {
        date: {
          gt: new Date(),
        },
        status: "PUBLISHED",
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
            <Card className="p-4">
              <CardTitle>No hay eventos próximos</CardTitle>
              <CardContent>
                <p>
                  Puedes crear un evento desde el menú o ingresando desde
                  <Link href="/events/new">
                    acá
                  </Link>
                </p>
              </CardContent>
            </Card>
          )
        }
        {
          events.map((event, i) => <SocialEventCardSmall key={`event${event.id}`} event={event} />)
        }
      </div>

    </>
  )
}
