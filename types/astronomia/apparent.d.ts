/**
 * Nutation returns corrections due to nutation for equatorial coordinates
 * of an object.
 *
 * Results are invalid for objects very near the celestial poles.
 * @param {Number} α - right ascension
 * @param {Number} δ - declination
 * @param {Number} jd - Julian Day
 * @return {Number[]} [Δα1, Δδ1] -
*/
export function nutation(α: number, δ: number, jd: number): number[];
/**
 * longitude of perihelian of Earth's orbit.
 */
export function perihelion(T: any): number;
/**
 * EclipticAberration returns corrections due to aberration for ecliptic
 * coordinates of an object.
 */
export function eclipticAberration(λ: any, β: any, jd: any): number[];
/**
 * Aberration returns corrections due to aberration for equatorial
 * coordinates of an object.
 */
export function aberration(α: any, δ: any, jd: any): number[];
/**
 * Position computes the apparent position of an object.
 *
 * Position is computed for equatorial coordinates in eqFrom, considering
 * proper motion, precession, nutation, and aberration.  Result is in
 * eqTo.  EqFrom and eqTo must be non-nil, but may point to the same struct.
 */
export function position(eqFrom: any, epochFrom: any, epochTo: any, mα: any, mδ: any): import("./coord.js").Equatorial;
/**
 * AberrationRonVondrak uses the Ron-Vondrák expression to compute corrections
 * due to aberration for equatorial coordinates of an object.
 */
export function aberrationRonVondrak(α: any, δ: any, jd: any): number[];
/**
 * PositionRonVondrak computes the apparent position of an object using
 * the Ron-Vondrák expression for aberration.
 *
 * Position is computed for equatorial coordinates in eqFrom, considering
 * proper motion, aberration, precession, and _nutation.  Result is in
 * eqTo.  EqFrom and eqTo must be non-nil, but may point to the same struct.
 *
 * Note the Ron-Vondrák expression is only valid for the epoch J2000.
 * EqFrom must be coordinates at epoch J2000.
 */
export function positionRonVondrak(eqFrom: any, epochTo: any, mα: any, mδ: any): import("./coord.js").Equatorial;
declare namespace _default {
    export { nutation };
    export { perihelion };
    export { eclipticAberration };
    export { aberration };
    export { position };
    export { aberrationRonVondrak };
    export { positionRonVondrak };
}
export default _default;
