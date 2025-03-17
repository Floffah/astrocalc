/**
 * Physical returns quantities useful for physical observation of the Moon.
 *
 * Returned l, b are librations in selenographic longitude and latitude.
 * They represent combined optical and physical librations.  Topocentric
 * librations are not considered.
 *
 * Returned P is the the position angle of the Moon's axis of rotation.
 *
 * Returned l0, b0 are the selenographic coordinates of the Sun.
 *
 * Returned values all in radians.

 * @param {number} jde - Julian ephemeris day
 * @param {Planet} earth - VSOP87 Planet Earth
 * @return {Array}
 *    {base.Coord} cMoon - selenographic longitude, latitude of the Moon
 *    {number} P - position angle of the Moon's axis of rotation
 *    {base.Coord} cSun - selenographic longitude, latitude of the Sun.
 */
export function physical(jde: number, earth: Planet): any[];
/**
 * SunAltitude returns altitude of the Sun above the lunar horizon.
 *
 * @param {Coord} cOnMoon - selenographic longitude and latitude of a site on the Moon
 * @param {Coord} cSun - selenographic coordinates of the Sun (as returned by physical(), for example.)
 * @return altitude in radians.
 */
export function sunAltitude(cOnMoon: Coord, cSun: Coord): number;
/**
 * Sunrise returns time of sunrise for a point on the Moon near the given date.
 *
 * @param {Coord} cOnMoon - selenographic longitude and latitude of a site on the Moon
 * @param {Number} jde - Julian ephemeris day
 * @param {Planet} earth - VSOP87 Planet Earth
 * @return time of sunrise as a jde nearest the given jde.
 */
export function sunrise(cOnMoon: Coord, jde: number, earth: Planet): number;
/**
 * Sunset returns time of sunset for a point on the Moon near the given date.
 *
 * @param {Coord} cOnMoon - selenographic longitude and latitude of a site on the Moon
 * @param {Number} jde - Julian ephemeris day
 * @param {Planet} earth - VSOP87 Planet Earth
 * @return time of sunset as a jde nearest the given jde.
 */
export function sunset(cOnMoon: Coord, jde: number, earth: Planet): number;
/**
 * Quantities computed for a jde and used in computing return values of
 * physical().  Computations are broken into several methods to organize
 * the code.
 */
export class Moon {
    constructor(jde: any);
    jde: any;
    Δψ: number;
    F: number;
    Ω: number;
    ε: number;
    sε: number;
    cε: number;
    ρ: number;
    σ: number;
    τ: number;
    /**
     * lib() curiously serves for computing both librations and solar coordinates,
     * depending on the coordinates λ, β passed in.  Quantity A not described in
     * the book, but clearly depends on the λ, β of the current context and so
     * does not belong in the moon struct.  Instead just return it from optical
     * and pass it along to physical.
     */
    lib(λ: any, β: any): number[];
    optical(λ: any, β: any): number[];
    physical(A: any, b_: any): number[];
    pa(λ: any, β: any, b: any): number;
    sun(λ: any, β: any, Δ: any, earth: any): number[];
}
export namespace selenographic {
    let archimedes: Coord;
    let aristarchus: Coord;
    let aristillus: Coord;
    let aristoteles: Coord;
    let arzachel: Coord;
    let autolycus: Coord;
    let billy: Coord;
    let birt: Coord;
    let campanus: Coord;
    let censorinus: Coord;
    let clavius: Coord;
    let copernicus: Coord;
    let delambre: Coord;
    let dionysius: Coord;
    let endymion: Coord;
    let eratosthenes: Coord;
    let eudoxus: Coord;
    let fracastorius: Coord;
    let fraMauro: Coord;
    let gassendi: Coord;
    let goclenius: Coord;
    let grimaldi: Coord;
    let harpalus: Coord;
    let horrocks: Coord;
    let kepler: Coord;
    let langrenus: Coord;
    let lansberg: Coord;
    let letronne: Coord;
    let macrobius: Coord;
    let manilius: Coord;
    let menelaus: Coord;
    let messier: Coord;
    let petavius: Coord;
    let pico: Coord;
    let pitatus: Coord;
    let piton: Coord;
    let plato: Coord;
    let plinius: Coord;
    let posidonius: Coord;
    let proclus: Coord;
    let ptolemeusA: Coord;
    let pytheas: Coord;
    let reinhold: Coord;
    let riccioli: Coord;
    let schickard: Coord;
    let schiller: Coord;
    let tauruntius: Coord;
    let theophilus: Coord;
    let timocharis: Coord;
    let tycho: Coord;
    let vitruvius: Coord;
    let walter: Coord;
}
declare namespace _default {
    export { physical };
    export { Moon };
    export { sunAltitude };
    export { sunrise };
    export { sunset };
    export { selenographic };
}
export default _default;
import { Planet } from './planetposition.js';
import { Coord } from './base.js';
