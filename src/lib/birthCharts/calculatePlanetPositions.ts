import * as astronomia from "astronomia";
import { Result, err, ok } from "neverthrow";
import sweph from "sweph";

import { getZodiacFromLongitude } from "@/lib/zodiac.ts";

export const PLANETS = [
    { id: 0, name: "Sun", flag: sweph.constants.SE_SUN },
    { id: 1, name: "Moon", flag: sweph.constants.SE_MOON },
    { id: 2, name: "Mercury", flag: sweph.constants.SE_MERCURY },
    { id: 3, name: "Venus", flag: sweph.constants.SE_VENUS },
    { id: 4, name: "Mars", flag: sweph.constants.SE_MARS },
    { id: 5, name: "Jupiter", flag: sweph.constants.SE_JUPITER },
    { id: 6, name: "Saturn", flag: sweph.constants.SE_SATURN },
    { id: 7, name: "Uranus", flag: sweph.constants.SE_URANUS },
    { id: 8, name: "Neptune", flag: sweph.constants.SE_NEPTUNE },
    { id: 9, name: "Pluto", flag: sweph.constants.SE_PLUTO },
    { id: 15, name: "Chiron", flag: sweph.constants.SE_CHIRON },
    { id: 105, name: "Lilith", flag: sweph.constants.SE_MEAN_APOG },
    { id: 103, name: "True North Node", flag: sweph.constants.SE_TRUE_NODE },
    { id: 104, name: "True South Node", flag: sweph.constants.SE_TRUE_NODE },
];

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

function getPlanetPositionsForHouses(
    jde: number,
    _lat: astronomia.sexagesimal.Angle,
    _lon: astronomia.sexagesimal.Angle,
    houses: number[],
) {
    return Result.combine(
        PLANETS.map((planet) => {
            const ut = sweph.calc_ut(
                jde,
                planet.flag,
                sweph.constants.SEFLG_SPEED,
            );

            if (ut.error) {
                return err(ut.error);
            }

            const [lon, , , lonSpd] = ut.data;

            const isRetrograde = lonSpd < 0;
            const zodiacInfo = getZodiacFromLongitude(lon);
            const houseNumber = getHouseForPlanet(lon, houses);

            return ok({
                id: planet.id,
                name: planet.name,
                longitude: lon,
                is_retrograde: isRetrograde,
                degree: zodiacInfo.degree,
                house_number: houseNumber,
                zodiac: zodiacInfo.zodiac,
            });
        }),
    );
}

export function getPlanetaryPositionsForDate(
    jde: number,
    lat: astronomia.sexagesimal.Angle,
    lon: astronomia.sexagesimal.Angle,
) {
    const houses = sweph.houses(jde, lat.deg(), lon.deg(), "P");

    return getPlanetPositionsForHouses(jde, lat, lon, houses.data.houses);
}
