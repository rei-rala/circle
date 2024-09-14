"use client";

import { ReactNode } from 'react';
import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_LIBRARIES } from "@/constants";
import Loading from "@/components/Loading";

export function GoogleMapsProvider({ children }: { children: ReactNode }) {
    const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: GOOGLE_MAPS_LIBRARIES as Libraries,
        language: "es",
        region: "AR",
        preventGoogleFontsLoading: true,
    });

    if (loadError) return <p className="text-red-500">Error al cargar Google Maps</p>

    if (!scriptLoaded) return <Loading title="Google Maps" />

    return <>{children}</>;
}