/**
 * Positions computes positions of moons of Jupiter.
 *
 * Returned coordinates are in units of Jupiter radii.
 *
 * @param {Number} jde - Julian ephemeris day
 * @return {Array} x, y - coordinates of the 4 Satellites of jupiter
 */
export function positions(jde: number): any[];
/**
 * Positions computes positions of moons of Jupiter.
 *
 * High accuracy method based on theory "E5"  Results returned in
 * argument pos, which must not be undefined.  Returned coordinates in units
 * of Jupiter radii.
 *
 * @param {Number} jde - Julian ephemeris day
 * @param {Planet} earth - VSOP87 Planet earth
 * @param {Planet} jupiter - VSOP87 Planet jupiter
 * @param {Array} [pos] - reference to array of positions (same as return value)
 * @return {Array} x, y - coordinates of the 4 Satellites of jupiter
 */
export function e5(jde: number, earth: Planet, jupiter: Planet, pos?: any[]): any[];
export const io: 0;
export const europa: 1;
export const ganymede: 2;
export const callisto: 3;
declare namespace _default {
    export { io };
    export { europa };
    export { ganymede };
    export { callisto };
    export { positions };
    export { e5 };
}
export default _default;
import { Planet } from './planetposition.js';
