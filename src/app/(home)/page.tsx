import { Landing } from "@/components/landing/Landing";
import getServerSession from "@/lib/getServerSession";
import { redirect } from "next/navigation";
import { socialEventFetch } from "./socialEventFetch";
//import getTheCircleInstagramPosts from "@/services/instagram.services";

export default async function Home() {
  const session = await getServerSession();
  let instagramPosts: any[] | undefined = undefined; // = await getTheCircleInstagramPosts();
  
  const isUserBannedOrPendingAdmission = !session?.user.admitted || session?.user.banned
  
  if (session?.user) {
    redirect("/events");
  }
  
  const events: SocialEvent[] = await socialEventFetch(!isUserBannedOrPendingAdmission);
  

  return <Landing events={events} instagramPosts={instagramPosts} />;
}

Home.revalidate = 86400; // Cache for 1 day