/**
 * Solar computes quantities related to solar eclipses.
 *
 * Argument year is a decimal year specifying a date.
 *
 * eclipseType will be None, Partial, Annular, AnnularTotal, or Total.
 * If None, none of the other return values may be meaningful.
 *
 * central is true if the center of the eclipse shadow touches the Earth.
 *
 * jdeMax is the jde when the center of the eclipse shadow is closest to the
 * Earth center, in a plane through the center of the Earth.
 *
 * γ is the distance from the eclipse shadow center to the Earth center
 * at time jdeMax.
 *
 * u is the radius of the Moon's umbral cone in the plane of the Earth.
 *
 * p is the radius of the penumbral cone.
 *
 * mag is eclipse magnitude for partial eclipses.  It is not valid for other
 * eclipse types.
 *
 * γ, u, and p are in units of equatorial Earth radii.
 */
export function solar(year: any): {
    type: number;
    central?: undefined;
    jdeMax?: undefined;
    magnitude?: undefined;
    distance?: undefined;
    umbral?: undefined;
    penumbral?: undefined;
} | {
    type: number;
    central: boolean;
    jdeMax: any;
    magnitude: number;
    distance: any;
    umbral: any;
    penumbral: any;
};
/**
 * Lunar computes quantities related to lunar eclipses.
 *
 * Argument year is a decimal year specifying a date.
 *
 * eclipseType will be None, Penumbral, Umbral, or Total.
 * If None, none of the other return values may be meaningful.
 *
 * jdeMax is the jde when the center of the eclipse shadow is closest to the
 * Moon center, in a plane through the center of the Moon.
 *
 * γ is the distance from the eclipse shadow center to the moon center
 * at time jdeMax.
 *
 * σ is the radius of the umbral cone in the plane of the Moon.
 *
 * ρ is the radius of the penumbral cone.
 *
 * mag is eclipse magnitude.
 *
 * sd- return values are semidurations of the phases of the eclipse, in days.
 *
 * γ, σ, and ρ are in units of equatorial Earth radii.
 */
export function lunar(year: any): {
    type: number;
    jdeMax?: undefined;
    magnitude?: undefined;
    distance?: undefined;
    umbral?: undefined;
    penumbral?: undefined;
    sdTotal?: undefined;
    sdPartial?: undefined;
    sdPenumbral?: undefined;
} | {
    type: number;
    jdeMax: any;
    magnitude: number;
    distance: any;
    umbral: number;
    penumbral: any;
    sdTotal: number;
    sdPartial: number;
    sdPenumbral: number;
};
export namespace TYPE {
    let None: number;
    let Partial: number;
    let Annular: number;
    let AnnularTotal: number;
    let Penumbral: number;
    let Umbral: number;
    let Total: number;
}
declare namespace _default {
    export { TYPE };
    export { solar };
    export { lunar };
}
export default _default;
