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
    let center = initialPlace?.geometry?.location || markerPosition;

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