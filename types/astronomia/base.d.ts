/**
 * lightTime returns time for light to travel a given distance.
 * `dist` is distance in to earth in AU. √(x² + y² + z²)
 * Result in seconds of time.
 * @param {Number} dist - distance in to earth in AU
 * @returns {Number} time for light to travel a given distance in seconds
 */
export function lightTime(dist: number): number;
/**
 * JulianYearToJDE returns the Julian ephemeris day for a Julian year.
 * @param {Number} jy - Julian year
 * @returns {Number} jde - Julian ephemeris day
 */
export function JulianYearToJDE(jy: number): number;
/**
 * JDEToJulianYear returns a Julian year for a Julian ephemeris day.
 * @param {Number} jde - Julian ephemeris day
 * @returns {Number} jy - Julian year
 */
export function JDEToJulianYear(jde: number): number;
/**
 * BesselianYearToJDE returns the Julian ephemeris day for a Besselian year.
 * @param {Number} by - Besselian year
 * @returns {Number} jde - Julian ephemeris day
 */
export function BesselianYearToJDE(by: number): number;
/**
 * JDEToBesselianYear returns the Besselian year for a Julian ephemeris day.
 * @param {Number} jde - Julian ephemeris day
 * @returns {Number} by - Besselian year
 */
export function JDEToBesselianYear(jde: number): number;
/**
 * J2000Century returns the number of Julian centuries since J2000.
 *
 * The quantity appears as T in a number of time series.
 * @param {Number} jde - Julian ephemeris day
 * @returns {Number} number of Julian centuries since J2000
 */
export function J2000Century(jde: number): number;
/**
 * illuminated returns the illuminated fraction of a body's disk.
 *
 * The illuminated body can be the Moon or a planet.
 *
 * @param {Number} i - phase angle in radians.
 * @returns {Number} illuminated fraction of a body's disk.
 */
export function illuminated(i: number): number;
/**
 * Limb returns the position angle of the midpoint of an illuminated limb.
 *
 * The illuminated body can be the Moon or a planet.
 *
 * @param {Coord} equ - equatorial coordinates of the body `{ra, dec}` (in radians)
 * @param {Coord} appSun - apparent coordinates of the Sun `{ra, dec}` (In radians).
 * @returns {Number} position angle of the midpoint (in radians).
 */
export function limb(equ: Coord, appSun: Coord): number;
/**
 * pmod returns a positive floating-point x mod y.
 *
 * For a positive argument y, it returns a value in the range [0,y).
 *
 * @param {Number} x
 * @param {Number} y
 * @returns {Number} x % y - The result may not be useful if y is negative.
 */
export function pmod(x: number, y: number): number;
/**
 * horner evaluates a polynomal with coefficients c at x.  The constant
 * term is c[0].
 * @param {Number} x
 * @param {Number[]} c - coefficients; c[0] may be of type Number[]
 * @returns {Number}
 */
export function horner(x: number, ...c: number[]): number;
/**
 * FloorDiv returns the integer floor of the fractional value (x / y).
 * @param {Number} x
 * @param {Number} y
 * @returns {Number} (int)
 */
export function floorDiv(x: number, y: number): number;
/**
 * Cmp compares two float64s and returns -1, 0, or 1 if a is <, ==, or > b,
 * respectively.
 * .
 * @param {Number} a
 * @param {Number} b
 * @returns {Number} comparison result
 */
export function cmp(a: number, b: number): number;
/**
 * shorthand function for Math.sin, Math.cos
 * @param {Number} ε
 * @returns {Number[]} [sin(ε), cos(ε)]
 */
export function sincos(ε: number): number[];
/**
 * Convert degrees to radians
 * @param  {Number} deg - Angle in degrees
 * @return {Number} Angle in radians
 */
export function toRad(deg: number): number;
/**
 * Convert radians to degrees
 * @param  {Number} rad - Angle in radians
 * @return {Number} Angle in degrees
 */
export function toDeg(rad: number): number;
/**
 * separate fix `i` from fraction `f`
 * @param {Number} float
 * @returns {Array} [i, f]
 *  {Number} i - (int) fix value
 *  {Number} f - (float) fractional portion; always > 1
 */
export function modf(float: number): any[];
/**
 * Rounds `float` value by precision
 * @param {Number} float - value to round
 * @param {Number} [precision] - (int) number of post decimal positions
 * @return {Number} rounded `float`
 */
export function round(float: number, precision?: number): number;
export function errorCode(msg: any, code: any): Error;
/**
 * @copyright 2013 Sonia Keys
 * @copyright 2016 commenthol
 * @license MIT
 * @module base
 */
/**
 * Base: Functions and other definitions useful with multiple packages.
 *
 * Base contains various definitions and support functions useful in multiple
 * chapters.
 *
 * Bessellian and Julian Year
 *
 * Chapter 21, Precession actually contains these definitions.  They are moved
 * here because of their general utility.
 *
 * Chapter 22, Nutation contains the function for Julian centuries since J2000.
 *
 * Phase angle functions
 *
 * Two functions, Illuminated and Limb, concern the illumnated phase of a body
 * and are given in two chapters, 41 an 48.  They are collected here because
 * the identical functions apply in both chapters.
 *
 * General purpose math functions
 *
 * SmallAngle is recommended in chapter 17, p. 109.
 *
 * PMod addresses the issue on p. 7, chapter 1, in the section "Trigonometric
 * functions of large angles", but the function is not written to be specific
 * to angles and so has more general utility.
 *
 * Horner is described on p. 10, chapter 1.
 *
 * FloorDiv and FloorDiv64 are optimizations for the INT function described
 * on p. 60, chapter 7.
*/
/** K is the Gaussian gravitational constant. */
export const K: 0.01720209895;
/** AU is one astronomical unit in km. */
export const AU: 149597870;
/** SOblJ2000 sine obliquity at J2000. */
export const SOblJ2000: 0.397777156;
/** COblJ2000 cosine obliquity at J2000. */
export const COblJ2000: 0.917482062;
/**
 * Julian and Besselian years described in chapter 21, Precession.
 * T, Julian centuries since J2000 described in chapter 22, Nutation.
 */
/** JMod is the Julian date of the modified Julian date epoch. */
export const JMod: 2400000.5;
/** J2000 is the Julian date corresponding to January 1.5, year 2000. */
export const J2000: 2451545;
/** Julian days of Julian epoch 1900 */
export const J1900: 2415020;
/** Julian days of Besselian epoch 1900 */
export const B1900: 2415020.3135;
/** Julian days of Besselian epoch 1950 */
export const B1950: 2433282.4235;
/** JulianYear in days */
export const JulianYear: 365.25;
/** JulianCentury in days */
export const JulianCentury: 36525;
/** BesselianYear in days; equals mean tropical year */
export const BesselianYear: 365.2421988;
/** Mean sidereal year */
export const meanSiderealYear: 365.25636;
/**
 * celestial coordinates in right ascension and declination
 * or ecliptic coordinates in longitude and latitude
 */
export class Coord {
    /**
     * celestial coordinates in right ascension and declination
     * or ecliptic coordinates in longitude and latitude
     *
     * @param {number} ra - right ascension (or longitude)
     * @param {number} dec - declination (or latitude)
     * @param {number} [range] - distance
     * @param {number} [elongation] - elongation
     */
    constructor(ra: number, dec: number, range?: number, elongation?: number);
    _ra: number;
    _dec: number;
    range: number;
    elongation: number;
    set ra(ra: number);
    /**
     * right ascension
     * @return {number}
     */
    get ra(): number;
    set dec(dec: number);
    /**
     * declination
     * @return {number}
     */
    get dec(): number;
    set lon(ra: number);
    /**
     * right ascension (or longitude)
     * @return {number}
     */
    get lon(): number;
    set lat(dec: number);
    /**
     * declination (or latitude)
     * @return {number}
     */
    get lat(): number;
}
/**
 * SmallAngle is threshold used by various routines for switching between
 * trigonometric functions and Pythagorean approximations.
 */
export const SmallAngle: number;
/** cosine of SmallAngle */
export const CosSmallAngle: number;
declare namespace _default {
    export { K };
    export { AU };
    export { SOblJ2000 };
    export { COblJ2000 };
    export { lightTime };
    export { JMod };
    export { J2000 };
    export { J1900 };
    export { B1900 };
    export { B1950 };
    export { JulianYear };
    export { JulianCentury };
    export { BesselianYear };
    export { meanSiderealYear };
    export { JulianYearToJDE };
    export { JDEToJulianYear };
    export { BesselianYearToJDE };
    export { JDEToBesselianYear };
    export { J2000Century };
    export { illuminated };
    export { Coord };
    export { limb };
    export { SmallAngle };
    export { CosSmallAngle };
    export { pmod };
    export { horner };
    export { floorDiv };
    export { cmp };
    export { sincos };
    export { toRad };
    export { toDeg };
    export { modf };
    export { round };
    export { errorCode };
}
export default _default;
