import { LayoutCard } from "@/components/LayoutCard";
import { SocialEventCardSmall } from "@/components/SocialEvent/SocialEventCardSmall";
import { dummyUser } from "@/constants";
import getServerSession from "@/lib/getServerSession";
import { prisma } from "@/prisma";
import { User } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface EventsListProps {
  events: SocialEvent[];
  user: User;
}

const EventsList: React.FC<EventsListProps> = ({ events, user }) => (
  <>
    {events.length === 0 ? (
      <LayoutCard
        title="No hay eventos próximos"
        content={
          <p>
            Puedes crear un evento desde el menú o ingresando desde{" "}
            <Link href="/events/new" className="underline">
              acá
            </Link>
          </p>
        }
      />
    ) : (
      events.map((socialEvent) => (
        <SocialEventCardSmall
          key={`event:${socialEvent.id}`}
          event={socialEvent}
          user={user}
        />
      ))
    )}
  </>
);

const fetchEvents = async (isAdmitted: boolean): Promise<SocialEvent[]> => {
  const baseQuery = {
    where: {
      date: {
        gte: new Date(),
      },
      deleted: false,
    },
    orderBy: {
      date: "asc" as const,
    },
  };

  if (isAdmitted) {
    return await prisma.socialEvent.findMany({
      ...baseQuery,
      include: {
        owner: true,
      }
    }) as unknown as SocialEvent[];
  } else {
    const events = await prisma.socialEvent.findMany({
      ...baseQuery,
      where: {
        ...baseQuery.where,
        public: true,
      },
    }) as SocialEvent[];
    return events.map((event) => {
      return {
        ...event,
        owner: dummyUser,
      }
    });
  }
};

// Revalidate this page every 10 minutes (ISR)
export const revalidate = 600;

export default async function EventsPage() {
  const session = await getServerSession();

  if (!session?.user) {
    return redirect("/login?callbackUrl=/events");
  }

  const socialEvents = await fetchEvents(session.user.admitted);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Próximos Eventos</h1>
        <Link href="/events/new" className="bg-[#333333] text-white px-4 py-2 rounded-md hover:bg-[#444444] transition-colors">
          Crear <span className="hidden sm:inline">Nuevo</span> Evento
        </Link>
      </div>
      <Suspense fallback={<div>Cargando eventos...</div>}>
        <EventsList events={socialEvents} user={session.user} />
      </Suspense>
    </div>
  );
}