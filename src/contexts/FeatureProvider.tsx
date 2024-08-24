import React, { createContext, useContext, ReactNode } from 'react';

type FeatureFlags = {
    socialEventsSearch?: boolean;
    socialEventsCalendar?: boolean;
    socialEventsGroups?: boolean;
    userSettings?: boolean;
}

type FeatureContextType = {
    features: FeatureFlags;
}

const defaultContextValue: FeatureContextType = {
    features: {
        socialEventsSearch: false,
        socialEventsCalendar: false,
        socialEventsGroups: false,
        userSettings: false,
    },
};

const FeatureContext = createContext<FeatureContextType>(defaultContextValue);

type FeatureProviderProps = {
    children: ReactNode;
    features: FeatureFlags;
}

export const FeatureProvider: React.FC<FeatureProviderProps> = ({ children, features }) => {
    return (
        <FeatureContext.Provider value={{ features }}>
            {children}
        </FeatureContext.Provider>
    );
};

export const useFeatureContext = () => useContext(FeatureContext);
