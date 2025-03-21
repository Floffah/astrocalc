import { MoonPhase } from "@/defs/enums.ts";

export function getMoonPhase(elongation: number) {
    if (elongation < 22.5) return MoonPhase.NewMoon;
    if (elongation < 67.5) return MoonPhase.WaxingCrescent;
    if (elongation < 112.5) return MoonPhase.FirstQuarter;
    if (elongation < 157.5) return MoonPhase.WaxingGibbous;
    if (elongation < 202.5) return MoonPhase.FullMoon;
    if (elongation < 247.5) return MoonPhase.WaningGibbous;
    if (elongation < 292.5) return MoonPhase.LastQuarter;
    return MoonPhase.WaningCrescent;
}
