import * as astronomia from "astronomia";
import { ok } from "neverthrow";
import sweph from "sweph";

import { rad } from "@/lib/degrees.ts";
import { getZodiacFromLongitude } from "@/lib/zodiac.ts";

export function calculateMidheaven(jde: number) {
    const obliquity = astronomia.nutation.meanObliquity(jde);
    const srt = astronomia.sidereal.mean(jde) / 240;

    return ok(
        (Math.atan2(
            Math.sin(rad(srt)),
            Math.cos(rad(srt)) * Math.cos(obliquity),
        ) *
            (180 / Math.PI)) %
            360,
    );
}

export function getHouseCusps(
    jde: number,
    latitude: astronomia.sexagesimal.Angle,
    longitude: astronomia.sexagesimal.Angle,
) {
    const swissEphHouseCusps = sweph.houses(
        jde,
        latitude.deg(),
        longitude.deg(),
        "P",
    );

    const houses = swissEphHouseCusps.data.houses.map((house, id) => {
        return {
            id,
            number: id + 1,
            cusp: getZodiacFromLongitude(house),
        };
    });

    return ok(houses);
}

export function calculateHouses(
    jde: number,
    latitude: astronomia.sexagesimal.Angle,
    longitude: astronomia.sexagesimal.Angle,
) {
    const cusps = getHouseCusps(jde, latitude, longitude);

    if (cusps.isErr()) {
        return cusps;
    }

    return cusps;
}
