/**
 * Horizontal returns equatorial horizontal parallax of a body.
 *
 * @param {number} Δ - distance in AU.
 * @return {number} parallax in radians.
 */
export function horizontal(Δ: number): number;
/**
 * Topocentric returns topocentric positions including parallax.
 *
 * Arguments α, δ are geocentric right ascension and declination in radians.
 * Δ is distance to the observed object in AU. ρsφ, ρcφ are parallax
 * constants (see package globe.) lon is geographic longitude of the observer,
 * jde is time of observation.
 *
 * @param {Coord} c - geocentric right ascension and declination in radians
 * @param {number} ρsφ - parallax constants (see package globe.)
 * @param {number} ρcφ - parallax constants (see package globe.)
 * @param {number} lon - geographic longitude of the observer (measured positively westwards!)
 * @param {number} jde - time of observation
 * @return {Coord} observed topocentric ra and dec in radians.
 */
export function topocentric(c: Coord, ρsφ: number, ρcφ: number, lon: number, jde: number): Coord;
/**
 * Topocentric2 returns topocentric corrections including parallax.
 *
 * This function implements the "non-rigorous" method descripted in the text.
 *
 * Note that results are corrections, not corrected coordinates.
 *
 * @param {Coord} c - geocentric right ascension and declination in radians
 * @param {number} ρsφ - parallax constants (see package globe.)
 * @param {number} ρcφ - parallax constants (see package globe.)
 * @param {number} lon - geographic longitude of the observer (measured positively westwards!)
 * @param {number} jde - time of observation
 * @return {Coord} observed topocentric ra and dec in radians.
 */
export function topocentric2(c: Coord, ρsφ: number, ρcφ: number, lon: number, jde: number): Coord;
/**
 * Topocentric3 returns topocentric hour angle and declination including parallax.
 *
 * This function implements the "alternative" method described in the text.
 * The method should be similarly rigorous to that of Topocentric() and results
 * should be virtually consistent.
 *
 * @param {Coord} c - geocentric right ascension and declination in radians
 * @param {number} ρsφ - parallax constants (see package globe.)
 * @param {number} ρcφ - parallax constants (see package globe.)
 * @param {number} lon - geographic longitude of the observer (measured positively westwards!)
 * @param {number} jde - time of observation
 * @return {Array}
 *    {number} H_ - topocentric hour angle
 *    {number} δ_ - topocentric declination
 */
export function topocentric3(c: Coord, ρsφ: number, ρcφ: number, lon: number, jde: number): any[];
/**
 * TopocentricEcliptical returns topocentric ecliptical coordinates including parallax.
 *
 * Arguments `c` are geocentric ecliptical longitude and latitude of a body,
 * s is its geocentric semidiameter. φ, h are the observer's latitude and
 * and height above the ellipsoid in meters.  ε is the obliquity of the
 * ecliptic, θ is local sidereal time, π is equatorial horizontal parallax
 * of the body (see Horizonal()).
 *
 * All angular parameters and results are in radians.
 *
 * @param {Coord} c - geocentric right ascension and declination in radians
 * @param {number} s - geocentric semidiameter of `c`
 * @param {number} φ - observer's latitude
 * @param {number} h - observer's height above the ellipsoid in meters
 * @param {number} ε - is the obliquity of the ecliptic
 * @param {number} θ - local sidereal time
 * @param {number} π - equatorial horizontal parallax of the body
 * @return {Array}
 *    {number} λ_ - observed topocentric longitude
 *    {number} β_ - observed topocentric latitude
 *    {number} s_ - observed topocentric semidiameter
 */
export function topocentricEcliptical(c: Coord, s: number, φ: number, h: number, ε: number, θ: number, π: number): any[];
declare namespace _default {
    export { horizontal };
    export { topocentric };
    export { topocentric2 };
    export { topocentric3 };
    export { topocentricEcliptical };
}
export default _default;
import { Coord } from './base.js';
