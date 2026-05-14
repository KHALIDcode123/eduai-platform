import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes without conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string into a human-readable format.
 */
export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const defaults: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options ?? defaults);
}

/**
 * Format a score as a percentage string.
 */
export function formatScore(score: number, maxScore: number): string {
  if (maxScore === 0) return "N/A";
  return `${Math.round((score / maxScore) * 100)}%`;
}

/**
 * Return a Tailwind colour class based on a percentage score.
 */
export function scoreColour(percentage: number): string {
  if (percentage >= 90) return "text-green-600";
  if (percentage >= 70) return "text-blue-600";
  if (percentage >= 50) return "text-yellow-600";
  return "text-red-600";
}

/**
 * Truncate a string to a maximum length, appending an ellipsis if needed.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

/**
 * Generate a random alphanumeric ID (not cryptographically secure).
 */
export function generateId(length = 12): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

/**
 * Debounce a function call.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
