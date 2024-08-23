"use client"

import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { CustomGoogleMaps } from './CustomGoogleMaps';

type MyMapsWithSearchProps = {
  markerPosition: MarkerPosition,
  setMarkerPosition: ({ lat, lng }: MarkerPosition) => void,
  setMapsPlace: (googleMapsPlace: any) => void
}

function MyMapWithSearch({ markerPosition, setMarkerPosition, setMapsPlace }: MyMapsWithSearchProps) {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      if (place) {
        setMapsPlace(place);
      }
      if (place.geometry) {
        setMarkerPosition({
          lat: place.geometry.location?.lat() ?? 0,
          lng: place.geometry.location?.lng() ?? 0,
        });
      }
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <Autocomplete
        onLoad={(autocomplete) => autocompleteRef.current = autocomplete}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          className='text-primary p-2 w-full rounded-sm border-solid border-1 border-red-500'
          placeholder="Buscar un lugar..."
        />
      </Autocomplete>
      <CustomGoogleMaps markerPosition={markerPosition} />
    </div>
  );
};

export default React.memo(MyMapWithSearch);
