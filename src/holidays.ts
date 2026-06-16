/**
 * Philippine holidays for 2026
 * Regular holidays and special non-working days
 */

export interface PHHoliday {
  date: string;          // YYYY-MM-DD
  name: string;
  type: 'regular' | 'special' | 'non-working';
}

/** Regular holidays */
const REGULAR_HOLIDAYS: PHHoliday[] = [
  { date: '2026-01-01', name: "New Year's Day", type: 'regular' },
  { date: '2026-02-25', name: 'EDSA Revolution Anniversary', type: 'regular' },
  { date: '2026-04-02', name: 'Maundy Thursday', type: 'regular' },
  { date: '2026-04-03', name: 'Good Friday', type: 'regular' },
  { date: '2026-04-09', name: 'Araw ng Kagitingan (Day of Valor)', type: 'regular' },
  { date: '2026-05-01', name: 'Labor Day', type: 'regular' },
  { date: '2026-06-12', name: 'Independence Day', type: 'regular' },
  { date: '2026-08-21', name: 'Ninoy Aquino Day', type: 'regular' },
  { date: '2026-08-31', name: 'National Heroes Day', type: 'regular' },
  { date: '2026-11-30', name: 'Bonifacio Day', type: 'regular' },
  { date: '2026-12-25', name: 'Christmas Day', type: 'regular' },
  { date: '2026-12-30', name: 'Rizal Day', type: 'regular' },
];

/** Special non-working days */
const SPECIAL_HOLIDAYS: PHHoliday[] = [
  { date: '2026-01-02', name: "New Year's Holiday", type: 'special' },
  { date: '2026-02-25', name: 'EDSA Revolution Anniversary', type: 'special' },
  { date: '2026-04-04', name: 'Black Saturday', type: 'special' },
  { date: '2026-08-21', name: 'Ninoy Aquino Day', type: 'special' },
  { date: '2026-11-01', name: "All Saints' Day", type: 'special' },
  { date: '2026-11-02', name: "All Souls' Day", type: 'special' },
  { date: '2026-12-08', name: 'Feast of the Immaculate Conception', type: 'special' },
  { date: '2026-12-24', name: 'Christmas Eve', type: 'special' },
  { date: '2026-12-31', name: 'Last Day of Year', type: 'special' },
  { date: '2026-11-25', name: 'Christmas Eve (if moved)', type: 'special' },
  { date: '2026-11-26', name: "Rizal Day (if moved)", type: 'special' },
];

/** All holidays combined */
const ALL_HOLIDAYS: PHHoliday[] = [...REGULAR_HOLIDAYS, ...SPECIAL_HOLIDAYS];

/** Holiday date lookup map */
const HOLIDAY_MAP: Map<string, PHHoliday> = new Map(
  ALL_HOLIDAYS.map(h => [h.date, h])
);

/**
 * Check if a date is a Philippine holiday
 * @param date - Date to check (Date object or YYYY-MM-DD string)
 * @returns True if the date is a holiday
 */
export function isPHHoliday(date: Date | string): boolean {
  const dateStr = normalizeDateStr(date);
  return HOLIDAY_MAP.has(dateStr);
}

/**
 * Get the holiday name for a date
 * @param date - Date to check
 * @returns Holiday name or null if not a holiday
 */
export function getHolidayName(date: Date | string): string | null {
  const dateStr = normalizeDateStr(date);
  const holiday = HOLIDAY_MAP.get(dateStr);
  return holiday?.name ?? null;
}

/**
 * Get all holidays in a date range
 * @param start - Start date
 * @param end - End date
 * @returns Array of holidays in the range
 */
export function getHolidaysInRange(start: Date | string, end: Date | string): PHHoliday[] {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return ALL_HOLIDAYS.filter(h => {
    const hDate = new Date(h.date);
    return hDate >= startDate && hDate <= endDate;
  });
}

/**
 * Check if a date is a weekend (Saturday or Sunday)
 * @param date - Date to check
 * @returns True if the date is a weekend
 */
export function isWeekend(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const day = d.getDay();
  return day === 0 || day === 6;
}

/**
 * Get all regular holidays for a year
 * @param year - Year to get holidays for
 * @returns Array of regular holidays
 */
export function getRegularHolidays(year: number): PHHoliday[] {
  return REGULAR_HOLIDAYS.filter(h => h.date.startsWith(String(year)));
}

/**
 * Get all special non-working days for a year
 * @param year - Year to get holidays for
 * @returns Array of special holidays
 */
export function getSpecialHolidays(year: number): PHHoliday[] {
  return SPECIAL_HOLIDAYS.filter(h => h.date.startsWith(String(year)));
}

/**
 * Check if a date is a regular holiday
 * @param date - Date to check
 * @returns True if the date is a regular holiday
 */
export function isRegularHoliday(date: Date | string): boolean {
  const dateStr = normalizeDateStr(date);
  return REGULAR_HOLIDAYS.some(h => h.date === dateStr);
}

/**
 * Check if a date is a special non-working day
 * @param date - Date to check
 * @returns True if the date is a special holiday
 */
export function isSpecialHoliday(date: Date | string): boolean {
  const dateStr = normalizeDateStr(date);
  return SPECIAL_HOLIDAYS.some(h => h.date === dateStr);
}

/** Helper: normalize date to YYYY-MM-DD string */
function normalizeDateStr(date: Date | string): string {
  if (typeof date === 'string') {
    return date.split('T')[0];
  }
  return date.toISOString().split('T')[0];
}
