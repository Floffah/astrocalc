/**
 * Position returns the true geometric position of the moon as ecliptic coordinates.
 *
 * Result computed by Elp theory.  Result is at equator and equinox
 * of date in the FK5 frame.  It does not include nutation or aberration.
 *
 * @param {Object} elpData
 * @param {Number} jde - Julian ephemeris day
 * @returns {Object}
 *   {Number} lon - ecliptic longitude in radians
 *   {Number} lat - ecliptic latitude in radians
 *   {Number} range - range in KM
 */
export function position(elpData: any, jde: number): any;
/**
 *
 */
export class Moon {
    /**
     * ELP representation of a Moon
     * @constructs Moon
     * @param {object} data - elp data series
     * @example
     * ```js
     * // for use in browser
     * import {data} from 'astronomia.js'
     * const moon = new elp.Moon(data.elpMppDe)
     * ```
     */
    constructor(data: object);
    series: any;
    _calcLBR(T: any): {
        L: number;
        B: number;
        R: number;
    };
    /**
     * Position returns rectangular coordinates referred to the inertial mean ecliptic and equinox of J2000.
     * @param {Number} jde - Julian ephemeris day
     * @return {object} rectangular coordinates
     *   {Number} x
     *   {Number} y
     *   {Number} z
     */
    positionXYZ(jde: number): object;
    /**
     * Delay effect of light time
     *
     * @param {Number} jde - Julian ephemeris day
     * @returns {Number} Delay time in days
     */
    lightTime(jde: number): number;
    /**
     * Position returns ecliptic position of moon at equinox and ecliptic of date.
     *
     * @param {Number} jde - the date for which positions are desired.
     * @returns {Coord} Results are positions consistent with those elp data,
     * that is, at equinox and ecliptic of date.
     *  {Number} lon - geocentric longitude in radians.
     *  {Number} lat - geocentric latitude in radians.
     *  {Number} range - geocentric range in KM.
     */
    position(jde: number): Coord;
}
declare namespace _default {
    export { Moon };
    export { position };
}
export default _default;
import { Coord } from './base.js';
