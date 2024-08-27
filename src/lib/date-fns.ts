import { formatDistanceToNow, format, isFuture, addDays, isBefore, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

export function getDistanceFromNow(date: Date | string) {
    let distance = formatDistanceToNow(new Date(date), { locale: es });
    let prefix = isFuture(date) ? "en" : "hace";

    return `${prefix} ${distance}`;
}

export function getFullDate(date: Date | string) {
    return format(date, "dd/MM/yyyy", { locale: es });
}

export function getHour(date: Date | string) {
    return format(date, "HH:mm", { locale: es });
}

export function shiftDateByDays(date?: Date | string | null, days?: number) {
    let addedDays = days ?? 1;
    let newDate = date ? new Date(date) : new Date();

    return addDays(newDate, addedDays);
}

export function isDateInPast(date?: Date | string | number | null) {
    if (
        !date ||
        typeof date === "string" && date && !isValid(new Date(date))
    ) {
        return false;
    }

    return isBefore(date, new Date());
};


export function getFullDateAndHourWithSeparator(date: Date | string, separator = "a las") {
    return `${getFullDate(date)} ${separator} ${getHour(date)}`
}