/**
 * meanPerigee returns the jde of the mean perigee of the Moon nearest the given date.
 *
 * @param {Number} year - is a decimal year specifying a date.
 * @return {Number} jde - Julian ephemeris day
 */
export function meanPerigee(year: number): number;
/**
 * perigee returns the jde of perigee of the Moon nearest the given date.
 *
 * @param {Number} year - is a decimal year specifying a date.
 * @return {Number} jde - Julian ephemeris day
 */
export function perigee(year: number): number;
/**
 * meanApogee returns the jde of the mean apogee of the Moon nearest the given date.
 *
 * @param {Number} year - is a decimal year specifying a date.
 * @return {Number} jde - Julian ephemeris day
 */
export function meanApogee(year: number): number;
/**
 * apogee returns the jde of apogee of the Moon nearest the given date.
 *
 * @param {Number} year - is a decimal year specifying a date.
 * @return {Number} jde - Julian ephemeris day
 */
export function apogee(year: number): number;
/**
 * apogeeParallax returns equatorial horizontal parallax of the Moon at the Apogee nearest the given date.
 *
 * @param {Number} year - is a decimal year specifying a date.
 * @return {Number} equatorial horizontal parallax in radians
 */
export function apogeeParallax(year: number): number;
/**
 * perigeeParallax returns equatorial horizontal parallax of the Moon at the Apogee nearest the given date.
 *
 * @param {Number} year - is a decimal year specifying a date.
 * @return {Number} equatorial horizontal parallax in radians
 */
export function perigeeParallax(year: number): number;
/**
 * Calculate the distance earth - moon (center to center) using the parallax angle in radians
 *
 * @param {Number} parallax - parallax angle in radians
 * @return {Number} distance in `km`
 */
export function distance(parallax: number): number;
export const EARTH_RADIUS: 6378.137;
export const MOON_RADIUS: 1738.1;
declare namespace _default {
    export { EARTH_RADIUS };
    export { MOON_RADIUS };
    export { meanPerigee };
    export { perigee };
    export { meanApogee };
    export { apogee };
    export { apogeeParallax };
    export { perigeeParallax };
    export { distance };
}
export default _default;
