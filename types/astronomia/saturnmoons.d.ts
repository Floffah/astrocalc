/**
 * Positions returns positions of the eight major moons of Saturn.
 *
 * Results returned in argument pos, which must not be undefined.
 *
 * Result units are Saturn radii.
 *
 * @param {number} jde - Julian ephemeris day
 * @param {Planet} earth - VSOP87 planet Earth // eslint-disable-line no-unused-vars
 * @param {Planet} saturn - VSOP87 planet Saturn // eslint-disable-line no-unused-vars
 * @return {XY[]} Array of Moon Positions in `XY`
 *   Use `M.mimas ... M.iapetus` to resolve to Moon and its position at `jde`
 */
export function positions(jde: number, earth: Planet, saturn: Planet): XY[];
export function Qs(jde: any): this;
export class Qs {
    constructor(jde: any);
    t1: number;
    t2: number;
    t3: number;
    t4: number;
    t5: number;
    t6: number;
    t7: number;
    t8: number;
    t9: number;
    t10: number;
    t11: number;
    W0: number;
    W1: number;
    W2: number;
    W3: number;
    W4: number;
    W5: number;
    W6: number;
    W7: number;
    W8: number;
    s1: number;
    c1: number;
    s2: number;
    c2: number;
    e1: number;
    sW0: number;
    s3W0: number;
    s5W0: number;
    sW1: number;
    sW2: number;
    sW3: number;
    cW3: number;
    sW4: number;
    cW4: number;
    sW7: number;
    cW7: number;
    mimas(): R4;
    enceladus(): R4;
    tethys(): R4;
    dione(): R4;
    rhea(): R4;
    subr(λʹ: any, p: any, e: any, a: any, Ω: any, i: any): R4;
    titan(): R4;
    hyperion(): R4;
    iapetus(): R4;
}
export const mimas: 0;
export const enceladus: 1;
export const tethys: 2;
export const dione: 3;
export const rhea: 4;
export const titan: 5;
export const hyperion: 6;
export const iapetus: 7;
declare namespace _default {
    export { mimas };
    export { enceladus };
    export { tethys };
    export { dione };
    export { rhea };
    export { titan };
    export { hyperion };
    export { iapetus };
    export { positions };
    export { Qs };
}
export default _default;
import { Planet } from './planetposition.js';
/**
 * XY holds coordinates returned from positions().
 */
declare function XY(x: any, y: any): void;
declare class XY {
    /**
     * XY holds coordinates returned from positions().
     */
    constructor(x: any, y: any);
    x: any;
    y: any;
}
declare function R4(λ: any, r: any, γ: any, Ω: any): void;
declare class R4 {
    constructor(λ: any, r: any, γ: any, Ω: any);
    λ: any;
    r: any;
    γ: any;
    Ω: any;
}
