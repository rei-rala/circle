import { getFullDate } from "@/lib/date-fns";

export function SocialEventBannedFrom({ attendee }: { attendee?: Attendee }) {
    if (!attendee) return null;

    const { bannedFromEvent, banReason } = attendee;

    return (
        bannedFromEvent && (
            <div>
                <span>Has sido bloqueado del evento el {getFullDate(bannedFromEvent || new Date())}</span>
                <span>Razón: {banReason}</span>
            </div >
        )
    )
}