/**
 * Position returns rectangular coordinates referenced to the mean equinox of date.
 * @param {planetposition.Planet} earth - VSOP87Planet Earth
 * @param {Number} jde - Julian ephemeris day
 * @return {object} rectangular coordinates
 *   {Number} x
 *   {Number} y
 *   {Number} z
 */
export function position(earth: planetposition.Planet, jde: number): object;
/**
 * LongitudeJ2000 returns geometric longitude referenced to equinox J2000.
 * @param {planetposition.Planet} earth - VSOP87Planet Earth
 * @param {Number} jde - Julian ephemeris day
 * @return {Number} geometric longitude referenced to equinox J2000.
 */
export function longitudeJ2000(earth: planetposition.Planet, jde: number): number;
/**
 * PositionJ2000 returns rectangular coordinates referenced to equinox J2000.
 * @param {planetposition.Planet} earth - VSOP87Planet Earth
 * @param {Number} jde - Julian ephemeris day
 * @return {object} rectangular coordinates
 *   {Number} x
 *   {Number} y
 *   {Number} z
 */
export function positionJ2000(earth: planetposition.Planet, jde: number): object;
export function xyz(earth: any, jde: any): {
    x: number;
    y: number;
    z: number;
};
/**
 * PositionB1950 returns rectangular coordinates referenced to B1950.
 *
 * Results are referenced to the mean equator and equinox of the epoch B1950
 * in the FK5 system, not FK4.
 *
 * @param {planetposition.Planet} earth - VSOP87Planet Earth
 * @param {Number} jde - Julian ephemeris day
 * @return {object} rectangular coordinates
 *   {Number} x
 *   {Number} y
 *   {Number} z
 */
export function positionB1950(earth: planetposition.Planet, jde: number): object;
/**
 * PositionEquinox returns rectangular coordinates referenced to an arbitrary epoch.
 *
 * Position will be computed for given Julian day "jde" but referenced to mean
 * equinox "epoch" (year).
 *
 * @param {planetposition.Planet} earth - VSOP87Planet Earth
 * @param {Number} jde - Julian ephemeris day
 * @param {Number} epoch
 * @return {object} rectangular coordinates
 *   {Number} x
 *   {Number} y
 *   {Number} z
 */
export function positionEquinox(earth: planetposition.Planet, jde: number, epoch: number): object;
declare namespace _default {
    export { position };
    export { longitudeJ2000 };
    export { positionJ2000 };
    export { xyz };
    export { positionB1950 };
    export { positionEquinox };
}
export default _default;
