import getServerSession from "@/lib/getServerSession";
import { Landing } from "../../components/landing/Landing";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";

export default async function AlternativeHome() {
    const session = await getServerSession();
    if (!session?.user) redirect("/")
    let events: SocialEvent[];

    try {
        if (!session?.user) {
            throw new Error("User not logged in")
        }
        // find events that are not in the past and not deleted, if logged, show only public events
        events = await prisma.socialEvent.findMany({
            take: 5,
            where: {
                public: true,
                date: {
                    gte: new Date() // Only fetch events that are not in the past
                },
                deletedAt: undefined // Only fetch events that are not deleted
            },
            orderBy: {
                date: "asc",
            },
            include: {
                owner: true
            }
        }) as unknown as SocialEvent[] || []
    } catch (err) {
        console.error("Error fetching events:", err)
        events = [];
    }


    return <Landing events={events} />
}
