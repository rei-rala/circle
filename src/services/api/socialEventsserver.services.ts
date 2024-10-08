import "server-only"
import { prisma } from "@/prisma";

export const getSocialEvents = async (fullData?: boolean | null) => {
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

            return events
            // .map((event) => {
            //     event.owner = dummyUser;

            //     return event;
            // })
        }

    } catch (err) {
        console.error("Error fetching events:", err);
        events = [];
    }

    return events;
}
