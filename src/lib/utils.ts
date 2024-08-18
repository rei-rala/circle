import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date, intlOptions?: Intl.DateTimeFormatOptions) {
  if (!date) return 'Fecha desconocida';
  if (typeof window === 'undefined') return date.toString();

  return new Intl.DateTimeFormat(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...intlOptions,
  }).format(date);
};


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