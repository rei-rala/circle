import { PRODUCTION_READY } from '@/constants';
import React, { createContext, useContext, ReactNode } from 'react';

type FeatureFlags = {
    productionReady?: boolean;

    socialEventsSearch?: boolean;
    socialEventsCalendar?: boolean;
    socialEventsGroups?: boolean;
    userSettings?: boolean;
    burgerMenu?: boolean;
    instagramCarousel?: boolean;
}

type FeatureContextType = {
    features: FeatureFlags;
    lowerNavbarFeaturesCount: number;
}

const defaultContextValue: FeatureContextType = {
    features: {
        productionReady: PRODUCTION_READY ?? false,

        socialEventsSearch: false,
        socialEventsCalendar: false,
        socialEventsGroups: false,
        userSettings: false,
        burgerMenu: false,
        instagramCarousel: false,
    },
    lowerNavbarFeaturesCount: 0,
};

const FeatureContext = createContext<FeatureContextType>(defaultContextValue);

type FeatureProviderProps = {
    children: ReactNode;
    features: FeatureFlags;
}

export const FeatureProvider: React.FC<FeatureProviderProps> = ({ children, features }) => {
    const lowerNavbarFeatures = [features.userSettings, features.socialEventsCalendar, features.socialEventsGroups]
    const lowerNavbarFeaturesCount = lowerNavbarFeatures.filter((feature) => feature).length;

    return (
        <FeatureContext.Provider value={{ features, lowerNavbarFeaturesCount }}>
            {children}
        </FeatureContext.Provider>
    );
};

export const useFeatureContext = () => useContext(FeatureContext);
