/**
 * Physical computes quantities for physical observations of Jupiter.
 *
 * All angular results in radians.
 *
 * @param {number} jde - Julian ephemeris day
 * @param {Planet} earth
 * @param {Planet} jupiter
 * @return {Array}
 *    {number} DS - Planetocentric declination of the Sun.
 *    {number} DE - Planetocentric declination of the Earth.
 *    {number} ω1 - Longitude of the System I central meridian of the illuminated disk,
 *                  as seen from Earth.
 *    {number} ω2 - Longitude of the System II central meridian of the illuminated disk,
 *                  as seen from Earth.
 *    {number} P -  Geocentric position angle of Jupiter's northern rotation pole.
 */
export function physical(jde: number, earth: Planet, jupiter: Planet): any[];
/**
 * Physical2 computes quantities for physical observations of Jupiter.
 *
 * Results are less accurate than with Physical().
 * All angular results in radians.
 *
 * @param {number} jde - Julian ephemeris day
 * @return {Array}
 *    {number} DS - Planetocentric declination of the Sun.
 *    {number} DE - Planetocentric declination of the Earth.
 *    {number} ω1 - Longitude of the System I central meridian of the illuminated disk,
 *                  as seen from Earth.
 *    {number} ω2 - Longitude of the System II central meridian of the illuminated disk,
 *                  as seen from Earth.
 */
export function physical2(jde: number): any[];
declare namespace _default {
    export { physical };
    export { physical2 };
}
export default _default;
import { Planet } from './planetposition.js';
