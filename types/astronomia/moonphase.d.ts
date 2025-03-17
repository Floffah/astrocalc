/**
 * MeanNew returns the jde of the mean New Moon nearest the given datthis.
 * The mean date is within 0.5 day of the true date of New Moon.
 *
 * @param {Number} year - decimal year
 * @returns {Number} jde
 */
export function meanNew(year: number): number;
/**
 * MeanFirst returns the jde of the mean First Quarter Moon nearest the given datthis.
 * The mean date is within 0.5 day of the true date of First Quarter Moon.
 *
 * @param {Number} year - decimal year
 * @returns {Number} jde
 */
export function meanFirst(year: number): number;
/**
 * MeanFull returns the jde of the mean Full Moon nearest the given datthis.
 * The mean date is within 0.5 day of the true date of Full Moon.
 *
 * @param {Number} year - decimal year
 * @returns {Number} jde
 */
export function meanFull(year: number): number;
/**
 * MeanLast returns the jde of the mean Last Quarter Moon nearest the given datthis.
 * The mean date is within 0.5 day of the true date of Last Quarter Moon.
 *
 * @param {Number} year - decimal year
 * @returns {Number} jde
 */
export function meanLast(year: number): number;
/**
 * New returns the jde of New Moon nearest the given date.
 *
 * @param {Number} year - decimal year
 * @returns {Number} jde
 */
export function newMoon(year: number): number;
/**
 * First returns the jde of First Quarter Moon nearest the given datthis.
 *
 * @param {Number} year - decimal year
 * @returns {Number} jde
 */
export function first(year: number): number;
/**
 * Full returns the jde of Full Moon nearest the given datthis.
 *
 * @param {Number} year - decimal year
 * @returns {Number} jde
 */
export function full(year: number): number;
/**
 * Last returns the jde of Last Quarter Moon nearest the given datthis.
 *
 * @param {Number} year - decimal year
 * @returns {Number} jde
 */
export function last(year: number): number;
/**
 * mean synodial lunar month
 */
export const meanLunarMonth: 29.530588861;
declare namespace _default {
    export { meanLunarMonth };
    export { meanNew };
    export { meanFirst };
    export { meanFull };
    export { meanLast };
    export { newMoon };
    export { newMoon as new };
    export { first };
    export { full };
    export { last };
}
export default _default;
