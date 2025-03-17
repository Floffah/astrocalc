/**
 * ToFK5 converts ecliptic longitude and latitude from dynamical frame to FK5.
 *
 * @param {Number} lon - ecliptic longitude in radians
 * @param {Number} lat - ecliptic latitude in radians
 * @param {Number} jde - Julian ephemeris day
 * @return {Coord}
 *    {Number} lon - FK5 longitude
 *    {Number} lat - FK5 latitude
 */
export function toFK5(lon: number, lat: number, jde: number): Coord;
export class Planet {
    /**
     * VSOP87 representation of a Planet
     * @constructs Planet
     * @param {object} planet - planet data series
     * @example
     * ```js
     * // for use in browser
     * import {data} from 'astronomia'
     * const earth = new planetposition.Planet(data.vsop87Bearth)
     * ```
     */
    constructor(planet: object);
    name: any;
    type: any;
    series: any;
    /**
     * Position2000 returns ecliptic position of planets by full VSOP87 theory.
     *
     * @param {Number} jde - the date for which positions are desired.
     * @returns {Coord} Results are for the dynamical equinox and ecliptic J2000.
     *  {Number} lon - heliocentric longitude in radians.
     *  {Number} lat - heliocentric latitude in radians.
     *  {Number} range - heliocentric range in AU.
     */
    position2000(jde: number): Coord;
    /**
     * Position returns ecliptic position of planets at equinox and ecliptic of date.
     *
     * @param {Number} jde - the date for which positions are desired.
     * @returns {Coord} Results are positions consistent with those from Meeus's
     * Apendix III, that is, at equinox and ecliptic of date.
     *  {Number} lon - heliocentric longitude in radians.
     *  {Number} lat - heliocentric latitude in radians.
     *  {Number} range - heliocentric range in AU.
     */
    position(jde: number): Coord;
}
declare namespace _default {
    export { Planet };
    export { toFK5 };
}
export default _default;
import { Coord } from './base.js';
