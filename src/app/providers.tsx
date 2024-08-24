"use client"

import { FeatureProvider } from "@/contexts/FeatureProvider"
import { LoadScript } from "@react-google-maps/api"
import { ReactNode } from "react"

const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

export const AppWithProviders = ({ children }: { children: ReactNode }) => {
    return (
        <FeatureProvider features={{
            socialEventsSearch: false,
            socialEventsCalendar: false,
            socialEventsGroups: false,
            userSettings: false,
        }}>
            <LoadScript
                googleMapsApiKey={String(NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)}
                libraries={['places']} // Include the Places library
            >
                {children}
            </LoadScript>
        </FeatureProvider>
    )
}