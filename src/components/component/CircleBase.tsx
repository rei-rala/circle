
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { EventCard, EventCardProps } from "../EventCard";

export async function CircleBase() {
  const response = await fetch("http://localhost:3000/events.json");
  const events: EventCardProps[] = await response.json();

  return (

    <div className="flex-1 overflow-auto bg-[#1a1a1a]">
      <div className="grid gap-4">
        <Card className="bg-[#222222] p-4 rounded-lg  text-white">
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {
                events.map((event, i) => i < 3 && <EventCard key={`event${event.id}`} event={event} />)
              }
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#222222] p-4 rounded-lg  text-white">
          <CardHeader>
            <CardTitle>Eventos Sugeridos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 ">
              {
                events.map((event, i) => i >= 3 && <EventCard key={`event${event.id}`} event={event} />)
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

  )
}
