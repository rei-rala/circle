import Link from "next/link";
import { LayoutCard } from "../LayoutCard";
import { SocialEventCardSmall } from "../SocialEvent/SocialEventCardSmall";
import { dummyUser } from "@/constants";
import getServerSession from "@/lib/getServerSession";
import { socialEventFetch } from "@/services/socialEventsserver.services";

export async function NextEvents() {
    const session = await getServerSession();
    const isUserBannedOrPendingAdmission = !session?.user.admitted || session?.user.banned
    let events: SocialEvent[] = await socialEventFetch(!isUserBannedOrPendingAdmission);

    if (events.find(e => !e.owner)) {
        events = events.map(event => ({
            ...event,
            owner: dummyUser
        }))
    }

    return (
        // z-index is 10 because 'about' section overlaps the bottom of this section 😁 // yeah, intentional
        <section className="flex flex-col gap-4 z-10">
            <h2 className="my-2">Próximos Eventos</h2>
            <div className="flex flex-col gap-4">
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
                    events.map(event => <SocialEventCardSmall key={`event${event.id}`} event={event} />)
                }
            </div>

            <Link href="/events" className="m-auto text-center hover:underline cursor-pointer">Ver todos los eventos</Link>
        </section>
    )
}