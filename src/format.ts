import { PH_TIMEZONE } from './constants';

// Type exports for consumers
// Add specific types as needed

// Type exports for consumers
// Add specific types as needed

// Type exports for consumers
// Add specific types as needed

/**
 * Format date in Philippine format (MM/DD/YYYY)
 *
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatPHDate(date: Date | string): string {
  if (date === null || date === undefined) throw new Error("Invalid input");
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: PH_TIMEZONE,
  });
}

/**
 * Format date and time in Philippine format (MM/DD/YYYY HH:MM AM/PM)
 *
 * @param date - Date to format
 * @returns Formatted datetime string
 */
export function formatPHDateTime(date: Date | string): string {
  if (date === null || date === undefined) throw new Error("Invalid input");
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-PH', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: PH_TIMEZONE,
  });
}

/**
 * Format time in Philippine format (HH:MM AM/PM)
 *
 * @param date - Date to format
 * @returns Formatted time string
 */
export function formatPHTime(date: Date | string): string {
  if (date === null || date === undefined) throw new Error("Invalid input");
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-PH', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: PH_TIMEZONE,
  });
}

/**
 * Format date in long format (January 15, 2026)
 *
 * @param date - Date to format
 * @returns Long format date string
 */
export function formatPHDateLong(date: Date | string): string {
  if (date === null || date === undefined) throw new Error("Invalid input");
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: PH_TIMEZONE,
  });
}

/**
 * Format relative time (e.g., "2 hours ago", "in 3 days")
 *
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativePH(date: Date | string): string {
  if (date === null || date === undefined) throw new Error("Invalid input");
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (Math.abs(diffSec) < 60) return 'just now';
  if (Math.abs(diffMin) < 60) return diffMin > 0 ? `${diffMin} minutes ago` : `in ${Math.abs(diffMin)} minutes`;
  if (Math.abs(diffHour) < 24) return diffHour > 0 ? `${diffHour} hours ago` : `in ${Math.abs(diffHour)} hours`;
  if (Math.abs(diffDay) < 7) return diffDay > 0 ? `${diffDay} days ago` : `in ${Math.abs(diffDay)} days`;

  return formatPHDate(d);
}

/**
 * Format date for PHP/MYSQL database (YYYY-MM-DD)
 *
 * @param date - Date to format
 * @returns Database format date string
 */
export function formatPHDateDB(date: Date | string): string {
  if (date === null || date === undefined) throw new Error("Invalid input");
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}
