import { type ClassValue, clsx } from "clsx"
import { Session, User } from "next-auth";
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
    if ((newValue && !oldValue) || (!newValue && oldValue)) return true;

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

export function scrollToId(id: string, options?: ScrollToOptions) {
  const element = document.getElementById(id);
  //const navbarHeight = document.getElementById("navbar")?.clientHeight || 0;

  element?.scrollIntoView({
    block: "start",
    behavior: "smooth",
    ...options
  })
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

export function hasElevatedRole(curr?: User | Session | null) {
  let role = "";

  if (!curr) return false;

  if ("role" in curr) {
    role = curr.role || "";
  } else if ("user" in curr) {
    role = curr.user.role || "";
  }

  role = role?.toUpperCase();

  return role === "ADMIN" || role === "MASTER";
}

export function getZodiacSign(date: Date): { sign: string; emoji: string } {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: "Aries", emoji: "♈" };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: "Tauro", emoji: "♉" };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: "Géminis", emoji: "♊" };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: "Cáncer", emoji: "♋" };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: "Leo", emoji: "♌" };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: "Virgo", emoji: "♍" };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: "Libra", emoji: "♎" };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: "Escorpio", emoji: "♏" };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: "Sagitario", emoji: "♐" };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: "Capricornio", emoji: "♑" };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: "Acuario", emoji: "♒" };
  return { sign: "Piscis", emoji: "♓" };
};


export function getGender(gender: string): { label: string; value: string; emoji: string } {
  const genderMap: { [key: string]: { label: string; value: string; emoji: string } } = {
    masculino: { label: "Masculino", value: "masculino", emoji: "♂️" },
    femenino: { label: "Femenino", value: "femenino", emoji: "♀️" },
  };

  const normalizedGender = gender.toLowerCase().trim();
  return genderMap[normalizedGender] || { label: "No especificado", value: "no_especificado", emoji: "⚧️" };
}
