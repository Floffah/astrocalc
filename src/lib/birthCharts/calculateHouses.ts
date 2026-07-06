import * as astronomia from "astronomia";
import sweph from "sweph";

import { getZodiacFromLongitude } from "@/lib/zodiac.ts";

export function calculateHouses(
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

    return swissEphHouseCusps.data.houses.map((house, id) => {
        return {
            id,
            number: id + 1,
            cusp: getZodiacFromLongitude(house),
        };
    });
}
