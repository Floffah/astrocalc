import * as astronomia from "astronomia";
import { ok } from "neverthrow";
import sweph from "sweph";

import { getPlanetaryPositionsForDate } from "@/lib/calculatePlanetPositions.ts";
import { rad } from "@/lib/degrees.ts";

export function calculateTransitsForDay(date: Date, lat: number, lon: number) {
    const jde = sweph.julday(
        date.getUTCFullYear(),
        date.getUTCMonth() + 1,
        date.getUTCDate(),
        date.getUTCHours() + date.getUTCMinutes() / 60,
        sweph.constants.SE_GREG_CAL,
    );

    const latAngle = new astronomia.sexagesimal.Angle(rad(lat));
    const lonAngle = new astronomia.sexagesimal.Angle(rad(lon));

    const planetPositions = getPlanetaryPositionsForDate(
        jde,
        latAngle,
        lonAngle,
    );

    return ok({
        planets: planetPositions,
    });
}
