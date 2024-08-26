"use client"

import { Toaster } from "@/components/ui/sonner"
import { FeatureProvider } from "@/contexts/FeatureProvider"
import { PopoverManagerProvider } from "@/contexts/PopoverManagerProvider"
import { Libraries, LoadScript } from "@react-google-maps/api"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const GOOGLE_MAPS_LIBRARIES: Libraries = ["places", "geometry"]

export const AppWithProviders = ({ children }: { children: ReactNode }) => {
    return (
        <FeatureProvider features={{
            socialEventsSearch: false,
            socialEventsCalendar: false,
            socialEventsGroups: false,
            userSettings: false,
            burgerMenu: false,
        }}>
            <SessionProvider>
                <PopoverManagerProvider>
                    <LoadScript
                        googleMapsApiKey={String(NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)}
                        libraries={GOOGLE_MAPS_LIBRARIES}
                    >
                        {children}

                        <Toaster />
                    </LoadScript>
                </PopoverManagerProvider>
            </SessionProvider>

        </FeatureProvider >
    )
}