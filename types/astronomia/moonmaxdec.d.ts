/**
 * North computes the maximum northern declination of the Moon near a given date.
 *
 * Argument year is a decimal year specifying a date near the event.
 *
 * Returned is the jde of the event nearest the given date and the declination
 * of the Moon at that time.
 */
export function north(y: any): {
    jde: number;
    dec: number;
};
/**
 * South computes the maximum southern declination of the Moon near a given date.
 *
 * Argument year is a decimal year specifying a date near the event.
 *
 * Returned is the jde of the event nearest the given date and the declination
 * of the Moon at that time.
 */
export function south(y: any): {
    jde: number;
    dec: number;
};
declare namespace _default {
    export { north };
    export { south };
}
export default _default;
