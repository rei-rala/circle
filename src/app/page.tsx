import getServerSession from "@/lib/getServerSession";
import { Landing } from "../components/landing/Landing";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";
import { Metadata } from "next";
//import getTheCircleInstagramPosts from "@/services/instagram.services";

export const metadata: Metadata = {
  icons: [
    { rel: "icon", url: "/icon.png" },
    { rel: "apple-touch-icon", url: "/icon.png" },
    { rel: "icon", url: "/icon.webp", type: "image/webp" },
    { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
    { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
  ],
  openGraph: {
    title: "⭕ The Circle",
    description: "⭕THE CIRCLE 🇦🇷 es una comunidad social en Buenos Aires que organiza eventos para conectar personas y disfrutar de la ciudad. Únete y participa en experiencias únicas.",
    url: "https://thecircle.com.ar",
    siteName: "The Circle",
    images: [
      {
        url: "/icon.png",
        width: 350,
        height: 350,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "⭕ The Circle",
    description: "⭕THE CIRCLE 🇦🇷 es una comunidad social en Buenos Aires que organiza eventos para conectar personas y disfrutar de la ciudad. Únete y participa en experiencias únicas.",
    images: ["/icon.png"],
  },
  manifest: "/manifest.json",
  robots: "index, follow",
  alternates: {
    canonical: "https://thecircle.com.ar",
    languages: {
      "es-AR": "https://thecircle.com.ar",
    },
  },
}


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
