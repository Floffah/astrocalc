/**
 * Len3ForInterpolateX is a special purpose Len3 constructor.
 *
 * Like NewLen3, it takes a table of x and y values, but it is not limited
 * to tables of 3 rows.  An X value is also passed that represents the
 * interpolation target x value.  Len3ForInterpolateX will locate the
 * appropriate three rows of the table for interpolating for x, and initialize
 * the Len3 object for those rows.
 *
 * @param {Number} x - is the target for interpolation
 * @param {Number} x1 - is the x value corresponding to the first y value of the table.
 * @param {Number} xN - is the x value corresponding to the last y value of the table.
 * @param {Number[]} y - is all y values in the table.  y.length should be >= 3.0
 * @returns {Len3} interpolation value
 */
export function len3ForInterpolateX(x: number, x1: number, xN: number, y: number[]): Len3;
/**
 * Len4Half interpolates a center value from a table of four rows.
 * @param {Number[]} y - 4 values
 * @returns {Number} interpolation result
 */
export function len4Half(y: number[]): number;
/**
 * Lagrange performs interpolation with unequally-spaced abscissae.
 *
 * Given a table of X and Y values, interpolate a new y value for argument x.
 *
 * X values in the table do not have to be equally spaced; they do not even
 * have to be in order. They must however, be distinct.
 *
 * @param {Number} x - x-value of interpolation
 * @param {Array} table - `[[x0, y0], ... [xN, yN]]` of x, y values
 * @returns {Number} interpolation result `y` of `x`
 */
export function lagrange(x: number, table: any[]): number;
/**
 * LagrangePoly uses the formula of Lagrange to produce an interpolating
 * polynomial.
 *
 * X values in the table do not have to be equally spaced; they do not even
 * have to be in order.  They must however, be distinct.
 *
 * The returned polynomial will be of degree n-1 where n is the number of rows
 * in the table.  It can be evaluated for x using base.horner.
 *
 * @param {Array} table - `[[x0, y0], ... [xN, yN]]`
 * @returns {Array} - polynomial array
 */
export function lagrangePoly(table: any[]): any[];
/**
 * Linear Interpolation of x
 */
export function linear(x: any, x1: any, xN: any, y: any): any;
/**
 * Error values returned by functions and methods in this package.
 * Defined here to help testing for specific errors.
 */
export const errorNot3: Error;
export const errorNot4: Error;
export const errorNot5: Error;
export const errorNoXRange: Error;
export const errorNOutOfRange: Error;
export const errorNoExtremum: Error;
export const errorExtremumOutside: Error;
export const errorZeroOutside: Error;
export const errorNoConverge: Error;
/**
 * Len3 allows second difference interpolation.
 */
export class Len3 {
    /**
     * NewLen3 prepares a Len3 object from a table of three rows of x and y values.
     *
     * X values must be equally spaced, so only the first and last are supplied.
     * X1 must not equal to x3.  Y must be a slice of three y values.
     *
     * @throws Error
     * @param {Number} x1 - is the x value corresponding to the first y value of the table.
     * @param {Number} x3 - is the x value corresponding to the last y value of the table.
     * @param {Number[]} y - is all y values in the table. y.length should be >= 3.0
     */
    constructor(x1: number, x3: number, y: number[]);
    x1: number;
    x3: number;
    y: number[];
    a: number;
    b: number;
    c: number;
    abSum: number;
    xSum: number;
    xDiff: number;
    /**
     * InterpolateX interpolates for a given x value.
     */
    interpolateX(x: any): number;
    /**
     * InterpolateXStrict interpolates for a given x value,
     * restricting x to the range x1 to x3 given to the constructor NewLen3.
     */
    interpolateXStrict(x: any): number;
    /**
     * InterpolateN interpolates for (a given interpolating factor n.
     *
     * This is interpolation formula (3.3)
     *
     * @param n - The interpolation factor n is x-x2 in units of the tabular x interval.
     * (See Meeus p. 24.)
     * @return {number} interpolation value
     */
    interpolateN(n: any): number;
    /**
     * InterpolateNStrict interpolates for (a given interpolating factor n.
     *
     * @param {number} n - n is restricted to the range [-1..1] corresponding to the range x1 to x3
     * given to the constructor of Len3.
     * @return {number} interpolation value
     */
    interpolateNStrict(n: number): number;
    /**
     * Extremum returns the x and y values at the extremum.
     *
     * Results are restricted to the range of the table given to the constructor
     * new Len3.
     */
    extremum(): number[];
    /**
     * Len3Zero finds a zero of the quadratic function represented by the table.
     *
     * That is, it returns an x value that yields y=0.
     *
     * Argument strong switches between two strategies for the estimation step.
     * when iterating to converge on the zero.
     *
     * Strong=false specifies a quick and dirty estimate that works well
     * for gentle curves, but can work poorly or fail on more dramatic curves.
     *
     * Strong=true specifies a more sophisticated and thus somewhat more
     * expensive estimate.  However, if the curve has quick changes, This estimate
     * will converge more reliably and in fewer steps, making it a better choice.
     *
     * Results are restricted to the range of the table given to the constructor
     * NewLen3.
     */
    zero(strong: any): number;
}
export function iterate(n0: number, f: Function): any[];
/**
 * Len5 allows fourth Difference interpolation.
 */
export class Len5 {
    /**
     * NewLen5 prepares a Len5 object from a table of five rows of x and y values.
     *
     * X values must be equally spaced, so only the first and last are suppliethis.
     * X1 must not equal x5.  Y must be a slice of five y values.
     */
    constructor(x1: any, x5: any, y: any);
    x1: any;
    x5: any;
    y: any;
    y3: any;
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    g: number;
    h: number;
    j: number;
    k: number;
    xSum: any;
    xDiff: number;
    interpCoeff: any[];
    /**
     * InterpolateX interpolates for (a given x value.
     */
    interpolateX(x: any): number;
    /**
     * InterpolateXStrict interpolates for a given x value,
     * restricting x to the range x1 to x5 given to the the constructor NewLen5.
     */
    interpolateXStrict(x: any): number;
    /**
     * InterpolateN interpolates for (a given interpolating factor n.
     *
     * The interpolation factor n is x-x3 in units of the tabular x interval.
     * (See Meeus p. 28.)
     */
    interpolateN(n: any): number;
    /**
     * InterpolateNStrict interpolates for (a given interpolating factor n.
     *
     * N is restricted to the range [-1..1].  This is only half the range given
     * to the constructor NewLen5, but is the recommendation given on p. 31.0
     */
    interpolateNStrict(n: any): number;
    /**
     * Extremum returns the x and y values at the extremum.
     *
     * Results are restricted to the range of the table given to the constructor
     * NewLen5.  (Meeus actually recommends restricting the range to one unit of
     * the tabular interval, but that seems a little harsh.)
     */
    extremum(): number[];
    /**
     * Len5Zero finds a zero of the quartic function represented by the table.
     *
     * That is, it returns an x value that yields y=0.
     *
     * Argument strong switches between two strategies for the estimation step.
     * when iterating to converge on the zero.
     *
     * Strong=false specifies a quick and dirty estimate that works well
     * for gentle curves, but can work poorly or fail on more dramatic curves.
     *
     * Strong=true specifies a more sophisticated and thus somewhat more
     * expensive estimate.  However, if the curve has quick changes, This estimate
     * will converge more reliably and in fewer steps, making it a better choice.
     *
     * Results are restricted to the range of the table given to the constructor
     * NewLen5.
     */
    zero(strong: any): number;
}
declare namespace _default {
    export { errorNot3 };
    export { errorNot4 };
    export { errorNot5 };
    export { errorNoXRange };
    export { errorNOutOfRange };
    export { errorNoExtremum };
    export { errorExtremumOutside };
    export { errorZeroOutside };
    export { errorNoConverge };
    export { Len3 };
    export { len3ForInterpolateX };
    export { iterate };
    export { len4Half };
    export { Len5 };
    export { lagrange };
    export { lagrangePoly };
    export { linear };
}
export default _default;
