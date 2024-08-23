import { formatDistanceToNow, format, isFuture } from 'date-fns';
import { es } from 'date-fns/locale';

export function getDistanceFromNow(date: Date | string) {
    let distance = formatDistanceToNow(new Date(date), { locale: es });
    let prefix = isFuture(date) ? "en" : "hace";

    return `${prefix} ${distance}`;
}

export function getFullDate(date: Date | string) {
    return format(date, "dd/MM/yyyy")
}

export function getHour(date: Date | string) {
    return format(date, "HH:mm")
}

export function getFullDateAndHourWithSeparator(date: Date | string, separator = "a las") {
    return `${getFullDate(date)} ${separator} ${getHour(date)}`
}