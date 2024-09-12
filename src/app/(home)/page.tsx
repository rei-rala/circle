import { Landing } from "@/components/landing/Landing";
import getServerSession from "@/lib/getServerSession";
import { redirect } from "next/navigation";
//import getTheCircleInstagramPosts from "@/services/instagram.services";

export default async function Home() {
  const session = await getServerSession();
  let instagramPosts: any[] | undefined = undefined; // = await getTheCircleInstagramPosts();


  if (session?.user) {
    redirect("/events");
  }

  return <Landing instagramPosts={instagramPosts} />;
}

Home.revalidate = 86400; // Cache for 1 day