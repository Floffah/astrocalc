import * as astronomia from "astronomia";
import { Result, err, ok } from "neverthrow";
import sweph from "sweph";

import type { GenericPlanetPositionObject, PlanetPositionObject } from "@/defs";
import { Planet, PlanetId } from "@/defs/enums.ts";
import { getZodiacFromLongitude } from "@/lib/zodiac.ts";

export const PLANETS = [
    { id: PlanetId.Sun, name: Planet.Sun, flag: sweph.constants.SE_SUN },
    { id: PlanetId.Moon, name: Planet.Moon, flag: sweph.constants.SE_MOON },
    {
        id: PlanetId.Mercury,
        name: Planet.Mercury,
        flag: sweph.constants.SE_MERCURY,
    },
    { id: PlanetId.Venus, name: Planet.Venus, flag: sweph.constants.SE_VENUS },
    { id: PlanetId.Mars, name: Planet.Mars, flag: sweph.constants.SE_MARS },
    {
        id: PlanetId.Jupiter,
        name: Planet.Jupiter,
        flag: sweph.constants.SE_JUPITER,
    },
    {
        id: PlanetId.Saturn,
        name: Planet.Saturn,
        flag: sweph.constants.SE_SATURN,
    },
    {
        id: PlanetId.Uranus,
        name: Planet.Uranus,
        flag: sweph.constants.SE_URANUS,
    },
    {
        id: PlanetId.Neptune,
        name: Planet.Neptune,
        flag: sweph.constants.SE_NEPTUNE,
    },
    { id: PlanetId.Pluto, name: Planet.Pluto, flag: sweph.constants.SE_PLUTO },
    {
        id: PlanetId.Chiron,
        name: Planet.Chiron,
        flag: sweph.constants.SE_CHIRON,
    },
    {
        id: PlanetId.Lilith,
        name: Planet.Lilith,
        flag: sweph.constants.SE_MEAN_APOG,
    },
    {
        id: PlanetId.TrueNorthNode,
        name: Planet.TrueNorthNode,
        flag: sweph.constants.SE_TRUE_NODE,
    },
    {
        id: PlanetId.TrueSouthNode,
        name: Planet.TrueSouthNode,
        flag: sweph.constants.SE_TRUE_NODE,
    },
];

export function getHouseForPlanet(longitude: number, houses: number[]) {
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

            const [lon, lat, , lonSpd] = ut.data;

            const isRetrograde = lonSpd < 0;
            const zodiacInfo = getZodiacFromLongitude(lon);
            const houseNumber = getHouseForPlanet(lon, houses);

            return ok({
                id: planet.id,
                name: planet.name,
                longitude: lon,
                latitude: planet.name === Planet.TrueSouthNode ? -lat : lat,
                isRetrograde: isRetrograde,
                degree: zodiacInfo.degree,
                houseNumber: houseNumber,
                zodiac: zodiacInfo.zodiac,
            } satisfies PlanetPositionObject);
        }),
    );
}

export function getPlanetaryPositionsForDateAndLocation(
    jde: number,
    lat: astronomia.sexagesimal.Angle,
    lon: astronomia.sexagesimal.Angle,
) {
    const houses = sweph.houses(jde, lat.deg(), lon.deg(), "P");

    return getPlanetPositionsForHouses(jde, lat, lon, houses.data.houses);
}

export function getPlanetaryPositionsForDate(jde: number) {
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

            const [lon, lat, , lonSpd] = ut.data;
            const isRetrograde = lonSpd < 0;
            const zodiacInfo = getZodiacFromLongitude(lon);

            return ok({
                id: planet.id,
                name: planet.name,
                longitude: lon,
                latitude: planet.name === Planet.TrueSouthNode ? -lat : lat,
                isRetrograde,
                degree: zodiacInfo.degree,
                zodiac: zodiacInfo.zodiac,
            } satisfies GenericPlanetPositionObject);
        }),
    );
}
