import getServerSession from "@/lib/getServerSession";
import { Landing } from "../components/landing/Landing";
import { redirect } from "next/navigation";
import getTheCircleInstagramPosts from "@/services/instagram.services";

export default async function Home() {
  const session = await getServerSession();
  let instagramPosts: any[]	 = [];
  //const instagramPosts = await getTheCircleInstagramPosts();
  let events: SocialEvent[];

  if (session?.user) redirect("/events")

  return <Landing instagramPosts={instagramPosts} />
}
