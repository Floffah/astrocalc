/**
 * EllipticAscending computes time and distance of passage through the ascending node of a body in an elliptical orbit.
 *
 * Argument axis is semimajor axis in AU, ecc is eccentricity, argP is argument
 * of perihelion in radians, timeP is time of perihelion as a jd.
 *
 * Result is jde of the event and distance from the sun in AU.
 */
export function ellipticAscending(axis: any, ecc: any, argP: any, timeP: any): any[];
/**
 * EllipticAscending computes time and distance of passage through the descending node of a body in an elliptical orbit.
 *
 * Argument axis is semimajor axis in AU, ecc is eccentricity, argP is argument
 * of perihelion in radians, timeP is time of perihelion as a jd.
 *
 * Result is jde of the event and distance from the sun in AU.
 */
export function ellipticDescending(axis: any, ecc: any, argP: any, timeP: any): any[];
export function el(ν: any, axis: any, ecc: any, timeP: any): any[];
/**
 * ParabolicAscending computes time and distance of passage through the ascending node of a body in a parabolic orbit.
 *
 * Argument q is perihelion distance in AU, argP is argument of perihelion
 * in radians, timeP is time of perihelion as a jd.
 *
 * Result is jde of the event and distance from the sun in AU.
 */
export function parabolicAscending(q: any, argP: any, timeP: any): any[];
/**
 * ParabolicDescending computes time and distance of passage through the descending node of a body in a parabolic orbit.
 *
 * Argument q is perihelion distance in AU, argP is argument of perihelion
 * in radians, timeP is time of perihelion as a jd.
 *
 * Result is jde of the event and distance from the sun in AU.
 */
export function parabolicDescending(q: any, argP: any, timeP: any): any[];
export function pa(ν: any, q: any, timeP: any): any[];
declare namespace _default {
    export { ellipticAscending };
    export { ellipticDescending };
    export { el };
    export { parabolicAscending };
    export { parabolicDescending };
    export { pa };
}
export default _default;
