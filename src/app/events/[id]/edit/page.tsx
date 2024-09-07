import Loading from "@/components/Loading";
import { EditEventPageComponent } from "@/app/events/EditEventPage";
import { Suspense } from "react";


export default async function EditEventPage({ params: { id } }: { params: { id: string } }) {
    return (
        <Suspense fallback={<Loading title="tu evento" />}>
            <EditEventPageComponent id={id} mode="edit" />
        </Suspense>
    );
}
