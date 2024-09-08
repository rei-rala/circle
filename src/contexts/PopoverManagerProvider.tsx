"use client"

import React, { createContext, useContext, ReactNode, useState, useRef } from 'react';

type PopoverManagerContextType = {
    currentPopoverRef: React.RefObject<HTMLElement> | null;
    setCurrentPopoverRef: (ref: React.RefObject<HTMLElement> | null) => void;
    closePopover: () => void;
}

const defaultContextValue: PopoverManagerContextType = {
    currentPopoverRef: null,
    setCurrentPopoverRef: () => { },
    closePopover: () => { },
};

const CurrentPopoverContext = createContext<PopoverManagerContextType>(defaultContextValue);

type PopoverManagerProviderProps = {
    children: ReactNode;
}

export const PopoverManagerProvider: React.FC<PopoverManagerProviderProps> = ({ children }) => {
    const [currentPopoverRef, setCurrentPopoverRef] = useState<React.RefObject<HTMLElement> | null>(null);
    const closePopover = () => setCurrentPopoverRef(null);

    return (
        <CurrentPopoverContext.Provider value={{ currentPopoverRef, setCurrentPopoverRef, closePopover }}>
            {children}
        </CurrentPopoverContext.Provider>
    );
};

export const usePopoverManagerContext = () => useContext(CurrentPopoverContext);
