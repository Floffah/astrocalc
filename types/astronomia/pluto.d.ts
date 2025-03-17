/**
 * Heliocentric returns J2000 heliocentric coordinates of Pluto.
 *
 * Results l, b are solar longitude and latitude in radians.
 * Result r is distance in AU.
 */
export function heliocentric(jde: any): {
    lon: number;
    lat: number;
    range: number;
};
/**
 * Astrometric returns J2000 astrometric coordinates of Pluto.
 */
export function astrometric(jde: any, earth: any): import("./base.js").Coord;
declare namespace _default {
    export { heliocentric };
    export { astrometric };
}
export default _default;
