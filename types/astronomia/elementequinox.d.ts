/**
 * ReduceB1950ToJ2000 reduces orbital elements of a solar system body from
 * equinox B1950 to J2000.
 *
 * @param {Elements} eFrom
 * @returns {Elements} eTo
 */
export function reduceB1950ToJ2000(eFrom: Elements): Elements;
/**
 * ReduceB1950ToJ2000 reduces orbital elements of a solar system body from
 * equinox B1950 in the FK4 system to equinox J2000 in the FK5 system.
 *
 * @param {Elements} eFrom
 * @returns {Elements} eTo
 */
export function reduceB1950FK4ToJ2000FK5(eFrom: Elements): Elements;
/**
 * Elements are the orbital elements of a solar system object which change
 * from one equinox to another.
 *
 * @param {Number} inc  - inclination
 * @param {Number} node - longitude of ascending node (Ω)
 * @param {Number} peri - argument of perihelion (ω)
 */
export class Elements {
    constructor(inc: any, node: any, peri: any);
    inc: any;
    node: any;
    peri: any;
}
declare namespace _default {
    export { Elements };
    export { reduceB1950ToJ2000 };
    export { reduceB1950FK4ToJ2000FK5 };
}
export default _default;
