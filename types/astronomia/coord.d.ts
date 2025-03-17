/**
 * @typedef {object} LonLat
 * @property {Number} lon - Longitude (λ) in radians
 * @property {Number} lat - Latitude (β) in radians
 */
/**
* Ecliptic coordinates are referenced to the plane of the ecliptic.
*/
export class Ecliptic {
    /**
     * IMPORTANT: Longitudes are measured *positively* westwards
     * e.g. Washington D.C. +77°04; Vienna -16°23'
     * @param {Number|LonLat} [lon] - Longitude (λ) in radians
     * @param {Number} [lat] - Latitude (β) in radians
     */
    constructor(lon?: number | LonLat, lat?: number);
    lon: number;
    lat: number;
    /**
     * converts ecliptic coordinates to equatorial coordinates.
     * @param {Number} ε - Obliquity
     * @returns {Equatorial}
     */
    toEquatorial(ε: number): Equatorial;
}
/**
 * Equatorial coordinates are referenced to the Earth's rotational axis.
 */
export class Equatorial {
    /**
     * @param {Number} ra - (float) Right ascension (α) in radians
     * @param {Number} dec - (float) Declination (δ) in radians
     */
    constructor(ra?: number, dec?: number);
    ra: number;
    dec: number;
    /**
     * EqToEcl converts equatorial coordinates to ecliptic coordinates.
     * @param {Number} ε - Obliquity
     * @returns {Ecliptic}
     */
    toEcliptic(ε: number): Ecliptic;
    /**
     * EqToHz computes Horizontal coordinates from equatorial coordinates.
     *
     * Argument g is the location of the observer on the Earth.  Argument st
     * is the sidereal time at Greenwich.
     *
     * Sidereal time must be consistent with the equatorial coordinates.
     * If coordinates are apparent, sidereal time must be apparent as well.
     *
     * @param {GlobeCoord} g - coordinates of observer on Earth
     * @param {Number} st - sidereal time at Greenwich at time of observation
     * @returns {Horizontal}
     */
    toHorizontal(g: GlobeCoord, st: number): Horizontal;
    /**
     * EqToGal converts equatorial coordinates to galactic coordinates.
     *
     * Equatorial coordinates must be referred to the standard equinox of B1950.0.
     * For conversion to B1950, see package precess and utility functions in
     * package "common".
     *
     * @returns {Galactic}
     */
    toGalactic(): Galactic;
}
/**
 * Horizontal coordinates are referenced to the local horizon of an observer
 * on the surface of the Earth.
 * @param {Number} az - Azimuth (A) in radians
 * @param {Number} alt - Altitude (h) in radians
 */
export class Horizontal {
    constructor(az?: number, alt?: number);
    az: number;
    alt: number;
    /**
     * transforms horizontal coordinates to equatorial coordinates.
     *
     * Sidereal time must be consistent with the equatorial coordinates.
     * If coordinates are apparent, sidereal time must be apparent as well.
     * @param {GlobeCoord} g - coordinates of observer on Earth (lat, lon)
     * @param {Number} st - sidereal time at Greenwich at time of observation.
     * @returns {Equatorial} (right ascension, declination)
     */
    toEquatorial(g: GlobeCoord, st: number): Equatorial;
}
/**
 * Galactic coordinates are referenced to the plane of the Milky Way.
 * @param {Number} lon - Longitude (l) in radians
 * @param {Number} lat - Latitude (b) in radians
 */
export class Galactic {
    constructor(lon?: number, lat?: number);
    lon: number;
    lat: number;
    /**
     * GalToEq converts galactic coordinates to equatorial coordinates.
     *
     * Resulting equatorial coordinates will be referred to the standard equinox of
     * B1950.0.  For subsequent conversion to other epochs, see package precess and
     * utility functions in package meeus.
     *
     * @returns {Equatorial} (right ascension, declination)
     */
    toEquatorial(): Equatorial;
}
/**
* equatorial coords for galactic north
* IAU B1950.0 coordinates of galactic North Pole
*/
export const galacticNorth: Equatorial;
export const galacticNorth1950: Equatorial;
/**
* Galactic Longitude 0°
* Meeus gives 33 as the origin of galactic longitudes relative to the
* ascending node of of the galactic equator.  33 + 90 = 123, the IAU
* value for origin relative to the equatorial pole.
*/
export const galacticLon0: number;
export const galactic0Lon1950: number;
declare namespace _default {
    export { Ecliptic };
    export { Equatorial };
    export { Horizontal };
    export { Galactic };
    export { galacticNorth };
    export { galacticNorth1950 };
    export { galacticLon0 };
    export { galactic0Lon1950 };
}
export default _default;
export type LonLat = {
    /**
     * - Longitude (λ) in radians
     */
    lon: number;
    /**
     * - Latitude (β) in radians
     */
    lat: number;
};
import { Coord as GlobeCoord } from './globe.js';
