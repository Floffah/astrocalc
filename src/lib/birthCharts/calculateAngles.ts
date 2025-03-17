import * as astronomia from "astronomia";
import { Result, ok } from "neverthrow";
import sweph from "sweph";

import { getZodiacFromLongitude } from "@/lib/zodiac.ts";

export function getAnglesForDate(
    jde: number,
    lat: astronomia.sexagesimal.Angle,
    lon: astronomia.sexagesimal.Angle,
) {
    const houses = sweph.houses(jde, lat.deg(), lon.deg(), "P");

    const houseCusps = houses.data.houses;
    const angles = [
        { id: 100, name: "Ascendant", longitude: houseCusps[0]! },
        { id: 109, name: "MidHeaven", longitude: houseCusps[9]! },
        {
            id: 108,
            name: "Descendant",
            longitude: (houseCusps[0]! + 180) % 360,
        },
        { id: 107, name: "Nadir", longitude: (houseCusps[9]! + 180) % 360 },
    ];

    return Result.combine(
        angles.map((angle) => {
            const zodiacInfo = getZodiacFromLongitude(angle.longitude);

            return ok({
                id: angle.id,
                name: angle.name,
                longitude: angle.longitude,
                is_retrograde: false,
                degree: zodiacInfo.degree,
                house_number: getHouseForPlanet(angle.longitude, houseCusps),
                zodiac: zodiacInfo.zodiac,
            });
        }),
    );
}

function getHouseForPlanet(longitude: number, houses: number[]) {
    for (let i = 0; i < houses.length; i++) {
        const nextHouse = houses[(i + 1) % 12]!;
        if (
            longitude >= houses[i]! &&
            (longitude < nextHouse || nextHouse < houses[i]!)
        ) {
            return i + 1;
        }
    }
    return 1;
}
