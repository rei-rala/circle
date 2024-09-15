"use client"

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthProvider";
import { useFeatureContext } from "@/contexts/FeatureProvider";
import { cn } from "@/lib/utils";
import { BellIcon } from "lucide-react";
import Link from "next/link";


export const Notifications = ({ className }: { className?: string }) => {
    const { user, isLoadingSession } = useAuth();
    const { features: { notifications } } = useFeatureContext();


    if (isLoadingSession) {
        return (
            <Button className="rounded-full hover:bg-[#333333]" variant="ghost">
                <Skeleton className="w-6 h-6" />
            </Button>
        );
    }
    
    if (!notifications || !user) return null;


    return (
        <Link href="/notifications">
            <Button className={cn("rounded-full hover:bg-[#333333]", className)} variant="ghost">
                <BellIcon className="w-6 h-6" />
                <span className="sr-only">Notificaciones</span>
            </Button>
        </Link>
    )
}