
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { EventCard, EventCardProps } from "../EventCard";

const events: EventCardProps[] = [
  {
    id: "1",
    title: "Picnic en el parque",
    map: "https://goo.gl/maps/xyz123",
    date: new Date(2024, 7, 25, 14, 30), // 25 de agosto de 2024, 14:30
    description: "Disfrutemos de un día al aire libre con comida casera y juegos en el parque central.",
  },
  {
    id: "2",
    title: "Noche de cine",
    map: "https://goo.gl/maps/abc456",
    date: new Date(2024, 8, 5, 20, 0), // 5 de septiembre de 2024, 20:00
    description: "Una noche para ver las últimas películas en la pantalla grande con amigos.",
  },
  {
    id: "3",
    title: "Excursión de senderismo",
    map: "https://goo.gl/maps/def789",
    date: new Date(2024, 8, 12, 8, 0), // 12 de septiembre de 2024, 08:00
    description: "Exploraremos la naturaleza en una caminata por los senderos más pintorescos de la región.",
  }
];

const moreEvents: EventCardProps[] = [
  {
    id: "4",
    title: "Cena temática",
    map: "https://goo.gl/maps/ghi012",
    date: new Date(2024, 8, 20, 19, 30), // 20 de septiembre de 2024, 19:30
    description: "Una cena especial con un tema sorpresa. Ven disfrazado según el tema de la noche.",
  },
  {
    id: "5",
    title: "Jornada de juegos de mesa",
    map: "https://goo.gl/maps/jkl345",
    date: new Date(2024, 9, 1, 15, 0), // 1 de octubre de 2024, 15:00
    description: "Un día lleno de diversión con una variedad de juegos de mesa. ¡Trae tu juego favorito!",
  },
  {
    id: "6",
    title: "Visita a la feria de artesanías",
    map: "https://goo.gl/maps/mno678",
    date: new Date(2024, 9, 15, 10, 0), // 15 de octubre de 2024, 10:00
    description: "Exploraremos la creatividad local en la feria de artesanías. Ideal para comprar regalos únicos.",
  }
];


export function CircleBase() {
  return (

      <div className="flex-1 overflow-auto bg-[#1a1a1a]">
        <div className="p-4 grid gap-4">
          <Card className="bg-[#222222] p-4 rounded-lg  text-white">
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {
                  events.map((event) => <EventCard key={`event${event.id}`} event={event} />)
                }
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#222222] p-4 rounded-lg  text-white">
            <CardHeader>
              <CardTitle>Eventos Sugeridos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 ">
                {
                  moreEvents.map((event) => <EventCard key={`event${event.id}`} event={event} />)
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
  )
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}


function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
