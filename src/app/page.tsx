import getServerSession from "@/lib/getServerSession";
import { Landing } from "../components/landing/Landing";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";
import { Metadata } from "next";
//import getTheCircleInstagramPosts from "@/services/instagram.services";

export default async function Home() {
  const session = await getServerSession();
  let instagramPosts: any[] | undefined = undefined; // = await getTheCircleInstagramPosts();
  let events: SocialEvent[] = [];

  if (session?.user) redirect("/events")

  try {
    if (session?.user) {
      throw new Error("User logged in, redirecting to events")
    }
    // find events that are not in the past and not deleted, if logged, show only public events
    events = await prisma.socialEvent.findMany({
      take: 5,
      where: {
        date: {
          gt: new Date(),
        },
        public: true,
        deletedAt: undefined,
      },
      orderBy: {
        date: "asc",
      },
    }) as SocialEvent[] || []
  } catch (err) {
    console.log("Error fetching events")
    console.log(err)
    events = [];
  }

  return <Landing events={events} instagramPosts={instagramPosts} />
}
