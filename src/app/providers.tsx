"use client"

import { LoadScript } from "@react-google-maps/api"
import { ReactNode } from "react"

const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

export const AppWithProviders = ({ children }: { children: ReactNode }) => {
    return (
        <LoadScript
            googleMapsApiKey={String(NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)}
            libraries={['places']} // Include the Places library
        >
            {children}
        </LoadScript>
    )
}