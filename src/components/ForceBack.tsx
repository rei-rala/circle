"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ForceBack = () => {
    const router = useRouter();

    useEffect(() => {
        router.back();
    }, [router]);

    return null;
}
