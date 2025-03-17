/**
 * JewishCalendar returns interesting dates and facts about a given year.
 *
 * Input is a Julian or Gregorian year.
 *
 * Outputs:
 *  A:      (int) Year number in the Jewish Calendar
 *  mP:     (int) Month number of Pesach.
 *  dP:     (int) Day number of Pesach.
 *  mNY:    (int) Month number of the Jewish new year.
 *  dNY:    (int) Day number of the Jewish new year.
 *  months: (int) Number of months in this year.
 *  days:   (int) Number of days in this year.
 */
export function JewishCalendar(y: any): any[];
/**
 * MoslemToJD converts a Moslem calendar date to a Julian Day.
 * @param {Number} y - year in moslem calendar
 * @param {Number} m - month
 * @param {Number} d - day
 * @returns {Number} jd - Julian day
 */
export function MoslemToJD(y: number, m: number, d: number): number;
/**
 * MoslemLeapYear returns true if year y of the Moslem calendar is a leap year.
 * @param {Number} year
 * @returns {Boolean} true if leap year
 */
export function MoslemLeapYear(year: number): boolean;
/**
 * @typedef {object} DateObj
 * @property {number} year
 * @property {number} month
 * @property {number} day
 */
/**
 * JulianToMoslem takes a year, month, and day of the Julian calendar and returns the equivalent year, month, and day of the Moslem calendar.
 *
 * @param {Number} y - julian year
 * @param {Number} m - julian month
 * @param {Number} d - julian day
 * @returns {DateObj}
 */
export function JulianToMoslem(y: number, m: number, d: number): DateObj;
/**
 * String returns the Romanization of the month ("Muḥarram", "Ṣafar", ...).
 */
export function moslemMonth(m: any): string;
declare namespace _default {
    export { JewishCalendar };
    export { MoslemToJD };
    export { MoslemLeapYear };
    export { JulianToMoslem };
    export { moslemMonth };
}
export default _default;
export type DateObj = {
    year: number;
    month: number;
    day: number;
};
