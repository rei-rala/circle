import { useMemo, useState } from "react";

export type FilterableFields<T> = {
    [K in keyof T]?: (item: T[K]) => boolean;
};

export function useFilteredList<T>(list: T[], filterableFields: FilterableFields<T>) {
    const [filter, setFilter] = useState("");

    const filteredList = useMemo(() => {
        return list.filter(item =>
            Object.entries(filterableFields).some(([key, filterFn]) => {
                const value = item[key as keyof T];
                return filterFn && typeof filterFn === 'function' && filterFn(value as T[keyof T]) && String(value).toLowerCase().includes(filter.toLowerCase());
            })
        );
    }, [list, filter, filterableFields]);

    return { filteredList, filter, setFilter };
}