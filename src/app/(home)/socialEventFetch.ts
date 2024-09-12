import { dummyUser } from "@/constants";
import { prisma } from "@/prisma";
import "server-only"

export const socialEventFetch = async (fullData?: boolean) => {
    let events: SocialEvent[] = [];
    try {

        if (fullData) {

            events = await prisma.socialEvent.findMany({
                take: 5,
                where: {
                    date: {
                        gt: new Date(),
                    },
                    public: true,
                    deleted: false,
                },
                orderBy: {
                    date: "asc",
                },
            }) as unknown as SocialEvent[];
        } else {
            events = await prisma.socialEvent.findMany({
                take: 5,
                where: {
                    date: {
                        gt: new Date(),
                    },
                    public: true,
                    deleted: false,
                },
                orderBy: {
                    date: "asc",
                },
            }) as unknown as SocialEvent[];

            return events.map((event) => {
                event.owner = dummyUser;

                return event;
            })
        }

    } catch (err) {
        console.error("Error fetching events:", err);
        events = [];
    }

    return events;
}
