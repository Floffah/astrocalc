/**
 * base conversion from calendar date to julian day
 */
export function CalendarToJD(y: any, m: any, d: any, isJulian: any): number;
/**
 * CalendarGregorianToJD converts a Gregorian year, month, and day of month
 * to Julian day.
 *
 * Negative years are valid, back to JD 0.  The result is not valid for
 * dates before JD 0.
 * @param {number} y - year (int)
 * @param {number} m - month (int)
 * @param {number} d - day (float)
 * @returns {number} jd - Julian day (float)
 */
export function CalendarGregorianToJD(y: number, m: number, d: number): number;
/**
 * CalendarJulianToJD converts a Julian year, month, and day of month to Julian day.
 *
 * Negative years are valid, back to JD 0.  The result is not valid for
 * dates before JD 0.
 * @param {number} y - year (int)
 * @param {number} m - month (int)
 * @param {number} d - day (float)
 * @returns {number} jd - Julian day (float)
 */
export function CalendarJulianToJD(y: number, m: number, d: number): number;
/**
 * LeapYearJulian returns true if year y in the Julian calendar is a leap year.
 * @param {number} y - year (int)
 * @returns {boolean} true if leap year in Julian Calendar
 */
export function LeapYearJulian(y: number): boolean;
/**
 * LeapYearGregorian returns true if year y in the Gregorian calendar is a leap year.
 * @param {number} y - year (int)
 * @returns {boolean} true if leap year in Gregorian Calendar
 */
export function LeapYearGregorian(y: number): boolean;
/**
 * JDToCalendar returns the calendar date for the given jd.
 *
 * Note that this function returns a date in either the Julian or Gregorian
 * Calendar, as appropriate.
 * @param {number} jd - Julian day (float)
 * @param {boolean} isJulian - set true for Julian Calendar, otherwise Gregorian is used
 * @returns {object} `{ (int) year, (int) month, (float) day }`
 */
export function JDToCalendar(jd: number, isJulian: boolean): object;
/**
 * JDToCalendarGregorian returns the calendar date for the given jd in the Gregorian Calendar.
 *
 * @param {number} jd - Julian day (float)
 * @returns {object} `{ (int) year, (int) month, (float) day }`
 */
export function JDToCalendarGregorian(jd: number): object;
/**
 * JDToCalendarJulian returns the calendar date for the given jd in the Julian Calendar.
 *
 * @param {number} jd - Julian day (float)
 * @returns {object} { (int) year, (int) month, (float) day }
 */
export function JDToCalendarJulian(jd: number): object;
/**
 * isJDCalendarGregorian tests if Julian day `jd` falls into the Gregorian calendar
 * @param {number} jd - Julian day (float)
 * @returns {boolean} true for Gregorian, false for Julian calendar
 */
export function isJDCalendarGregorian(jd: number): boolean;
/**
 * isCalendarGregorian tests if date falls into the Gregorian calendar
 * @param {number} year - julian/gregorian year
 * @param {number} [month] - month of julian/gregorian year
 * @param {number} [day] - day of julian/gregorian year
 * @returns {boolean} true for Gregorian, false for Julian calendar
 */
export function isCalendarGregorian(year: number, month?: number, day?: number): boolean;
/**
 * JDToDate converts a Julian day `jd` to a Date Object (Gregorian Calendar)
 *
 * Note: Javascript uses the the ISO-8601 calendar, which is a proleptic Gregorian
 * calendar, i.e. it acts as if this calendar was always in effect, even before
 * its year of introduction in 1582. Therefore dates between 1582-10-05 and
 * 1582-10-14 exists.
 *
 * @param {number} jd - Julian day (float)
 * @returns {Date}
 */
export function JDToDate(jd: number): Date;
/**
 * DateToJD converts a proleptic Gregorian Date into a Julian day `jd`
 * @param {Date} date
 * @returns {number} jd - Julian day (float)
 */
export function DateToJD(date: Date): number;
/**
 * JDEToDate converts a Julian ephemeris day `jde` to a Date Object (Gregorian Calendar)
 * To obtain "Universal Time" (UT) from "Dynamical Time" (TD) the correction ΔT (in seconds) gets applied
 * ```
 * UT = TD - ΔT
 * ```
 * If your use case does not require such accuracy converting `jde` using `JDToDate` is fine.
 *
 * Note: Javascript uses the the ISO-8601 calendar, which is a proleptic Gregorian
 * calendar, i.e. it acts as if this calendar was always in effect, even before
 * its year of introduction in 1582. Therefore dates between 1582-10-05 and
 * 1582-10-14 exists.
 *
 * @param {number} jde - Julian ephemeris day
 * @returns {Date} Javascript Date Object
 */
export function JDEToDate(jde: number): Date;
/**
 * DateToJDE converts a Date Object (Gregorian Calendar) to a Julian ephemeris day `jde`
 * To obtain "Dynamical Time" (TD) from "Universal Time" (UT) the correction ΔT (in seconds) gets applied
 * ```
 * TD = UT + ΔT
 * ```
 * If your use case does not require such accuracy converting `Date` using `DateToJD` is fine.
 *
 * @param {Date} date - Javascript Date Object
 * @returns {number} jde - Julian ephemeris day (float)
 */
export function DateToJDE(date: Date): number;
/**
 * converts Modified Julian Day `mjd` to Julian Day `jd`
 * @param {Number} mjd - Modified Julian Day
 * @returns {Number} jd - Julian Day
 */
export function MJDToJD(mjd: number): number;
/**
 * converts Julian Day `jd` to Modified Julian Day `mjd`
 * The MJD sometimes appear when mentioning orbital elements of artificial satellites.
 * Contrary to JD the MJD begins at Greenwich mean midnight.
 * @param {Number} jd - Julian Day
 * @returns {Number} mjd - Modified Julian Day MJD
 */
export function JDToMJD(jd: number): number;
/**
 * DayOfWeek determines the day of the week for a given JD.
 *
 * The value returned is an integer in the range 0 to 6, where 0 represents
 * Sunday.  This is the same convention followed in the time package of the
 * Javascript standard library.
 * @param {number} jd - Julian day (float)
 * @returns {number} (int) 0 == sunday; ...; 6 == saturday
 */
export function DayOfWeek(jd: number): number;
/**
 * DayOfYearGregorian computes the day number within the year of the Gregorian
 * calendar.
 * @param {number} y - year (int)
 * @param {number} m - month (int)
 * @param {number} d - day (float)
 * @returns {number} day of year
 */
export function DayOfYearGregorian(y: number, m: number, d: number): number;
/**
 * DayOfYearJulian computes the day number within the year of the Julian
 * calendar.
 * @param {number} y - year (int)
 * @param {number} m - month (int)
 * @param {number} d - day (float)
 * @returns {number} day of year
 */
export function DayOfYearJulian(y: number, m: number, d: number): number;
/**
 * DayOfYear computes the day number within the year.
 *
 * This form of the function is not specific to the Julian or Gregorian
 * calendar, but you must tell it whether the year is a leap year.
 * @param {number} y - year (int)
 * @param {number} m - month (int)
 * @param {number} d - day (float)
 * @param {boolean} leap - set `true` if `y` is leap year
 * @returns {number} day of year
 */
export function DayOfYear(y: number, m: number, d: number, leap: boolean): number;
/**
 * DayOfYearToCalendar returns the calendar month and day for a given
 * day of year and leap year status.
 * @param {number} n - day of year (int)
 * @param {boolean} leap - set `true` if `y` is leap year
 * @returns {object} `{ (int) month, (float) day }`
 */
export function DayOfYearToCalendar(n: number, leap: boolean): object;
/**
 * DayOfYearToCalendarGregorian returns the calendar month and day for a given
 * day of year.
 * @param {number} year
 * @param {number} n - day of year (int)
 * @returns {CalendarGregorian} { (int) year, (int) month, (float) day }
 */
export function DayOfYearToCalendarGregorian(year: number, n: number): CalendarGregorian;
/**
 * DayOfYearToCalendarJulian returns the calendar month and day for a given
 * day of year.
 * @param {number} year
 * @param {number} n - day of year (int)
 * @returns {CalendarJulian} { (int) year, (int) month, (float) day }
 */
export function DayOfYearToCalendarJulian(year: number, n: number): CalendarJulian;
/** 1582-10-05 Julian Date is 1st Gregorian Date (1582-10-15) */
export const GREGORIAN0JD: 2299160.5;
/**
 * Base class for CalendarJulian and CalendarGregorian
 * Respects the start of the Gregorian Calendar at `GREGORIAN0JD`
 */
export class Calendar {
    /**
     * @param {number|Date} [year] - If `Date` is given then year, month, day is taken from that. Shortcut to `new Calendar().fromDate(date)`
     * @param {number} [month]
     * @param {number} [day]
     */
    constructor(year?: number | Date, month?: number, day?: number);
    year: number;
    month: number;
    day: number;
    getDate(): {
        year: number;
        month: number;
        day: number;
    };
    getTime(): {
        hour: number;
        minute: any;
        second: any;
        millisecond: any;
    };
    toISOString(): string;
    isGregorian(): boolean;
    /**
     * Note: Take care for dates < GREGORIAN0JD as `date` is always within the
     * proleptic Gregorian Calender
     * @param {Date} date - proleptic Gregorian date
     */
    fromDate(date: Date): this;
    /**
     * Note: Take care for dates < GREGORIAN0JD as `date` is always within the
     * proleptic Gregorian Calender
     * @returns {Date} proleptic Gregorian date
     */
    toDate(): Date;
    /**
     * converts a calendar date to decimal year
     * @returns {number} decimal year
     */
    toYear(): number;
    /**
     * converts a decimal year to a calendar date
     * @param {number} year - decimal year
     */
    fromYear(year: number): this;
    isLeapYear(): boolean;
    toJD(): number;
    fromJD(jd: any): this;
    fromJDE(jde: any): this;
    toJDE(): number;
    /**
     * set date to midnight UTC
     */
    midnight(): this;
    /**
     * set date to noon UTC
     */
    noon(): this;
    /**
     * @param {Boolean} td - if `true` calendar instance is in TD; date gets converted to UT
     *   true  - `UT = TD - ΔT`
     *   false - `TD = UT + ΔT`
     */
    deltaT(td: boolean): this;
    dayOfWeek(): number;
    dayOfYear(): number;
}
export class CalendarJulian extends Calendar {
    fromJD(jd: any): this;
    /**
     * toGregorian converts a Julian calendar date to a year, month, and day
     * in the Gregorian calendar.
     * @returns {CalendarGregorian}
     */
    toGregorian(): CalendarGregorian;
}
export class CalendarGregorian extends Calendar {
    fromJD(jd: any): this;
    toJulian(): CalendarJulian;
}
declare namespace _default {
    export { GREGORIAN0JD };
    export { Calendar };
    export { CalendarJulian };
    export { CalendarGregorian };
    export { CalendarToJD };
    export { CalendarGregorianToJD };
    export { CalendarJulianToJD };
    export { LeapYearJulian };
    export { LeapYearGregorian };
    export { JDToCalendar };
    export { JDToCalendarGregorian };
    export { JDToCalendarJulian };
    export { isJDCalendarGregorian };
    export { isCalendarGregorian };
    export { JDToDate };
    export { DateToJD };
    export { JDEToDate };
    export { DateToJDE };
    export { MJDToJD };
    export { JDToMJD };
    export { DayOfWeek };
    export { DayOfYearGregorian };
    export { DayOfYearJulian };
    export { DayOfYear };
    export { DayOfYearToCalendar };
    export { DayOfYearToCalendarGregorian };
    export { DayOfYearToCalendarJulian };
}
export default _default;
