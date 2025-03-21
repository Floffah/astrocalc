import * as astronomia from "astronomia";
import { ok } from "neverthrow";
import sweph from "sweph";

import type { CalculateDailyTransitsResponse } from "@/defs/responses.ts";
import { calculateBirthChart } from "@/lib/birthCharts/calculateBirthChart.ts";
import { computeAspects } from "@/lib/calculateAspects.ts";
import { getPlanetaryPositionsForDate } from "@/lib/calculatePlanetPositions.ts";
import { rad } from "@/lib/degrees.ts";

export function calculateTransitsForDay(
    date: Date,
    birthDate: Date,
    transitLat: number,
    transitLon: number,
    birthLat: number,
    birthLon: number,
) {
    const birthJde = sweph.julday(
        birthDate.getUTCFullYear(),
        birthDate.getUTCMonth() + 1,
        birthDate.getUTCDate(),
        birthDate.getUTCHours() + birthDate.getUTCMinutes() / 60,
        sweph.constants.SE_GREG_CAL,
    );

    const birthLatAngle = new astronomia.sexagesimal.Angle(rad(birthLat));
    const birthLonAngle = new astronomia.sexagesimal.Angle(rad(birthLon));

    const transits = calculateBirthChart(date, transitLat, transitLon);

    if (transits.isErr()) {
        return transits;
    }

    const birthPlanetPositions = getPlanetaryPositionsForDate(
        birthJde,
        birthLatAngle,
        birthLonAngle,
    );

    if (birthPlanetPositions.isErr()) {
        return birthPlanetPositions;
    }

    const transitNatalAspects = computeAspects([
        ...birthPlanetPositions.value,
        ...transits.value.planets,
    ]);

    if (transitNatalAspects.isErr()) {
        return transitNatalAspects;
    }

    return ok({
        transitDetails: transits.value,
        transitNatalAspects: transitNatalAspects.value,
    } satisfies CalculateDailyTransitsResponse);
}
