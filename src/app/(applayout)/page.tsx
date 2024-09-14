import getServerSession from "@/lib/getServerSession";
import { redirect } from "next/navigation";
import { Landing } from "@/components/landing/Landing";
import { getSocialEvents } from "@/services/socialEventsserver.services";

// Next.js will invalidate the cache when a request comes in, at most once every 3 hours
export const revalidate = 10800;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true

export default async function Home() {
  const session = await getServerSession();
  const events = await getSocialEvents(session?.user.admitted);

  return <Landing events={events} />
}