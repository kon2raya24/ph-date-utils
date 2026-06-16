# ph-date-utils

Philippine date utilities for Node.js/TypeScript. Holidays, business days, formatting, and timezone conversion.

[![npm version](https://img.shields.io/npm/v/ph-date-utils.svg)](https://www.npmjs.com/package/ph-date-utils)
[![license](https://img.shields.io/npm/l/ph-date-utils.svg)](https://github.com/kon2raya/ph-date-utils/blob/main/LICENSE)

## Features

- 📅 **Philippine Holidays** — Regular and special non-working days
- ⏱️ **Business Days** — Calculate business days excluding holidays
- 🕐 **Timezone** — UTC+8 (Asia/Manila) conversion
- 📝 **Formatting** — PH date/time formats, relative time, database format

## Installation

```bash
npm install ph-date-utils
```

## Quick Start

```typescript
import {
  isPHHoliday,
  getPHBusinessDays,
  formatPHDate,
  isBusinessDay,
} from 'ph-date-utils';

isPHHoliday('2026-12-25');           // true (Christmas)
isBusinessDay('2026-06-15');         // true (Monday, not a holiday)
getPHBusinessDays('2026-06-15', '2026-06-20'); // 4 (Mon-Fri, no holidays)
formatPHDate(new Date());            // '06/15/2026'
```

## API Reference

### Holidays

```typescript
import {
  isPHHoliday,       // Check if date is a holiday
  getHolidayName,    // Get holiday name
  getHolidaysInRange,// Get holidays in date range
  isRegularHoliday,  // Check if regular holiday
  isSpecialHoliday,  // Check if special non-working day
  getRegularHolidays, // Get all regular holidays for year
  getSpecialHolidays, // Get all special holidays for year
} from 'ph-date-utils';

isPHHoliday('2026-12-25');           // true
isPHHoliday('2026-06-15');           // false

getHolidayName('2026-12-25');        // 'Christmas Day'
getHolidayName('2026-06-15');        // null

isRegularHoliday('2026-04-02');      // true (Maundy Thursday)
isSpecialHoliday('2026-12-24');      // true (Christmas Eve)

getRegularHolidays(2026);
// [{ date: '2026-01-01', name: "New Year's Day", type: 'regular' }, ...]

getHolidaysInRange('2026-12-20', '2026-12-31');
// [{ date: '2026-12-24', name: 'Christmas Eve', ... }, ...]
```

### Business Days

```typescript
import {
  getPHBusinessDays,  // Count business days
  addPHBusinessDays,  // Add business days to date
  getNextBusinessDay, // Get next business day
  isBusinessDay,      // Check if business day
} from 'ph-date-utils';

getPHBusinessDays('2026-06-15', '2026-06-20'); // 4 (Mon-Fri)

addPHBusinessDays('2026-06-15', 5);
// Returns date 5 business days after June 15

getNextBusinessDay('2026-06-15');   // Next business day after June 15

isBusinessDay('2026-06-15');        // true (Monday, not holiday)
isBusinessDay('2026-06-20');        // false (Saturday)
```

### Timezone

```typescript
import {
  utcToPH,          // Convert UTC to Philippine time
  phToUTC,          // Convert Philippine time to UTC
  nowInPH,          // Get current Philippine time
  PH_TIMEZONE,      // 'Asia/Manila'
  PH_OFFSET_HOURS,  // 8
} from 'ph-date-utils';

const phTime = utcToPH(new Date());
const utcTime = phToUTC(new Date());
const nowPH = nowInPH();

PH_TIMEZONE;        // 'Asia/Manila'
PH_OFFSET_HOURS;    // 8
```

### Formatting

```typescript
import {
  formatPHDate,       // MM/DD/YYYY
  formatPHDateTime,   // MM/DD/YYYY HH:MM AM/PM
  formatPHTime,       // HH:MM AM/PM
  formatPHDateLong,   // January 15, 2026
  formatRelativePH,   // "2 hours ago"
  formatPHDateDB,     // YYYY-MM-DD
} from 'ph-date-utils';

formatPHDate(new Date());           // '06/15/2026'
formatPHDateTime(new Date());       // '06/15/2026 03:45 PM'
formatPHTime(new Date());           // '03:45 PM'
formatPHDateLong(new Date());       // 'June 15, 2026'
formatRelativePH(new Date(Date.now() - 3600000)); // '1 hours ago'
formatPHDateDB(new Date());         // '2026-06-15'
```

## Examples

### Payroll Date Calculation

```typescript
import { addPHBusinessDays, formatPHDate } from 'ph-date-utils';

function getPayrollDate(payDate: Date): Date {
  // Add 1 business day for processing
  return addPHBusinessDays(payDate, 1);
}

const payroll = getPayrollDate(new Date('2026-06-15'));
console.log(`Payroll will be processed by: ${formatPHDate(payroll)}`);
```

### Holiday Check for Scheduling

```typescript
import { isPHHoliday, isBusinessDay, getNextBusinessDay } from 'ph-date-utils';

function scheduleTask(date: Date): Date {
  if (!isBusinessDay(date)) {
    return getNextBusinessDay(date);
  }
  return date;
}
```

### Timezone Conversion

```typescript
import { utcToPH, formatPHDateTime } from 'ph-date-utils';

const meetingUTC = new Date('2026-06-15T06:00:00Z'); // 6 AM UTC
const meetingPH = utcToPH(meetingUTC);
console.log(`Meeting in PH: ${formatPHDateTime(meetingPH)}`);
// "Meeting in PH: 06/15/2026 02:00 PM"
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © kon2raya
