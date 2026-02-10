import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge multiple class(Name) strings while keeping Tailwind functionality.
 * @param inputs - The class(name) strings to merge.
 * @returns A combined class string.
 */
export function merge(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
