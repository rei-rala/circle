import Link from "next/link";
import { LayoutCard } from "../LayoutCard";
import { SocialEventCardSmall } from "../SocialEvent/SocialEventCardSmall";
import { dummyUser } from "@/constants";


export function NextEvents({ events }: { events: SocialEvent[] }) {
    let populatedEvents = events;

    if (populatedEvents.find(e => !e.owner)) {
        populatedEvents = events.map(event => ({
            ...event,
            owner: dummyUser
        }))
    }

    return (
        // z-index is 10 because 'about' section overlaps the bottom of this section 😁 // yeah, intentional
        <section className="grid gap-4 z-10">
            <h2 className="my-2">Próximos Eventos</h2>
            <div className="grid gap-4">
                {
                    events.length === 0 && (
                        <LayoutCard
                            title="No hay eventos próximos"
                            content={
                                <p>
                                    Puedes crear un evento desde el menú o ingresando desde{" "}
                                    <Link href="/events/new" className="underline">
                                        acá
                                    </Link>
                                </p>
                            }
                        />
                    )
                }
                {
                    populatedEvents.map(event => <SocialEventCardSmall key={`event${event.id}`} event={event} />)
                }
            </div>

            <Link href="/events" className="m-auto text-center hover:underline cursor-pointer">Ver todos los eventos</Link>
        </section>
    )
}