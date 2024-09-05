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
  try {
    return new URL(url).hostname;
  } catch (err) {
    return truncateString(url, 20);
  }
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
 * Compara dos objetos y retorna true si son diferentes.
 * La función es recursiva y maneja primitivos, arrays y objetos.
 */
export function compareChangesObject<T>(newValue: T, oldValue: T): boolean {
  // Si los tipos son diferentes, los objetos son diferentes
  if (typeof newValue !== typeof oldValue) return true;

  // Comparación de primitivos
  if (typeof newValue !== 'object' || newValue === null) {
    return newValue !== oldValue;
  }

  // Comparación de arrays
  if (Array.isArray(newValue) && Array.isArray(oldValue)) {
    if (newValue.length !== oldValue.length) return true;
    for (let i = 0; i < newValue.length; i++) {
      if (compareChangesObject(newValue[i], oldValue[i])) return true;
    }
    return false;
  }

  // Comparación de objetos
  if (typeof newValue === 'object' && typeof oldValue === 'object') {
    const newKeys = Object.keys(newValue);
    const oldKeys = Object.keys(oldValue as object);

    // Si el número de propiedades es diferente, los objetos son diferentes
    if (newKeys.length !== oldKeys.length) return true;

    for (const key of newKeys) {
      if (compareChangesObject(newValue[key as keyof T], (oldValue as any)[key])) return true;
    }
    return false;
  }

  // Este punto no debería alcanzarse, pero lo incluimos por seguridad
  return true;
}