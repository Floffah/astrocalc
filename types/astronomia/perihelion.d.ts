/**
 * Perihelion returns an approximate jde of the perihelion event nearest the given time.
 *
 * @param {planetsEnum} p - planet constant from above
 * @param {Number} year - year number indicating a time near the perihelion event.
 * @returns {Number} jde - time of the event
 */
export function perihelion(p: planetsEnum, year: number): number;
/**
 * Aphelion returns an approximate jde of the aphelion event nearest the given time.
 *
 * @param {planetsEnum} p - planet constant from above
 * @param {Number} year - year number indicating a time near the aphelion event.
 * @returns {Number} jde - time of the event
 */
export function aphelion(p: planetsEnum, year: number): number;
/**
 * Perihelion2 returns the perihelion event nearest the given time.
 *
 * @param {Planet} planet - VSOP87 planet (EMBary is not allowed)
 * @param {Number} year - (float) decimal year number near the perihelion event
 * @param {Number} precision - desired precision of the time result, in days
 * @param {Function} [cb] - callback function for asynchronous processing `cb([jde, r])`
 * @returns {Array} [jde, r]
 *   {Number} jde - time of the event
 *   {Number} r - the distance of the planet from the Sun in AU.
 */
export function perihelion2(planet: Planet, year: number, precision: number, cb?: Function): any[];
/**
 * Aphelion2 returns the aphelion event nearest the given time.
 *
 * @param {Planet} planet - VSOP87 planet (EMBary is not allowed)
 * @param {Number} year - (float) decimal year number near the perihelion event
 * @param {Number} precision - desired precision of the time result, in days
 * @param {Function} [cb] - callback function for asynchronous processing `cb([jde, r])`
 * @returns {Array} [jde, r]
 *   {Number} jde - time of the event
 *   {Number} r - the distance of the planet from the Sun in AU.
 */
export function aphelion2(planet: Planet, year: number, precision: number, cb?: Function): any[];
export const mercury: number;
export const venus: number;
export const earth: number;
export const mars: number;
export const jupiter: number;
export const saturn: number;
export const uranus: number;
export const neptune: number;
export const embary: number;
declare namespace _default {
    export { mercury };
    export { venus };
    export { earth };
    export { mars };
    export { jupiter };
    export { saturn };
    export { uranus };
    export { neptune };
    export { embary };
    export { perihelion };
    export { aphelion };
    export { perihelion2 };
    export { aphelion2 };
}
export default _default;
/**
 * Planet constants for first argument of Perihelion and Aphelion functions.
 */
type planetsEnum = number;
declare namespace planetsEnum {
    let mercury_1: number;
    export { mercury_1 as mercury };
    let venus_1: number;
    export { venus_1 as venus };
    let earth_1: number;
    export { earth_1 as earth };
    let mars_1: number;
    export { mars_1 as mars };
    let jupiter_1: number;
    export { jupiter_1 as jupiter };
    let saturn_1: number;
    export { saturn_1 as saturn };
    let uranus_1: number;
    export { uranus_1 as uranus };
    let neptune_1: number;
    export { neptune_1 as neptune };
    let embary_1: number;
    export { embary_1 as embary };
}
import { Planet } from './planetposition.js';
