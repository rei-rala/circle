import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateString(str: string, maxLength: number, ellipsis = "...") {
  return str.length > maxLength ? str.substring(0, maxLength) + ellipsis : str;
}

export function getEmailUserName(email: string) {
  return email.split("@")[0];
}

export function getUrlDomain(url: string) {
  return new URL(url).hostname;
}


type PlaceholderOptions = {
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  font?: string;
  text?: string;
}

export function generatePlaceholderLink({
  width = 600,
  height = 400,
  backgroundColor = 'EEE',
  textColor = '31343C',
  font = 'roboto',
  text = `${width}x${height}.png`
}: PlaceholderOptions = {}): string {
  return `https://placehold.co/${width}x${height}/${backgroundColor}/${textColor}.png?font=${font}&text=${encodeURIComponent(text)}`;
}


/**
 * No pregunten por que queria hacerlo asi, pero compara dos objetos y retorna true si son diferentes.
 * Todavia no funciona (?)
 * Debe haber otra manera, pero me gusto como quedo
 */
export function compareChangesObject<T extends object>(newObject: T, oldObject: T): boolean {
  const keys = Object.keys(newObject) as (keyof T)[];

  for (const key of keys) {
    const newValue = newObject[key];
    const oldValue = oldObject[key];

    if (typeof newValue !== typeof oldValue) return true;

    if (Array.isArray(newValue) && Array.isArray(oldValue)) {
      if (newValue.length !== oldValue.length) return true;
      for (let i = 0; i < newValue.length; i++) {
        if (compareChangesObject(newValue[i], oldValue[i])) return true;
      }
    } else if (typeof newValue === "object" && newValue !== null && typeof oldValue === "object" && oldValue !== null) {
      if (compareChangesObject(newValue, oldValue)) return true;
    } else if (newValue !== oldValue) {
      return true;
    }
  }

  return false;
}