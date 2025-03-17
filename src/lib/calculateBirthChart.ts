import * as astronomia from "astronomia";
import data from "astronomia/data";
import { ok } from "neverthrow";

import { deg, rad } from "@/lib/degrees.ts";
import {
    getZodiacSignCusp,
    getZodiacSignForDegrees,
} from "@/lib/getZodiacSignForDegrees.ts";

function calculateSigns(
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
        },
        moon: {
            value: moonSign.value,
            degree: moonLongitude,
            cuspWarning: moonCusp.value,
        },
        ascendant: {
            value: ascendantSign.value,
            degree: ascDeg,
            cuspWarning: ascendantCusp.value,
        },
    });
}

export function calculateBirthChart(
    date: Date,
    latitude: number,
    longitude: number,
) {
    const jde = astronomia.julian.DateToJDE(date);

    const latAngle = new astronomia.sexagesimal.Angle(rad(latitude));
    const lonAngle = new astronomia.sexagesimal.Angle(rad(longitude));

    const signs = calculateSigns(jde, latAngle, lonAngle);

    if (signs.isErr()) {
        return signs;
    }

    return ok({
        signs: signs.value,
    });
}
