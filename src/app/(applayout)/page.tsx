import { Landing } from "@/components/landing/Landing";
import getServerSession from "@/lib/getServerSession";
import { getSocialEvents } from "@/services/api/socialEventsserver.services";

// This will make the page static at build time
export const dynamic = 'force-static';

// Revalidate the page every 3 hours (10800 seconds)
export const revalidate = 10800;

export default async function Home() {
  const session = await getServerSession();
  const events = await getSocialEvents(Boolean(session?.user.admitted)); // Assuming false means fetch only public events

  return <Landing events={events} />
}