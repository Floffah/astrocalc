/**
 * Mean computes some intermediate values for a mean planetary configuration
 * given a year and a row of coefficients from Table 36.A, p. 250.0
 */
export function mean(y: any, a: any): any[];
/**
 * Sum computes a sum of periodic terms.
 */
export function sum(T: any, M: any, c: any): number;
/**
 * ms returns a mean time corrected by a sum.
 */
export function ms(y: any, a: any, c: any): any;
/**
 * MercuryInfConj returns the time of an inferior conjunction of Mercury.
 *
 * Result is time (as a jde) of the event nearest the given time (as a
 * decimal year.)
 */
export function mercuryInfConj(y: any): any;
/**
 * MercurySupConj returns the time of a superior conjunction of Mercury.
 *
 * Result is time (as a jde) of the event nearest the given time (as a
 * decimal year.)
 */
export function mercurySupConj(y: any): any;
/**
 * VenusInfConj returns the time of an inferior conjunction of Venus.
 *
 * Result is time (as a jde) of the event nearest the given time (as a
 * decimal year.)
 */
export function venusInfConj(y: any): any;
/**
 * MarsOpp returns the time of an opposition of Mars.
 *
 * Result is time (as a jde) of the event nearest the given time (as a
 * decimal year.)
 */
export function marsOpp(y: any): any;
/**
 * SumA computes the sum of periodic terms with "additional angles"
 */
export function sumA(T: any, M: any, c: any, aa: any): number;
/**
 * Msa returns a mean time corrected by a sum.
 */
export function msa(y: any, a: any, c: any, aa: any): any;
/**
 * JupiterOpp returns the time of an opposition of Jupiter.
 *
 * Result is time (as a jde) of the event nearest the given time (as a
 * decimal year.)
 */
export function jupiterOpp(y: any): any;
/**
 * SaturnOpp returns the time of an opposition of Saturn.
 *
 * Result is time (as a jde) of the event nearest the given time (as a
 * decimal year.)
 */
export function saturnOpp(y: any): any;
/**
 * SaturnConj returns the time of a conjunction of Saturn.
 *
 * Result is time (as a jde) of the event nearest the given time (as a
 * decimal year.)
 */
export function saturnConj(y: any): any;
/**
 * UranusOpp returns the time of an opposition of Uranus.
 *
 * Result is time (as a jde) of the event nearest the given time (as a
 * decimal year.)
 */
export function uranusOpp(y: any): any;
/**
 * NeptuneOpp returns the time of an opposition of Neptune.
 *
 * Result is time (as a jde) of the event nearest the given time (as a
 * decimal year.)
 */
export function neptuneOpp(y: any): any;
/**
 * El computes time and elongation of a greatest elongation event.
 */
export function el(y: any, a: any, t: any, e: any): any[];
/**
 * MercuryEastElongation returns the time and elongation of a greatest eastern elongation of Mercury.
 *
 * Result is time (as a jde) of the event nearest the given time (as a
 * decimal year.)
 */
export function mercuryEastElongation(y: any): any[];
/**
 * MercuryWestElongation returns the time and elongation of a greatest western elongation of Mercury.
 *
 * Result is time (as a jde) of the event nearest the given time (as a
 * decimal year.)
 */
export function mercuryWestElongation(y: any): any[];
export function marsStation2(y: any): any;
declare namespace _default {
    export { mean };
    export { sum };
    export { ms };
    export { mercuryInfConj };
    export { mercurySupConj };
    export { venusInfConj };
    export { marsOpp };
    export { sumA };
    export { msa };
    export { jupiterOpp };
    export { saturnOpp };
    export { saturnConj };
    export { uranusOpp };
    export { neptuneOpp };
    export { el };
    export { mercuryEastElongation };
    export { mercuryWestElongation };
    export { marsStation2 };
}
export default _default;
