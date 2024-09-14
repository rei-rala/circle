
import { ReactNode } from 'react';
import { GoogleMapsProvider } from './GoogleMapsProvider';

export default function LayoutWithMaps({ children }: { children: ReactNode }) {
    return (
        <GoogleMapsProvider>
            {children}
        </GoogleMapsProvider>
    );
}