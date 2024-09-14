import { joinEvent } from "@/app/(applayout)/(withmaps)/events/[id]/actions";
import { FormButton } from "../FormButton";


export function SocialEventJoin({ event }: { event: SocialEvent }) {
    return (
        <form className='flex flex-col gap-2 text-center font-bold' action={joinEvent}>
            <span>¿Quieres asistir a este evento?</span>
            <input type="hidden" name="eventId" value={event.id} />

            <div>
                <FormButton
                    loadingIndicator
                    type="submit"
                    className="m-auto w-32 max-w-full"
                >
                    Asistir
                </FormButton>
            </div>
        </form>
    )
}