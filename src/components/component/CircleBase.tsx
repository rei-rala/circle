import { SocialEventCardSmall } from "../SocialEventCardSmall";

export async function CircleBase() {
  const response = await fetch("http://localhost:3000/events.json");
  const events: SocialEvent[] = await response.json();

  return (<>
    <h2 className="my-2">Próximos Eventos</h2>
    <div className="grid gap-4">
      {
        events.map((event, i) => i < 3 && <SocialEventCardSmall key={`event${event.id}`} event={event} />)
      }
    </div>
    <h2 className="my-2">Eventos Sugeridos</h2>
    <div className="grid gap-4 ">
      {
        events.map((event, i) => i >= 3 && <SocialEventCardSmall key={`event${event.id}`} event={event} />)
      }
    </div>
  </>
  )
}
