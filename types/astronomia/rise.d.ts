/**
 * Helper function to obtain corrected refraction
 * @param {number} h0 - altitude of the body in radians containing `meanRefraction` of 0°34'
 * @param {number} [corr] - the calcluated refraction e.g. from package `refraction` in radians
 * @return {number} refraction value in radians
 */
export function refraction(h0: number, corr?: number): number;
/**
 * @return {number} local angle in radians
 */
export function hourAngle(lat: any, h0: any, δ: any): number;
/**
 * ApproxTimes computes approximate UT rise, transit and set times for
 * a celestial object on a day of interest.
 *
 * The function argurments do not actually include the day, but do include
 * values computed from the day.
 *
 * @param {GlobeCoord} p - is geographic coordinates of observer.
 * @param {number} h0 - is "standard altitude" of the body in radians
 * @param {number} Th0 - is apparent sidereal time at 0h UT at Greenwich in seconds
 *        (range 0...86400) must be the time on the day of interest, in seconds.
 *        See sidereal.apparent0UT
 * @param {number} α - right ascension (radians)
 * @param {number} δ - declination (radians)
 * @return {RiseObj} Result units are seconds and are in the range [0,86400)
 * @throws Error
 */
export function approxTimes(p: GlobeCoord, h0: number, Th0: number, α: number, δ: number): RiseObj;
/**
 * Times computes UT rise, transit and set times for a celestial object on
 * a day of interest.
 *
 * The function argurments do not actually include the day, but do include
 * a number of values computed from the day.
 *
 * @param {GlobeCoord} p - is geographic coordinates of observer.
 * @param {number} ΔT - is delta T in seconds
 * @param {number} h0 - is "standard altitude" of the body in radians
 * @param {number} Th0 - is apparent sidereal time at 0h UT at Greenwich in seconds
 *        (range 0...86400) must be the time on the day of interest, in seconds.
 *        See sidereal.apparent0UT
 * @param {Array<number>} α3 - slices of three right ascensions
 * @param {Array<number>} δ3 - slices of three declinations.
 *        α3, δ3 must be values at 0h dynamical time for the day before, the day of,
 *        and the day after the day of interest.  Units are radians.
 *
 * @return {RiseObj} Result units are seconds and are in the range [0,86400)
 * @throws Error
 */
export function times(p: GlobeCoord, ΔT: number, h0: number, Th0: number, α3: Array<number>, δ3: Array<number>): RiseObj;
export const errorAboveHorizon: Error;
export const errorBelowHorizon: Error;
/**
 * mean refraction of the atmosphere
 */
export const meanRefraction: number;
export namespace stdh0 {
    let stellar: number;
    let solar: number;
    let lunar: number;
    let lunarMean: number;
}
export function stdh0Stellar(_refraction: any): number;
export const Stdh0Stellar: number;
export function stdh0Solar(_refraction: any): number;
export const Stdh0Solar: number;
export function stdh0LunarMean(_refraction: any): number;
export const Stdh0LunarMean: number;
export function stdh0Lunar(π: number, refraction?: number): number;
export function Stdh0Lunar(π: number, refraction?: number): number;
/**
 * RisePlanet computes rise, transit and set times for a planet on a day of interest.
 */
export class PlanetRise {
    /**
     * @param {number|Date} jd - Julian Day starting at midnight or Date object
     * @param {number} lat - geographic latitude of the observerin degrees
     * @param {number} lon - geographic longitude of the observer in degrees (measured positively westward)
     * @param {Planet} earth - VSOP87 Planet object for Earth
     * @param {Planet} planet - VSOP87 Planet object of observed body
     * @param {object} [opts]
     * @param {boolean} [opts.date] - return times as Date objects
     * @param {number} [opts.refraction] - use different refraction than `stdh0Stellar`
     */
    constructor(jd: number | Date, lat: number, lon: number, earth: Planet, planet: Planet, opts?: {
        date?: boolean;
        refraction?: number;
    });
    opts: {
        date?: boolean;
        refraction?: number;
    };
    refraction: number;
    jd: number;
    lat: number;
    lon: number;
    jde: number;
    ΔT: number;
    earth: Planet;
    planet: Planet;
    approxTimes(): {
        rise: number | Date;
        transit: number | Date;
        set: number | Date;
    };
    times(): {
        rise: number | Date;
        transit: number | Date;
        set: number | Date;
    };
    /** @private */
    private _toArr;
    /** @private */
    private _rsToJD;
    /** @private */
    private _toJD;
}
declare namespace _default {
    export { errorAboveHorizon };
    export { errorBelowHorizon };
    export { meanRefraction };
    export { stdh0 };
    export { refraction };
    export { stdh0Stellar };
    export { Stdh0Stellar };
    export { stdh0Solar };
    export { Stdh0Solar };
    export { stdh0LunarMean };
    export { Stdh0LunarMean };
    export { stdh0Lunar };
    export { Stdh0Lunar };
    export { hourAngle };
    export { approxTimes };
    export { times };
    export { PlanetRise };
}
export default _default;
export type RiseObj = {
    /**
     * - in seconds
     */
    rise: number;
    /**
     * - in seconds
     */
    transit: number;
    /**
     * - in seconds
     */
    set: number;
};
import { Coord as GlobeCoord } from './globe.js';
import { Planet } from './planetposition.js';
