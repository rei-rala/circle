"use client"

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface ImageWithLoaderProps extends Omit<ImageProps, 'onLoad'> {
    placeholderColor?: string;
    placeholderProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    hoverEffect?: boolean;
}

export function ImageWithLoader({
    placeholderColor = "bg-gray-300/10",
    className,
    placeholderProps,
    alt,
    ...props
}: ImageWithLoaderProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        if (imageLoaded) {
            setTimeout(() => setShowImage(true), 100);
        }
    }, [imageLoaded]);

    return (
        <div
            className="relative"
        >
            {!imageLoaded && (
                <div className={cn(
                    "animate-pulse absolute inset-0",
                    placeholderColor,
                    className,
                    props.width && `w-[${props.width}px]`,
                    props.height && `h-[${props.height}px]`,
                    placeholderProps?.className
                )} />
            )}
            <Image
                {...props}
                alt={alt}
                onLoad={() => setImageLoaded(true)}
                className={cn(
                    "transition-all duration-700 ease-in-out",
                    showImage ? "opacity-75" : "opacity-0",
                    className
                )}
            />
        </div>
    );
}