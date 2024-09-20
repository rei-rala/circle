"use client"

import { User } from "next-auth";
import { Input } from "@/components/ui/input";
import { FilterableFields, useFilteredList } from "@/app/hooks/useFulterableField";
import { UserCard } from "./UserCard";
import { useEffect, useRef } from "react";

import autoAnimate from "@formkit/auto-animate"

type AdminActionContainerProps = {
    users: User[];
    emptyMessage?: string;
    actionLabel: string;
    actionVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    actionClassName?: string;
    formAction?: (formData: FormData) => Promise<any>;
}

export function AdminActionContainer({
    users,
    emptyMessage = "No se encontraron usuarios",
    actionLabel = "Acción",
    actionVariant = "default",
    actionClassName,
    formAction,
}: AdminActionContainerProps) {
    const container = useRef<HTMLDivElement | null>(null);
    const filterableFields: FilterableFields<User> = {
        name: (name) => typeof name === 'string',
        email: (email) => typeof email === 'string',
        alias: (alias) => typeof alias === 'string',
        phone: (phone) => typeof phone === 'string',
        id: (id) => typeof id === 'string',
    };

    const { filteredList: filteredUsers, filter, setFilter } = useFilteredList(users, filterableFields);
    
    useEffect(() => {
        if (container.current) autoAnimate(container.current);
    }, [container]);

    return (
        <div className="flex flex-col gap-4" ref={container}>
            {filteredUsers.length > 0 && (
                <Input
                    type="text"
                    placeholder="Filtrar usuarios..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="mb-4"
                />
            )}
            {filteredUsers.length === 0 ? (
                <div className="flex items-center justify-center">
                    <span className="text-sm text-gray-500">{emptyMessage}</span>
                </div>
            ) : (
                filteredUsers.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        actionLabel={actionLabel}
                        formAction={formAction}
                        actionVariant={actionVariant}
                        actionClassName={actionClassName}
                    />
                ))
            )}
        </div>
    );
}