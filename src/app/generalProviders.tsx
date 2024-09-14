"use client"

import { Toaster } from "@/components/ui/sonner"
import { FeatureProvider } from "@/contexts/FeatureProvider"
import { PopoverManagerProvider } from "@/contexts/PopoverManagerProvider"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { GoogleAnalytics } from '@next/third-parties/google'
import { GOOGLE_ANALYTICS_ID } from "@/constants"
import { AuthProvider } from "@/contexts/AuthProvider"


export const GeneralProviders = ({ children }: { children: ReactNode }) => {
    return (
        <FeatureProvider features={{
            productionReady: false,

            socialEventsSearch: false,
            socialEventsCalendar: false,
            socialEventsGroups: false,
            userSettings: false,
            burgerMenu: false,
            instagramCarousel: false,
        }}>
            <SessionProvider>
                <AuthProvider>
                    <PopoverManagerProvider>
                        <Toaster
                            toastOptions={{
                                // limit time
                                duration: 3000,
                            }}
                        />
                        {children}
                    </PopoverManagerProvider>
                </AuthProvider>
            </SessionProvider>

            <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
        </FeatureProvider >
    )
}