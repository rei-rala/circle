"use client"

import { Toaster } from "@/components/ui/sonner"
import { FeatureProvider } from "@/contexts/FeatureProvider"
import { PopoverManagerProvider } from "@/contexts/PopoverManagerProvider"
import { LoadScript } from "@react-google-maps/api"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { GoogleAnalytics } from '@next/third-parties/google'
import { GOOGLE_ANALYTICS_ID, GOOGLE_MAPS_LIBRARIES, GOOGLE_MAPS_API_KEY } from "@/constants"
import { AuthProvider } from "@/contexts/AuthProvider"


export const AppWithProviders = ({ children }: { children: ReactNode }) => {
    return (
        <FeatureProvider features={{
            socialEventsSearch: false,
            socialEventsCalendar: false,
            socialEventsGroups: false,
            userSettings: false,
            burgerMenu: false,
            instagramCarousel: false,
        }}>
            <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
            <SessionProvider>
                <AuthProvider>
                    <PopoverManagerProvider>
                        <Toaster
                            toastOptions={{
                                // limit time
                                duration: 3000,
                            }}
                        />
                        <LoadScript
                            googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                            libraries={GOOGLE_MAPS_LIBRARIES}
                        >
                            {children}
                        </LoadScript>
                    </PopoverManagerProvider>
                </AuthProvider>
            </SessionProvider>

        </FeatureProvider >
    )
}