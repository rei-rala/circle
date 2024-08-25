import MyMapWithSearch from "@/components/MyMapWithSearch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPinIcon } from "lucide-react"
import { Dispatch, SetStateAction } from "react"



export const PlaceSelector = ({ mapsPlace, setSocialEvent, disabled }: { mapsPlace?: google.maps.places.PlaceResult | null, setSocialEvent: Dispatch<SetStateAction<SocialEvent>>, disabled: boolean }) => {
    const handlePlaceChange = (place: google.maps.places.PlaceResult) => {
        setSocialEvent((prev) => ({
            ...prev, place: place as google.maps.places.PlaceResult & { photos: (google.maps.places.PlacePhoto & { url: string })[] }
        }))
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5" />
                <Label htmlFor="maps-place">Seleccion de lugar</Label>
            </div>
            <MyMapWithSearch
                mapsPlace={mapsPlace}
                setMapsPlace={handlePlaceChange}
                customInput={
                    < Input
                        id="maps-place"
                        placeholder="Busca una ubicación en Google Maps"
                        disabled={disabled}
                    />
                }
            />
        </div>
    )
}