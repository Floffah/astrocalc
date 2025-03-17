/**
 * Ephemeris returns the apparent orientation of the sun at the given jd.
 *
 * Results:
 *  P:  Position angle of the solar north pole.
 *  B0: Heliographic latitude of the center of the solar disk.
 *  L0: Heliographic longitude of the center of the solar disk.
 *
 * All results in radians.
 */
export function ephemeris(jd: any, earth: any): number[];
/**
 * Cycle returns the jd of the start of the given synodic rotation.
 *
 * Argument c is the "Carrington" cycle number.
 *
 * Result is a dynamical time (not UT).
 */
export function cycle(c: any): number;
declare namespace _default {
    export { ephemeris };
    export { cycle };
}
export default _default;
