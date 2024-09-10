import { joinEvent } from "@/app/events/[id]/actions";
import { Button } from "../ui/button";


export function SocialEventJoin({ event }: { event: SocialEvent }) {
    return (
        <form className='flex flex-col gap-2 text-center font-bold' action={joinEvent}>
            <span>¿Quieres asistir a este evento?</span>
            <input type="hidden" name="eventId" value={event.id} />

            <Button type="submit" className="m-auto max-w-10 w-full">
                Asistir
            </Button>
        </form>
    )
}