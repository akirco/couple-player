import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { nanoid } from 'nanoid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genStorageId() {
  return nanoid(20);
}

export async function checkApiAvailability(apiUrl: string) {
  const response = await fetch(apiUrl);
  if (response.ok) {
  } else {
  }
}
