/* eslint-disable @next/next/no-img-element */
"use client"

import MyMapWithSearch from "@/components/MyMapWithSearch";
import { useState } from "react";



export default function TestPage() {
    const [mapsPlace, setMapsPlace] = useState<google.maps.places.PlaceResult>()
    const { place_id = null, photos = [], name = null, formatted_address = null, url = null } = mapsPlace ?? {}

    return (
        <>
            <h1>test marker</h1>
            <div>
                {[name, photos[0]?.getUrl() ?? "", place_id, formatted_address, url].map((x, idx) => (
                    <p key={idx}>{String(x)}</p>
                ))}


                {/* {
                    photos[0]?.getUrl() &&
                    <img
                        src={photos[0].getUrl()}
                        alt={`Foto de ${name}`}
                        style={{
                            objectFit: "cover",
                            maxWidth: "100px",
                            maxHeight: "100px",
                        }}
                    />
                } */}
            </div>

            <MyMapWithSearch mapsPlace={mapsPlace} setMapsPlace={setMapsPlace} />
        </>
    )
}