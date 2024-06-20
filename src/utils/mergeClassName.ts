import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function mergeClassName(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
