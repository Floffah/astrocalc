/**
 * PhaseAngle computes the phase angle of a planet.
 *
 * Argument r is planet's distance to Sun, Δ its distance to Earth, and R
 * the distance from Sun to Earth.  All distances in AU.
 *
 * Result in radians.
 */
export function phaseAngle(r: any, Δ: any, R: any): number;
/**
 * Fraction computes the illuminated fraction of the disk of a planet.
 *
 * Argument r is planet's distance to Sun, Δ its distance to Earth, and R
 * the distance from Sun to Earth.  All distances in AU.
 */
export function fraction(r: any, Δ: any, R: any): number;
/**
 * PhaseAngle2 computes the phase angle of a planet.
 *
 * Arguments L, B, R are heliocentric ecliptical coordinates of the planet.
 * L0, R0 are longitude and radius for Earth, Δ is distance from Earth to
 * the planet.  All distances in AU, angles in radians.
 *
 * The phase angle result is in radians.
 */
export function phaseAngle2(L: any, B: any, R: any, L0: any, R0: any, Δ: any): number;
/**
 * PhaseAngle3 computes the phase angle of a planet.
 *
 * Arguments L, B are heliocentric ecliptical longitude and latitude of the
 * planet.  x, y, z are cartesian coordinates of the planet, Δ is distance
 * from Earth to the planet.  All distances in AU, angles in radians.
 *
 * The phase angle result is in radians.
 */
export function phaseAngle3(L: any, B: any, x: any, y: any, z: any, Δ: any): number;
/**
 * FractionVenus computes an approximation of the illumanted fraction of Venus.
 */
export function fractionVenus(jde: any): number;
/**
 * Mercury computes the visual magnitude of Mercury.
 * Formula by G. Müller
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth,
 * and i the phase angle in radians.
 */
export function mercury(r: any, Δ: any, i: any): number;
/**
 * Venus computes the visual magnitude of Venus.
 * Formula by G. Müller
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth,
 * and i the phase angle in radians.
 */
export function venus(r: any, Δ: any, i: any): number;
/**
 * Mars computes the visual magnitude of Mars.
 * Formula by G. Müller
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth,
 * and i the phase angle in radians.
 */
export function mars(r: any, Δ: any, i: any): number;
/**
 * Jupiter computes the visual magnitude of Jupiter.
 * Formula by G. Müller
 * Effect of phase not considered
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth.
 */
export function jupiter(r: any, Δ: any): number;
/**
 * Saturn computes the visual magnitude of Saturn.
 * Formula by G. Müller
 * Sun's altitude above the plane of the ring is not considered.
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth.
 * B is the Saturnicentric latitude of the Earth referred to the plane of
 * Saturn's ring.
 * ΔU (in radians) is the difference between the Saturnicentric longitudes
 * of the Sun and the Earth, measured in the plane of the ring.
 * You can use saturndisk.Disk() to obtain B and ΔU.
 */
export function saturn(r: any, Δ: any, B: any, ΔU: any): number;
/**
 * Uranus computes the visual magnitude of Uranus.
 * Formula by G. Müller
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth.
 */
export function uranus(r: any, Δ: any): number;
/**
 * Neptune computes the visual magnitude of Neptune.
 * Formulae by G. Müller
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth.
 */
export function neptune(r: any, Δ: any): number;
/**
 * Mercury84 computes the visual magnitude of Mercury.
 * The formula is that adopted in "Astronomical Almanac" in 1984.0
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth,
 * and i the phase angle in radians.
 */
export function mercury84(r: any, Δ: any, i: any): number;
/**
 * Venus84 computes the visual magnitude of Venus.
 * The formula is that adopted in "Astronomical Almanac" in 1984.0
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth,
 * and i the phase angle in radians.
 */
export function venus84(r: any, Δ: any, i: any): number;
/**
 * Mars84 computes the visual magnitude of Mars.
 * The formula is that adopted in "Astronomical Almanac" in 1984.0
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth,
 * and i the phase angle in radians.
 */
export function mars84(r: any, Δ: any, i: any): number;
/**
 * Jupiter84 computes the visual magnitude of Jupiter.
 * The formula is that adopted in "Astronomical Almanac" in 1984.0
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth,
 * and i the phase angle in radians.
 */
export function jupiter84(r: any, Δ: any, i: any): number;
/**
 * Saturn84 computes the visual magnitude of Saturn.
 * The formula is that adopted in "Astronomical Almanac" in 1984.0
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth.
 * B is the Saturnicentric latitude of the Earth referred to the plane of
 * Saturn's ring.
 * ΔU (in radians) is the difference between the Saturnicentric longitudes
 * of the Sun and the Earth, measured in the plane of the ring.
 */
export function saturn84(r: any, Δ: any, B: any, ΔU: any): number;
/**
 * Uranus84 computes the visual magnitude of Uranus.
 * The formula is that adopted in "Astronomical Almanac" in 1984.0
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth.
 */
export function uranus84(r: any, Δ: any): number;
/**
 * Neptune84 computes the visual magnitude of Neptune.
 * The formula is that adopted in "Astronomical Almanac" in 1984.0
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth.
 */
export function neptune84(r: any, Δ: any): number;
/**
 * Pluto84 computes the visual magnitude of Pluto.
 * The formula is that adopted in "Astronomical Almanac" in 1984.0
 *
 * Argument r is the planet's distance from the Sun, Δ the distance from Earth.
 */
export function pluto84(r: any, Δ: any): number;
declare namespace _default {
    export { phaseAngle };
    export { fraction };
    export { phaseAngle2 };
    export { phaseAngle3 };
    export { fractionVenus };
    export { mercury };
    export { venus };
    export { mars };
    export { jupiter };
    export { saturn };
    export { uranus };
    export { neptune };
    export { mercury84 };
    export { venus84 };
    export { mars84 };
    export { jupiter84 };
    export { saturn84 };
    export { uranus84 };
    export { neptune84 };
    export { pluto84 };
}
export default _default;
