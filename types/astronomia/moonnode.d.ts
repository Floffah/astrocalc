/**
 * Ascending returns the date of passage of the Moon through an ascending node.
 *
 * @param {Number} year - decimal year specifying a date near the event.
 * @returns {Number} jde of the event nearest the given date.
 */
export function ascending(year: number): number;
/**
 * Descending returns the date of passage of the Moon through a descending node.
 *
 * @param {Number} year - decimal year specifying a date near the event.
 * @returns {Number} jde of the event nearest the given date.
 */
export function descending(year: number): number;
declare namespace _default {
    export { ascending };
    export { descending };
}
export default _default;
