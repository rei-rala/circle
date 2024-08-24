"use client"

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type PopoverManagerContextType = {
    currentPopoverId: string | null;
    setCurrentPopoverId: (popoverId: string | null) => void;
    closePopover: () => void;
}

const defaultContextValue: PopoverManagerContextType = {
    currentPopoverId: null,
    setCurrentPopoverId: () => { },
    closePopover: () => { },
};

const CurrentPopoverContext = createContext<PopoverManagerContextType>(defaultContextValue);

type PopoverManagerProviderProps = {
    children: ReactNode;
}

export const PopoverManagerProvider: React.FC<PopoverManagerProviderProps> = ({ children }) => {
    const [currentPopoverId, setCurrentPopoverId] = useState<string | null>(null)
    const closePopover = () => setCurrentPopoverId(null)

    return (
        <CurrentPopoverContext.Provider value={{ currentPopoverId, setCurrentPopoverId, closePopover }}>
            {children}
        </CurrentPopoverContext.Provider>
    );
};

export const usePopoverManagerContext = () => useContext(CurrentPopoverContext);
