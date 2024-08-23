import { EventsPageComponent } from "@/components/component/events-page";
import { Suspense } from "react";

export default function EventsPage() {
  return (
    <Suspense fallback="cargando">
      <EventsPageComponent />
    </Suspense>
  );
}
