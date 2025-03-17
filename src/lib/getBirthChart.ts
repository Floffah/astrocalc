import * as astronomia from "astronomia";
import data from "astronomia/data";
import { ok } from "neverthrow";

import { deg, rad } from "@/lib/degrees.ts";
import { getZodiacSignFromDegrees } from "@/lib/getZodiac.ts";

function getSigns(
    jde: number,
    latitude: astronomia.sexagesimal.Angle,
    longitude: astronomia.sexagesimal.Angle,
) {
    const sunVsopCoord = astronomia.solar.trueVSOP87(
        new astronomia.planetposition.Planet(data.earth),
        jde,
    );
    const sunLongitude = deg(sunVsopCoord.lon);
    const sunSign = getZodiacSignFromDegrees(sunLongitude);

    if (sunSign.isErr()) {
        return sunSign;
    }

    const moonPosition = astronomia.moonposition.position(jde);
    const moonLongitude = deg(moonPosition.lon);
    const moonSign = getZodiacSignFromDegrees(moonLongitude);

    if (moonSign.isErr()) {
        return moonSign;
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

    const ascendantSign = getZodiacSignFromDegrees(ascDeg);

    if (ascendantSign.isErr()) {
        return ascendantSign;
    }

    return ok({
        sun: sunSign.value,
        moon: moonSign.value,
        ascendant: ascendantSign.value,
    });
}

export function getBirthChart(date: Date, latitude: number, longitude: number) {
    const jde = astronomia.julian.DateToJDE(date);

    const latAngle = new astronomia.sexagesimal.Angle(rad(latitude));
    const lonAngle = new astronomia.sexagesimal.Angle(rad(longitude));

    const signs = getSigns(jde, latAngle, lonAngle);

    if (signs.isErr()) {
        return signs;
    }

    return ok({
        signs: signs.value,
    });
}
