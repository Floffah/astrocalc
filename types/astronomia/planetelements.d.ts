/**
 * Elements contains orbital elements as returned by functions in this package.
 *
 * Some other elements easily derived from these are
 *
 *  Mean Anomolay, M = Lon - Peri
 *  Argument of Perihelion, ω = Peri - Node
 *
 * @param {Number|Object} [lon]  - mean longitude, L
 * @param {Number} [axis] - semimajor axis, a
 * @param {Number} [ecc]  - eccentricity, e
 * @param {Number} [inc]  - inclination, i
 * @param {Number} [node] - longitude of ascending node, Ω
 * @param {Number} [peri] - longitude of perihelion, ϖ (Meeus likes π better)
 */
export function Elements(lon?: number | any, axis?: number, ecc?: number, inc?: number, node?: number, peri?: number): void;
export class Elements {
    /**
     * Elements contains orbital elements as returned by functions in this package.
     *
     * Some other elements easily derived from these are
     *
     *  Mean Anomolay, M = Lon - Peri
     *  Argument of Perihelion, ω = Peri - Node
     *
     * @param {Number|Object} [lon]  - mean longitude, L
     * @param {Number} [axis] - semimajor axis, a
     * @param {Number} [ecc]  - eccentricity, e
     * @param {Number} [inc]  - inclination, i
     * @param {Number} [node] - longitude of ascending node, Ω
     * @param {Number} [peri] - longitude of perihelion, ϖ (Meeus likes π better)
     */
    constructor(lon?: number | any, axis?: number, ecc?: number, inc?: number, node?: number, peri?: number);
    lon: any;
    axis: any;
    ecc: any;
    inc: any;
    node: any;
    peri: any;
}
/**
 * Mean returns mean orbital elements for a planet
 *
 * Argument p must be a planet const as defined above, argument e is
 * a result parameter.  A valid non-undefined pointer to an Elements struct
 * must be passed in.
 *
 * Results are referenced to mean dynamical ecliptic and equinox of date.
 *
 * Semimajor axis is in AU, angular elements are in radians.
 */
export function mean(p: any, jde: any, e: any): any;
/**
 * Inc returns mean inclination for a planet at a date.
 *
 * Result is the same as the Inc field returned by function Mean.  That is,
 * radians, referenced to mean dynamical ecliptic and equinox of date.
 */
export function inc(p: any, jde: any): number;
/**
 * Node returns mean longitude of ascending node for a planet at a date.
 *
 * Result is the same as the Node field returned by function Mean.  That is,
 * radians, referenced to mean dynamical ecliptic and equinox of date.
 */
export function node(p: any, jde: any): number;
export const mercury: "mercury";
export const venus: "venus";
export const earth: "earth";
export const mars: "mars";
export const jupiter: "jupiter";
export const saturn: "saturn";
export const uranus: "uranus";
export const neptune: "neptune";
declare namespace _default {
    export { mercury };
    export { venus };
    export { earth };
    export { mars };
    export { jupiter };
    export { saturn };
    export { uranus };
    export { neptune };
    export { Elements };
    export { mean };
    export { inc };
    export { node };
}
export default _default;
