/**
 * Elements holds parabolic elements needed for computing true anomaly and distance.
 */
export class Elements {
    /**
     * @param {Number} timeP - time of perihelion, T
     * @param {Number} pDis - perihelion distance, q
     */
    constructor(timeP: number, pDis: number);
    timeP: number;
    pDis: number;
    /**
     * AnomalyDistance returns true anomaly and distance of a body in a parabolic orbit of the Sun.
     *
     * @param {Number} jde - Julian ephemeris day
     * @returns {Object} {ano, dist}
     *   {Number} ano - True anomaly ν in radians.
     *   {Number} dist - Distance r returned in AU.
     */
    anomalyDistance(jde: number): any;
}
declare namespace _default {
    export { Elements };
}
export default _default;
