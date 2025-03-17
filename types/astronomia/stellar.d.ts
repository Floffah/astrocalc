/**
 * @copyright 2013 Sonia Keys
 * @copyright 2016 commenthol
 * @license MIT
 * @module stellar
 */
/**
 * Stellar: Chapter 56, Stellar Magnitudes.
 */
/**
 * Sum returns the combined apparent magnitude of two stars.
 */
export function sum(m1: any, m2: any): number;
/**
 * SumN returns the combined apparent magnitude of a number of stars.
 */
export function sumN(m: any): number;
/**
 * Ratio returns the brightness ratio of two stars.
 *
 * Arguments m1, m2 are apparent magnitudes.
 */
export function ratio(m1: any, m2: any): number;
/**
 * Difference returns the difference in apparent magnitude of two stars
 * given their brightness ratio.
 */
export function difference(ratio: any): number;
/**
 * AbsoluteByParallax returns absolute magnitude given annual parallax.
 *
 * Argument m is apparent magnitude, π is annual parallax in arc seconds.
 */
export function absoluteByParallax(m: any, π: any): any;
/**
 * AbsoluteByDistance returns absolute magnitude given distance.
 *
 * Argument m is apparent magnitude, d is distance in parsecs.
 */
export function absoluteByDistance(m: any, d: any): number;
declare namespace _default {
    export { sum };
    export { sumN };
    export { ratio };
    export { difference };
    export { absoluteByParallax };
    export { absoluteByDistance };
}
export default _default;
