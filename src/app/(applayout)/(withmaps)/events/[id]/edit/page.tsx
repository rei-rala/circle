import Loading from "@/components/Loading";
import { Suspense } from "react";
import { EditEventPageComponent } from "./EditEventPage";


export default async function EditEventPage({ params: { id } }: { params: { id: string } }) {
    return (
        <Suspense fallback={<Loading title="tu evento" />}>
            <EditEventPageComponent id={id} mode="edit" />
        </Suspense>
    );
}
