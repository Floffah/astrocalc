/**
 * Semidiameter returns semidiameter at specified distance.
 *
 * When used with S0 values provided, Δ must be observer-body distance in AU.
 * Result will then be in radians.
 */
export function semidiameter(s0: any, Δ: any): number;
/**
 * SaturnApparentPolar returns apparent polar semidiameter of Saturn
 * at specified distance.
 *
 * Argument Δ must be observer-Saturn distance in AU.  Argument B is
 * Saturnicentric latitude of the observer as given by function saturnring.UB()
 * for example.
 *
 * Result is semidiameter in units of package variables SaturnPolar and
 * SaturnEquatorial, nominally radians.
 */
export function saturnApparentPolar(Δ: any, B: any): number;
/**
 * MoonTopocentric returns observed topocentric semidiameter of the Moon.
 *
 *  Δ is distance to Moon in AU.
 *  δ is declination of Moon in radians.
 *  H is hour angle of Moon in radians.
 *  ρsφʹ, ρcφʹ are parallax constants as returned by
 *      globe.Ellipsoid.ParallaxConstants, for example.
 *
 * Result is semidiameter in radians.
 */
export function moonTopocentric(Δ: any, δ: any, H: any, ρsφʹ: any, ρcφʹ: any): number;
/**
 * MoonTopocentric2 returns observed topocentric semidiameter of the Moon
 * by a less rigorous method.
 *
 * Δ is distance to Moon in AU, h is altitude of the Moon above the observer's
 * horizon in radians.
 *
 * Result is semidiameter in radians.
 */
export function moonTopocentric2(Δ: any, h: any): number;
/**
 * AsteroidDiameter returns approximate diameter given absolute magnitude H
 * and albedo A.
 *
 * Result is in km.
 */
export function asteroidDiameter(H: any, A: any): number;
/**
 * Asteroid returns semidiameter of an asteroid with a given diameter
 * at given distance.
 *
 * Argument d is diameter in km, Δ is distance in AU.
 *
 * Result is semidiameter in radians.
 */
export function asteroid(d: any, Δ: any): number;
/**
 * Standard semidiameters at unit distance of 1 AU.
 * Values are scaled here to radians.
 */
export const Sun: number;
export const Mercury: number;
export const VenusSurface: number;
export const VenusCloud: number;
export const Mars: number;
export const JupiterEquatorial: number;
export const JupiterPolar: number;
export const SaturnEquatorial: number;
export const SaturnPolar: number;
export const Uranus: number;
export const Neptune: number;
export const Pluto: number;
export const Moon: number;
declare namespace _default {
    export { Sun };
    export { Mercury };
    export { VenusSurface };
    export { VenusCloud };
    export { Mars };
    export { JupiterEquatorial };
    export { JupiterPolar };
    export { SaturnEquatorial };
    export { SaturnPolar };
    export { Uranus };
    export { Neptune };
    export { Pluto };
    export { Moon };
    export { semidiameter };
    export { saturnApparentPolar };
    export { moonTopocentric };
    export { moonTopocentric2 };
    export { asteroidDiameter };
    export { asteroid };
}
export default _default;
