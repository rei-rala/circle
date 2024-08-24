"use client"

import { useFeatureContext } from "@/contexts/FeatureProvider"
import { UserMenu } from "./upper/UserMenu";

const MAX_LOWER_NAVBAR_FEATURES = 2;

/**
 * This component wraps the UserMenu component and only when lowerNavbarFeatures are being implemented and displayed
 */
export const UserMenuTempWrapper = ({ isUpper = false, className }: { isUpper?: boolean, className?: string }) => {
    const { lowerNavbarFeaturesCount } = useFeatureContext();

    if ((isUpper && lowerNavbarFeaturesCount >= MAX_LOWER_NAVBAR_FEATURES) || (!isUpper && lowerNavbarFeaturesCount < MAX_LOWER_NAVBAR_FEATURES)) {
        return <UserMenu className={className} />;
    }

    return null;
}