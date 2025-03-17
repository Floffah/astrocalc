/**
 * Position returns observed equatorial coordinates of a planet at a given time.
 *
 * Argument p must be a valid V87Planet object for the observed planet.
 * Argument earth must be a valid V87Planet object for Earth.
 *
 * Results are right ascension and declination, α and δ in radians.
 */
export function position(planet: any, earth: any, jde: any): import("./coord.js").Equatorial;
/**
 * AstrometricJ2000 is a utility function for computing astrometric coordinates.
 *
 * It is used internally and only exported so that it can be used from
 * multiple packages.  It is not otherwise expected to be used.
 *
 * Argument f is a function that returns J2000 equatorial rectangular
 * coodinates of a body.
 *
 * Results are J2000 right ascention, declination, and elongation.
 */
export function astrometricJ2000(f: any, jde: any, earth: any): import("./base.js").Coord;
/**
 * Velocity returns instantaneous velocity of a body in elliptical orbit around the Sun.
 *
 * Argument a is the semimajor axis of the body, r is the instaneous distance
 * to the Sun, both in AU.
 *
 * Result is in Km/sec.
 */
export function velocity(a: any, r: any): number;
/**
 * Velocity returns the velocity of a body at aphelion.
 *
 * Argument a is the semimajor axis of the body in AU, e is eccentricity.
 *
 * Result is in Km/sec.
 */
export function vAphelion(a: any, e: any): number;
/**
 * Velocity returns the velocity of a body at perihelion.
 *
 * Argument a is the semimajor axis of the body in AU, e is eccentricity.
 *
 * Result is in Km/sec.
 */
export function vPerihelion(a: any, e: any): number;
/**
 * Length1 returns Ramanujan's approximation for the length of an elliptical
 * orbit.
 *
 * Argument a is semimajor axis, e is eccentricity.
 *
 * Result is in units used for semimajor axis, typically AU.
 */
export function length1(a: any, e: any): number;
/**
 * Length2 returns an alternate approximation for the length of an elliptical
 * orbit.
 *
 * Argument a is semimajor axis, e is eccentricity.
 *
 * Result is in units used for semimajor axis, typically AU.
 */
export function length2(a: any, e: any): number;
/**
 * Length3 returns the length of an elliptical orbit.
 *
 * Argument a is semimajor axis, e is eccentricity.
 *
 * Result is exact, and in units used for semimajor axis, typically AU.
 */
/**
 * Length4 returns the length of an elliptical orbit.
 *
 * Argument a is semimajor axis, e is eccentricity.
 *
 * Result is exact, and in units used for semimajor axis, typically AU.
 */
export function length4(a: any, e: any): number;
/**
 * Elements holds keplerian elements.
 */
export class Elements {
    constructor(axis: any, ecc: any, inc: any, argP: any, node: any, timeP: any);
    axis: any;
    ecc: any;
    inc: any;
    argP: any;
    node: any;
    timeP: any;
    /**
     * Position returns observed equatorial coordinates of a body with Keplerian elements.
     *
     * Argument e must be a valid V87Planet object for Earth.
     *
     * Results are right ascension and declination α and δ, and elongation ψ,
     * all in radians.
     */
    position(jde: any, earth: any): import("./base.js").Coord;
}
declare namespace _default {
    export { position };
    export { Elements };
    export { astrometricJ2000 };
    export { velocity };
    export { vAphelion };
    export { vPerihelion };
    export { length1 };
    export { length2 };
    export { length4 };
}
export default _default;
