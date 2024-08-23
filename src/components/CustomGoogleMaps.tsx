import { GoogleMap, Marker } from "@react-google-maps/api"

type CustomGoogleMapsProps = any


const defaultContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: "0.5rem"
};

export const CustomGoogleMaps = ({ containerStyle = defaultContainerStyle, markerPosition }: CustomGoogleMapsProps) => {
    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={markerPosition}
            zoom={14}
        >
            <Marker position={markerPosition} />
        </GoogleMap>
    )
}