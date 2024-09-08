import Link from "next/link";
import { LayoutCard } from "../LayoutCard";
import { SocialEventCardSmall } from "../SocialEvent/SocialEventCardSmall";

export function NextEvents({ events }: { events: SocialEvent[] }) {
    return (
        <section className="grid gap-4">
            <h2 className="my-2">Próximos Eventos Públicos</h2>
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
        </section>
    )
}