/**
 * approxAnnualPrecession returns approximate annual precision in right
 * ascension and declination.
 *
 * The two epochs should be within a few hundred years.
 * The declinations should not be too close to the poles.
 *
 * @param {Equatorial} eqFrom
 * @param {Number} epochFrom - use `base.JDEToJulianYear(year)` to get epoch
 * @param {Number} epochTo - use `base.JDEToJulianYear(year)` to get epoch
 * @returns {Object}
 *  {sexa.HourAngle} seconds of right ascension
 *  {sexa.Angle} seconds of Declination
 */
export function approxAnnualPrecession(eqFrom: Equatorial, epochFrom: number, epochTo: number): any;
/**
 * @param {Number} epochFrom - use `base.JDEToJulianYear(year)` to get epoch
 * @param {Number} epochTo - use `base.JDEToJulianYear(year)` to get epoch
 * @returns {Number[]}
 */
export function mn(epochFrom: number, epochTo: number): number[];
/**
 * ApproxPosition uses ApproxAnnualPrecession to compute a simple and quick
 * precession while still considering proper motion.
 *
 * @param {Equatorial} eqFrom
 * @param {Number} epochFrom
 * @param {Number} epochTo
 * @param {Number} mα - in radians
 * @param {Number} mδ - in radians
 * @returns {Equatorial} eqTo
 */
export function approxPosition(eqFrom: Equatorial, epochFrom: number, epochTo: number, mα: number, mδ: number): Equatorial;
/**
 * Position precesses equatorial coordinates from one epoch to another,
 * including proper motions.
 *
 * If proper motions are not to be considered or are not applicable, pass 0, 0
 * for mα, mδ
 *
 * Both eqFrom and eqTo must be non-nil, although they may point to the same
 * struct.  EqTo is returned for convenience.
 * @param {Equatorial} eqFrom
 * @param {Number} epochFrom
 * @param {Number} epochTo
 * @param {Number} mα - in radians
 * @param {Number} mδ - in radians
 * @returns {Equatorial} [eqTo]
 */
export function position(eqFrom: Equatorial, epochFrom: number, epochTo: number, mα: number, mδ: number): Equatorial;
/**
 * eclipticPosition precesses ecliptic coordinates from one epoch to another,
 * including proper motions.
 * While eclFrom is given as ecliptic coordinates, proper motions mα, mδ are
 * still expected to be equatorial.  If proper motions are not to be considered
 * or are not applicable, pass 0, 0.
 * Both eclFrom and eclTo must be non-nil, although they may point to the same
 * struct.  EclTo is returned for convenience.
 *
 * @param {Ecliptic} eclFrom,
 * @param {Number} epochFrom
 * @param {HourAngle} [mα]
 * @param {Angle} [mδ]
 * @returns {Ecliptic} eclTo
 */
export function eclipticPosition(eclFrom: Ecliptic, epochFrom: number, epochTo: any, mα?: HourAngle, mδ?: Angle): Ecliptic;
/**
 * @param {Number} mα - anual proper motion (ra)
 * @param {Number} mδ - anual proper motion (dec)
 * @param {Number} epoch
 * @param {Ecliptic} ecl
 * @returns {Ecliptic} {lon, lat}
 */
export function properMotion(mα: number, mδ: number, epoch: number, ecl: Ecliptic): Ecliptic;
/**
 * ProperMotion3D takes the 3D equatorial coordinates of an object
 * at one epoch and computes its coordinates at a new epoch, considering
 * proper motion and radial velocity.
 *
 * Radial distance (r) must be in parsecs, radial velocitiy (mr) in
 * parsecs per year.
 *
 * Both eqFrom and eqTo must be non-nil, although they may point to the same
 * struct.  EqTo is returned for convenience.
 *
 * @param {Equatorial} eqFrom,
 * @param {Number} epochFrom
 * @param {Number} r
 * @param {Number} mr
 * @param {HourAngle} mα
 * @param {Angle} mδ
 * @returns {Equatorial} eqTo
 */
export function properMotion3D(eqFrom: Equatorial, epochFrom: number, epochTo: any, r: number, mr: number, mα: HourAngle, mδ: Angle): Equatorial;
/**
 * Precessor represents precession from one epoch to another.
 *
 * Construct with NewPrecessor, then call method Precess.
 * After construction, Precess may be called multiple times to precess
 * different coordinates with the same initial and final epochs.
 */
export class Precessor {
    /**
     * constructs a Precessor object and initializes it to precess
     * coordinates from epochFrom to epochTo.
     * @param {Number} epochFrom
     * @param {Number} epochTo
     */
    constructor(epochFrom: number, epochTo: number);
    ζ: number;
    z: number;
    sθ: number;
    cθ: number;
    /**
     * Precess precesses coordinates eqFrom, leaving result in eqTo.
     *
     * @param {Equatorial} eqFrom
     * @returns {Equatorial} eqTo
     */
    precess(eqFrom: Equatorial): Equatorial;
}
/**
 * EclipticPrecessor represents precession from one epoch to another.
 *
 * Construct with NewEclipticPrecessor, then call method Precess.
 * After construction, Precess may be called multiple times to precess
 * different coordinates with the same initial and final epochs.
 */
export class EclipticPrecessor {
    /**
     * constructs an EclipticPrecessor object and initializes
     * it to precess coordinates from epochFrom to epochTo.
     * @param {Number} epochFrom
     * @param {Number} epochTo
     */
    constructor(epochFrom: number, epochTo: number);
    π: number;
    p: number;
    sη: number;
    cη: number;
    /**
     * EclipticPrecess precesses coordinates eclFrom, leaving result in eclTo.
     *
     * The same struct may be used for eclFrom and eclTo.
     * EclTo is returned for convenience.
     * @param {Ecliptic} eclFrom
     * @returns {Ecliptic} [eclTo]
     */
    precess(eclFrom: Ecliptic): Ecliptic;
    /**
     * ReduceElements reduces orbital elements of a solar system body from one
     * equinox to another.
     *
     * This function is described in chapter 24, but is located in this
     * package so it can be a method of EclipticPrecessor.
     *
     * @param {Elements} eFrom
     * @returns {Elements} eTo
     */
    reduceElements(eFrom: Elements): Elements;
}
declare namespace _default {
    export { approxAnnualPrecession };
    export { mn };
    export { approxPosition };
    export { Precessor };
    export { position };
    export { EclipticPrecessor };
    export { eclipticPosition };
    export { properMotion };
    export { properMotion3D };
}
export default _default;
import { Equatorial } from './coord.js';
import { Ecliptic } from './coord.js';
import { HourAngle } from './sexagesimal.js';
import { Angle } from './sexagesimal.js';
import { Elements } from './elementequinox.js';
