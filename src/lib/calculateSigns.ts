import * as astronomia from "astronomia";
import data from "astronomia/data";
import { ok } from "neverthrow";

import type { ZodiacMoonSignObject, ZodiacSignObject } from "@/defs";
import { deg } from "@/lib/degrees.ts";
import { getMoonPhase } from "@/lib/getMoonElongation.ts";
import { getZodiacSignCusp, getZodiacSignForDegrees } from "@/lib/zodiac.ts";

export function calculateSigns(
    jde: number,
    latitude: astronomia.sexagesimal.Angle,
    longitude: astronomia.sexagesimal.Angle,
) {
    const sunVsopCoord = astronomia.solar.trueVSOP87(
        new astronomia.planetposition.Planet(data.earth),
        jde,
    );
    const sunLongitude = deg(sunVsopCoord.lon);
    const sunSign = getZodiacSignForDegrees(sunLongitude);
    const sunCusp = getZodiacSignCusp(sunLongitude);

    if (sunSign.isErr()) {
        return sunSign;
    }
    if (sunCusp.isErr()) {
        return sunCusp;
    }

    const moonPosition = astronomia.moonposition.position(jde);
    const moonLongitude = deg(moonPosition.lon);
    const moonSign = getZodiacSignForDegrees(moonLongitude);
    const moonCusp = getZodiacSignCusp(moonLongitude);
    const moonSunDiff = Math.abs(moonLongitude - sunLongitude);
    const moonElongation = moonSunDiff > 180 ? 360 - moonSunDiff : moonSunDiff;
    const moonPhase = getMoonPhase(moonElongation);

    if (moonSign.isErr()) {
        return moonSign;
    }
    if (moonCusp.isErr()) {
        return moonCusp;
    }

    const obliquity = astronomia.nutation.meanObliquity(jde);
    const sidereal = astronomia.sidereal.mean(jde);

    const thetaUtc = new astronomia.sexagesimal.Time(sidereal).sec();
    const lonSec = (longitude.deg() / 15) * 3600;

    const thetaLoc = new astronomia.sexagesimal.Time(thetaUtc + lonSec).rad();

    const ascRad = Math.atan2(
        Math.cos(thetaLoc),
        -(
            Math.sin(thetaLoc) * Math.cos(obliquity) +
            Math.tan(latitude.rad()) * Math.sin(obliquity)
        ),
    );
    const ascDeg = (deg(ascRad) + 360) % 360;

    const ascendantSign = getZodiacSignForDegrees(ascDeg);
    const ascendantCusp = getZodiacSignCusp(ascDeg);

    if (ascendantSign.isErr()) {
        return ascendantSign;
    }
    if (ascendantCusp.isErr()) {
        return ascendantCusp;
    }

    return ok({
        sun: {
            value: sunSign.value,
            degree: sunLongitude,
            cuspWarning: sunCusp.value,
        } satisfies ZodiacSignObject,
        moon: {
            value: moonSign.value,
            degree: moonLongitude,
            cuspWarning: moonCusp.value,
            phase: moonPhase,
            isVoidOfCourse: false, // TODO: calculate moon VoC properly
        } satisfies ZodiacMoonSignObject,
        ascendant: {
            value: ascendantSign.value,
            degree: ascDeg,
            cuspWarning: ascendantCusp.value,
        } satisfies ZodiacSignObject,
    });
}
