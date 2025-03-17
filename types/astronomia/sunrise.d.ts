export class Sunrise {
    /**
     * Computes time of sunrise, sunset for a given day `date` of an observer on earth given by latitude and longitude.
     * Methods may return `undefined` instead of `julian.Calendar` for latitudes very near the poles.
     * @param {julian.Calendar} date - calendar date
     * @param {number} lat - latitude of observer in the range of (-89.6, 89.6)
     * @param {number} lon - longitude of observer (measured positively westwards, New York = 40.7° lat, 74° lon)
     * @param {number} [refraction] - optional refraction
     */
    constructor(date: julian.Calendar, lat: number, lon: number, refraction?: number);
    date: julian.Calendar;
    jde: any;
    lat: number;
    lon: number;
    refraction: number;
    _calcNoon(jde: any): number;
    _calcRiseOrSet(jde: any, h0: any, isSet: any): number;
    _calcPolarDayNight(h0: any, isSet: any, step: any): import("./julian.js").Calendar;
    _calc(h0: any, isSet: any): import("./julian.js").Calendar;
    /**
     * time of solar transit
     * @return {julian.Calendar} time of noon
     */
    noon(): julian.Calendar;
    /**
     * Solar limb appears over the easter horizon in the morning
     * @return {julian.Calendar} time of sunrise
     */
    rise(): julian.Calendar;
    /**
     * @return {julian.Calendar} time of sunset
     * Solar limb disappears on the western horizon in the evening
     */
    set(): julian.Calendar;
    /**
     * Solar limb is fully visible at the easter horizon
     * @return {julian.Calendar} time of sunrise end
     */
    riseEnd(): julian.Calendar;
    /**
     * Solar limb starts disappearing on the western horizon in the evening
     * @return {julian.Calendar} time of sunset start
     */
    setStart(): julian.Calendar;
    /**
     * Dawn, there is still enough light for objects to be distinguishable,
     * @return {julian.Calendar} time of dawn
     */
    dawn(): julian.Calendar;
    /**
     * Dusk, there is still enough light for objects to be distinguishable
     * Bright stars and planets are visible by naked eye
     * @return {julian.Calendar} time of dusk
     */
    dusk(): julian.Calendar;
    /**
     * nautical dawn - Horizon gets visible by naked eye
     * @return {julian.Calendar} time of nautical dawn
     */
    nauticalDawn(): julian.Calendar;
    /**
     * nautical dusk - Horizon is no longer visible by naked eye
     * @return {julian.Calendar} time of nautical dusk
     */
    nauticalDusk(): julian.Calendar;
    /**
     * night starts - No sunlight illumination of the sky, such no intereferance
     * with astronomical observations.
     * @return {julian.Calendar} time of start of night
     */
    nightStart(): julian.Calendar;
    /**
     * night end - Sunlight starts illumination of the sky and interferes
     * with astronomical observations.
     * @return {julian.Calendar} time of end of night
     */
    nightEnd(): julian.Calendar;
    /**
     * Start of "golden hour" before sunset
     * @return {julian.Calendar} time of start of golden hour
     */
    goldenHourStart(): julian.Calendar;
    /**
     * End of "golden hour" after sunrise
     * @return {julian.Calendar} time of end of golden hour
     */
    goldenHourEnd(): julian.Calendar;
}
declare namespace _default {
    export { Sunrise };
}
export default _default;
