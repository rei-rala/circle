import getServerSession from "@/lib/getServerSession";
import { Landing } from "../components/landing/Landing";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";
//import getTheCircleInstagramPosts from "@/services/instagram.services";

export default async function Home() {
  const session = await getServerSession();
  let instagramPosts: any[] | undefined = undefined; // = await getTheCircleInstagramPosts();
  let events: SocialEvent[] = [];

  if (session?.user) {
    redirect("/events");
  }

  try {
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
  } catch (err) {
    console.error("Error fetching events:", err);
    events = [];
  }

  return <Landing events={events} instagramPosts={instagramPosts} />;
}

Home.revalidate = 86400; // Cache for 1 day