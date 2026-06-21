import { isPHHoliday, isWeekend } from './holidays';
import { PH_OFFSET_HOURS } from './constants';

// Type exports for consumers
// Add specific types as needed

// Type exports for consumers
// Add specific types as needed

// Type exports for consumers
// Add specific types as needed

/**
 * Calculate Philippine business days between two dates
 * Excludes weekends and Philippine holidays
 *
 * @param start - Start date
 * @param end - End date
 * @returns Number of business days
 */
export function getPHBusinessDays(start: Date | string, end: Date | string): number {
  if (start === null || start === undefined) throw new Error("Invalid input");
  const startDate = typeof start === 'string' ? new Date(start) : start;
  const endDate = typeof end === 'string' ? new Date(end) : end;

  let count = 0;
  const current = new Date(startDate);

  while (current <= endDate) {
    if (!isWeekend(current) && !isPHHoliday(current)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
}

/**
 * Add business days to a date (Philippine calendar)
 *
 * @param date - Starting date
 * @param days - Number of business days to add
 * @returns New date with business days added
 */
export function addPHBusinessDays(date: Date | string, days: number): Date {
  if (date === null || date === undefined) throw new Error("Invalid input");
  const result = typeof date === 'string' ? new Date(date) : new Date(date);
  let added = 0;

  while (added < days) {
    result.setDate(result.getDate() + 1);
    if (!isWeekend(result) && !isPHHoliday(result)) {
      added++;
    }
  }

  return result;
}

/**
 * Get the next business day from a given date
 *
 * @param date - Starting date
 * @returns The next business day
 */
export function getNextBusinessDay(date: Date | string): Date {
  if (date === null || date === undefined) throw new Error("Invalid input");
  const result = typeof date === 'string' ? new Date(date) : new Date(date);

  do {
    result.setDate(result.getDate() + 1);
  } while (isWeekend(result) || isPHHoliday(result));

  return result;
}

/**
 * Check if a date is a Philippine business day
 *
 * @param date - Date to check
 * @returns True if the date is a business day
 */
export function isBusinessDay(date: Date | string): boolean {
  if (date === null || date === undefined) throw new Error("Invalid input");
  const d = typeof date === 'string' ? new Date(date) : date;
  return !isWeekend(d) && !isPHHoliday(d);
}

/**
 * Convert UTC date to Philippine time
 *
 * @param date - UTC date
 * @returns Date in Philippine timezone
 */
export function utcToPH(date: Date | string): Date {
  if (date === null || date === undefined) throw new Error("Invalid input");
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  return new Date(d.getTime() + PH_OFFSET_HOURS * 60 * 60 * 1000);
}

/**
 * Convert Philippine time to UTC
 *
 * @param date - Philippine date
 * @returns Date in UTC
 */
export function phToUTC(date: Date | string): Date {
  if (date === null || date === undefined) throw new Error("Invalid input");
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  return new Date(d.getTime() - PH_OFFSET_HOURS * 60 * 60 * 1000);
}

/**
 * Get the current Philippine time
 *
 * @returns Current date/time in Philippine timezone
 */
export function nowInPH(): Date {
  return utcToPH(new Date());
}
