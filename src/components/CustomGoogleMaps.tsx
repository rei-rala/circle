import { GoogleMap, Marker } from "@react-google-maps/api"

type CustomGoogleMapsProps = {
    containerStyle?: React.CSSProperties;
    markerPosition?: google.maps.LatLngLiteral | google.maps.LatLng;
    initialPlace?: google.maps.places.PlaceResult | null;
}


const defaultMarkerPosition: google.maps.LatLngLiteral | google.maps.LatLng = {
    lat: -34.603851,
    lng: -58.381775
};

const defaultContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: "0.5rem"
};

export const CustomGoogleMaps = ({ containerStyle = defaultContainerStyle, markerPosition = defaultMarkerPosition, initialPlace }: CustomGoogleMapsProps) => {

    let center = markerPosition;

    try {
        if (typeof initialPlace === 'string') center = JSON.parse(initialPlace).geometry.location;
    } catch (error) {
        console.error("Error parsing initialPlace")
        console.error(error)
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
        >
            <Marker position={center} />
        </GoogleMap>
    )
}