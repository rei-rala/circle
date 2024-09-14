"use client"

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface ImageWithLoaderProps extends Omit<ImageProps, 'onLoad'> {
    placeholderColor?: string;
    placeholderProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    hoverEffect?: boolean;
    containerClassName?: string;
}

export function ImageWithLoader({
    placeholderColor = "bg-gray-300/10",
    className,
    placeholderProps,
    alt,
    containerClassName,
    ...props
}: ImageWithLoaderProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        if (imageLoaded) {
            setTimeout(() => setShowImage(true), 100);
        }
    }, [imageLoaded]);

    const isFill = 'fill' in props && props.fill === true;

    const containerClasses = cn(
        "relative",
        className,
        containerClassName
    );

    const placeholderClasses = cn(
        "animate-pulse absolute inset-0",
        placeholderColor,
        className,
        isFill ? "w-full h-full" : "",
        placeholderProps?.className
    );

    return (
        <div className={containerClasses}>
            {!imageLoaded && (
                <div className={placeholderClasses} />
            )}
            <Image
                {...props}
                width={props.fill ? undefined : props.width}
                height={props.fill ? undefined : props.height}
                alt={alt}
                onLoad={() => setImageLoaded(true)}
                className={cn(
                    "transition-opacity duration-700 ease-in-out",
                    showImage ? "opacity-100" : "opacity-0",
                    className
                )}
            />
        </div>
    );
}