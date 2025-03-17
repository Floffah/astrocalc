/**
 * DMSToDeg converts from parsed sexagesimal angle components to decimal
 * degrees.
 * @param {Boolean} neg - sign, true if negative
 * @param {Number} d - (int) degree
 * @param {Number} m - (int) minute
 * @param {Number} s - (float) second
 * @returns {Number} angle in degree
 */
export function DMSToDeg(neg: boolean, d: number, m: number, s: number): number;
/**
 * DegToDMS converts from decimal degrees to parsed sexagesimal angle component.
 * @param {Number} deg - angle in degree
 * @returns {Array} [neg, d, m, s]
 *  {Boolean} neg - sign, true if negative
 *  {Number} d - (int) degree
 *  {Number} m - (int) minute
 *  {Number} s - (float) second
 */
export function degToDMS(deg: number): any[];
/**
 * @copyright 2013 Sonia Keys
 * @copyright 2016 commenthol
 * @license MIT
 * @module sexagesimal
 */
/**
 * Sexagesimal functions
 */
/**
 * Angle represents a general purpose angle.
 * Unit is radians.
 */
export class Angle {
    /**
    * constructs a new Angle value from sign, degree, minute, and second
    * components.
    * @param {Number|Boolean} angleOrNeg - angle in radians or sign, true if negative (required to attribute -0°30')
    * __Four arguments__
    * @param {Number} [d] - (int) degree
    * @param {Number} [m] - (int) minute
    * @param {Number} [s] - (float) second
    */
    constructor(angleOrNeg: number | boolean, d?: number, m?: number, s?: number, ...args: any[]);
    angle: number;
    /**
     * SetDMS sets the value of an FAngle from sign, degree, minute, and second
     * components.
     * The receiver is returned as a convenience.
     * @param {Boolean} neg - sign, true if negative
     * @param {Number} d - (int) degree
     * @param {Number} m - (int) minute
     * @param {Number} s - (float) second
     * @returns {Angle}
     */
    setDMS(neg?: boolean, d?: number, m?: number, s?: number): Angle;
    /**
     * sets angle
     * @param {Number} angle - (float) angle in radians
     * @returns {Angle}
     */
    setAngle(angle: number): Angle;
    /**
     * Rad returns the angle in radians.
     * @returns {Number} angle in radians
     */
    rad(): number;
    /**
     * Deg returns the angle in degrees.
     * @returns {Number} angle in degree
     */
    deg(): number;
    /**
     * toDMS converts to parsed sexagesimal angle component.
     */
    toDMS(): any[];
    /**
     * Print angle in degree using `d°m´s.ss″`
     * @param {Number} [precision] - precision of `s.ss`
     * @returns {String}
     */
    toString(precision?: number): string;
    /**
     * Print angle in degree using `d°.ff`
     * @param {Number} [precision] - precision of `.ff`
     * @returns {String}
     */
    toDegString(precision?: number): string;
}
/**
 * HourAngle represents an angle corresponding to angular rotation of
 * the Earth in a specified time.
 *
 * Unit is radians.
 */
export class HourAngle extends Angle {
    /**
     * Hour returns the hour angle as hours of time.
     * @returns hour angle
     */
    hour(): number;
    /**
     * Print angle in `HʰMᵐs.ssˢ`
     * @param {Number} precision - precision of `s.ss`
     * @returns {String}
     */
    toString(precision: number): string;
}
export class RA extends HourAngle {
    /**
     * constructs a new RA value from hour, minute, and second components.
     * Negative values are not supported, RA wraps values larger than 24
     * to the range [0,24) hours.
     * @param {Number} h - (int) hour
     * @param {Number} m - (int) minute
     * @param {Number} s - (float) second
     */
    constructor(h?: number, m?: number, s?: number, ...args: any[]);
}
/**
 * Time Angle
 * Unit is time in seconds.
 */
export class Time {
    /**
     * @param {boolean|number} negOrTimeInSecs - set `true` if negative; if type is number than time in seconds
     * @param {number} [h] - (int) hour
     * @param {number} [m] - (int) minute
     * @param {number} [s] - (float) second
     * @example
     * new sexa.Time(SECS_OF_DAY)
     * new sexa.Time(false, 15, 22, 7)
     */
    constructor(negOrTimeInSecs: boolean | number, h?: number, m?: number, s?: number);
    time: number;
    setHMS(neg?: boolean, h?: number, m?: number, s?: number): void;
    /**
     * @returns {Number} time in seconds.
     */
    sec(): number;
    /**
     * @returns {Number} time in minutes.
     */
    min(): number;
    /**
     * @returns {Number} time in hours.
     */
    hour(): number;
    /**
     * @returns {Number} time in days.
     */
    day(): number;
    /**
     * @returns {Number} time in radians, where 1 day = 2 Pi radians.
     */
    rad(): number;
    /**
     * convert time to HMS
     * @returns {Array} [neg, h, m, s]
     *  {Boolean} neg - sign, true if negative
     *  {Number} h - (int) hour
     *  {Number} m - (int) minute
     *  {Number} s - (float) second
     */
    toHMS(): any[];
    /**
     * Print time using `HʰMᵐsˢ.ss`
     * @param {Number} precision - precision of `.ss`
     * @returns {String}
     */
    toString(precision: number): string;
}
export function angleFromDeg(deg: any): number;
export function angleFromMin(min: any): number;
export function angleFromSec(sec: any): number;
export function degFromAngle(angle: any): number;
export function secFromAngle(angle: any): number;
export function secFromHourAngle(ha: any): number;
declare namespace _default {
    export { Angle };
    export { HourAngle };
    export { DMSToDeg };
    export { degToDMS };
    export { RA };
    export { Time };
    export { angleFromDeg };
    export { angleFromMin };
    export { angleFromSec };
    export { degFromAngle };
    export { secFromAngle };
    export { secFromHourAngle };
}
export default _default;
