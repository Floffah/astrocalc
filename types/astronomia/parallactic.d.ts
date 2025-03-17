/**
 * ParallacticAngle returns parallactic angle of a celestial object.
 *
 *  φ is geographic latitude of observer.
 *  δ is declination of observed object.
 *  H is hour angle of observed object.
 *
 * All angles including result are in radians.
 */
export function parallacticAngle(φ: any, δ: any, H: any): number;
/**
 * ParallacticAngleOnHorizon is a special case of ParallacticAngle.
 *
 * The hour angle is not needed as an input and the math inside simplifies.
 */
export function parallacticAngleOnHorizon(φ: any, δ: any): number;
/**
 * EclipticAtHorizon computes how the plane of the ecliptic intersects
 * the horizon at a given local sidereal time as observed from a given
 * geographic latitude.
 *
 *  ε is obliquity of the ecliptic.
 *  φ is geographic latitude of observer.
 *  θ is local sidereal time expressed as an hour angle.
 *
 *  λ1 and λ2 are ecliptic longitudes where the ecliptic intersects the horizon.
 *  I is the angle at which the ecliptic intersects the horizon.
 *
 * All angles, arguments and results, are in radians.
 */
export function eclipticAtHorizon(ε: any, φ: any, θ: any): number[];
/**
 * EclipticAtEquator computes the angle between the ecliptic and the parallels
 * of ecliptic latitude at a given ecliptic longitude.
 *
 * (The function name EclipticAtEquator is for consistency with the Meeus text,
 * and works if you consider the equator a nominal parallel of latitude.)
 *
 *  λ is ecliptic longitude.
 *  ε is obliquity of the ecliptic.
 *
 * All angles in radians.
 */
export function eclipticAtEquator(λ: any, ε: any): number;
/**
 * DiurnalPathAtHorizon computes the angle of the path a celestial object
 * relative to the horizon at the time of its rising or setting.
 *
 *  δ is declination of the object.
 *  φ is geographic latitude of observer.
 *
 * All angles in radians.
 */
export function diurnalPathAtHorizon(δ: any, φ: any): number;
declare namespace _default {
    export { parallacticAngle };
    export { parallacticAngleOnHorizon };
    export { eclipticAtHorizon };
    export { eclipticAtEquator };
    export { diurnalPathAtHorizon };
}
export default _default;
