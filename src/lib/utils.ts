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