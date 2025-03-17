/**
 * phaseAngleEquatorial computes the phase angle of the Moon given equatorial coordinates.
 *
 * @param {Coord} cMoon - geocentric right ascension,  declination and distance to the Moon
 * @param {Coord} cSun - coordinates and distance of the Sun
 * @returns {number} phase angle of the Moon in radians
 */
export function phaseAngleEquatorial(cMoon: Coord, cSun: Coord): number;
/**
 * phaseAngleEquatorial2 computes the phase angle of the Moon given equatorial coordinates.
 *
 * Less accurate than phaseAngleEquatorial.
 *
 * Arguments α, δ are geocentric right ascension and declination of the Moon;
 * α0, δ0  are coordinates of the Sun.  Angles must be in radians.
 *
 * @param {Coord} cMoon - eocentric right ascension and declination of the Moon
 * @param {Coord} cSun - coordinates of the Sun
 * @returns {number} phase angle of the Moon in radians
 */
export function phaseAngleEquatorial2(cMoon: Coord, cSun: Coord): number;
/**
 * phaseAngleEcliptic computes the phase angle of the Moon given ecliptic coordinates.
 *
 * Distances must be in the same units as each other.
 *
 * @param {Coord} cMoon - geocentric longitude, latitude and distance to the Moon
 * @param {Coord} cSun -  longitude and distance to the Sun
 * @returns {number} phase angle of the Moon in radians
 */
export function phaseAngleEcliptic(cMoon: Coord, cSun: Coord): number;
/**
 * phaseAngleEcliptic2 computes the phase angle of the Moon given ecliptic coordinates.
 *
 * Less accurate than phaseAngleEcliptic.
 *
 * Angles must be in radians.
 *
 * @param {Coord} cMoon - geocentric longitude, latitude of the Moon
 * @param {Coord} cSun -  longitude of the Sun
 * @returns {number} phase angle of the Moon in radians
 */
export function phaseAngleEcliptic2(cMoon: Coord, cSun: Coord): number;
/**
 * phaseAngle3 computes the phase angle of the Moon given a julian day.
 *
 * Less accurate than phaseAngle functions taking coordinates.
 *
 * Result in radians.
 */
export function phaseAngle3(jde: any): number;
declare namespace _default {
    export { phaseAngleEquatorial };
    export { phaseAngleEquatorial2 };
    export { phaseAngleEcliptic };
    export { phaseAngleEcliptic2 };
    export { phaseAngle3 };
}
export default _default;
import { Coord } from './base.js';
