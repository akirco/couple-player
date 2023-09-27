import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function baseUrl() {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://peer.extrameta.cn';
}

export async function checkApiAvailability(apiUrl: string) {
  const response = await fetch(apiUrl);
  if (response.ok) {
  } else {
  }
}

export function deduplicate<T>(arr: Array<T>): Array<T> {
  return arr.reduce((acc: Array<T>, cur: T) => {
    if (!acc.includes(cur)) {
      acc.push(cur);
    }
    return acc;
  }, []);
}
