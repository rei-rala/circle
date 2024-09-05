"use client"

import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { CustomGoogleMaps } from './CustomGoogleMaps';


const defaultMarkerPosition: google.maps.LatLngLiteral | google.maps.LatLng = {
  lat: -34.603851,
  lng: -58.381775
};

type MyMapsWithSearchProps = {
  customInput?: any;
  setMarkerPosition?: ({ lat, lng }: MarkerPosition) => void,
  mapsPlace?: google.maps.places.PlaceResult | null,
  setMapsPlace?: (googleMapsPlace: any) => void
}

function MyMapWithSearch({ customInput, mapsPlace, setMapsPlace }: MyMapsWithSearchProps) {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const markerPosition = mapsPlace?.geometry?.location || defaultMarkerPosition;

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      if (place) {
        setMapsPlace && setMapsPlace(place);
      }
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <Autocomplete
        onLoad={(autocomplete) => autocompleteRef.current = autocomplete}
        onPlaceChanged={handlePlaceChanged}
      >
        {
          customInput ??
          <input
            type="text"
            className='text-primary p-2 w-full rounded-sm border-solid border-1 border-red-500'
            placeholder="Buscar un lugar..."
          />
        }
      </Autocomplete>
      <CustomGoogleMaps markerPosition={markerPosition} />
    </div>
  );
};

export default React.memo(MyMapWithSearch);
