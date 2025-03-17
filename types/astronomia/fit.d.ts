/**
 * @copyright 2013 Sonia Keys
 * @copyright 2016 commenthol
 * @license MIT
 * @module fit
 */
/**
 * Fit: Chapter 4, Curve Fitting.
 */
/**
 * Linear fits a line to sample data.
 *
 * Argument p is a list of data points.  Results a and b are coefficients
 * of the best fit line y = ax + b.
 */
export function linear(points: any): number[];
/**
 * CorrelationCoefficient returns a correlation coefficient for sample data.
 */
export function correlationCoefficient(points: any): number;
/**
 * Quadratic fits y = ax² + bx + c to sample data.
 *
 * Argument p is a list of data points.  Results a, b, and c are coefficients
 * of the best fit quadratic y = ax² + bx + c.
 */
export function quadratic(points: any): number[];
/**
 * Func3 implements multiple linear regression for a linear combination
 * of three functions.
 *
 * Given sample data and three functions in x, Func3 returns coefficients
 * a, b, and c fitting y = aƒ₀(x) + bƒ₁(x) + cƒ₂(x) to sample data.
 */
export function func3(points: any, f0: any, f1: any, f2: any): number[];
/**
 * Func1 fits a linear multiple of a function to sample data.
 *
 * Given sample data and a function in x, Func1 returns coefficient
 * a fitting y = aƒ(x).
 */
export function func1(points: any, f: any): number;
declare namespace _default {
    export { linear };
    export { correlationCoefficient };
    export { quadratic };
    export { func3 };
    export { func1 };
}
export default _default;
