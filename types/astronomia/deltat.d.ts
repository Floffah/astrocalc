/**
 * deltaT returns the difference ΔT = TD - UT between Dynamical Time TD and
 * Univeral Time (GMT+12) in seconds
 *
 * Polynoms are from <http://eclipse.gsfc.nasa.gov/SEcat5/deltatpoly.html>
 * and <http://www.staff.science.uu.nl/~gent0113/deltat/deltat_old.htm>
 *
 * @param {Number} dyear - decimal year
 * @returns {Number} ΔT in seconds.
 */
export function deltaT(dyear: number): number;
declare namespace _default {
    export { deltaT };
}
export default _default;
