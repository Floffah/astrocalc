/**
 * Elements holds orbital elements for near-parabolic orbits.
 */
export class Elements {
    /**
     * @param {Number} timeP - time of Perihelion, T
     * @param {Number} pDis - Perihelion distance, q
     * @param {Number} ecc - eccentricity, e
     */
    constructor(timeP: number, pDis: number, ecc: number);
    timeP: number;
    pDis: number;
    ecc: number;
    /**
     * AnomalyDistance returns true anomaly and distance for near-parabolic orbits.
     *
     * True anomaly ν returned in radians. Distance r returned in AU.
     * An error is returned if the algorithm fails to converge.
     */
    anomalyDistance(jde: any): {
        ano: number;
        dist: number;
        err: any;
    } | {
        err: Error;
        ano?: undefined;
        dist?: undefined;
    };
}
declare namespace _default {
    export { Elements };
}
export default _default;
