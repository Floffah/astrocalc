/**
 * Smallest finds the smallest circle containing three points.
 *
 * Arguments should represent coordinates in right ascension and declination
 * or longitude and latitude.  Result Δ is the diameter of the circle, typeI
 * is true if solution is of type I.
 *
 * @param {Coord} c1 - ra, dec point 1
 * @param {Coord} c2 - ra, dec point 2
 * @param {Coord} c3 - ra, dec point 3
 * @returns {Array} [Δ, typeI]
 *  {Number} Δ - diameter of the circle
 *  {Number} typeI - true - Two points on circle, one interior.
 *                   false - All three points on circle.
 */
export function smallest(c1: Coord, c2: Coord, c3: Coord): any[];
declare namespace _default {
    export { smallest };
}
export default _default;
import { Coord } from './base.js';
