import * as astronomia from "astronomia";
import { addDays } from "date-fns";
import { ok } from "neverthrow";

import type { IngressObject } from "@/defs";
import type { CalculateDailyTransitsResponse } from "@/defs/responses.ts";
import { calculateBirthChart } from "@/lib/birthCharts/calculateBirthChart.ts";
import { computeAspectsBetweenCharts } from "@/lib/calculateAspects.ts";
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
    const transitLatAngle = new astronomia.sexagesimal.Angle(rad(transitLat));
    const transitLonAngle = new astronomia.sexagesimal.Angle(rad(transitLon));

    const transitNatalChart = calculateBirthChart(date, transitLat, transitLon);

    if (transitNatalChart.isErr()) {
        return transitNatalChart;
    }

    const birthNatalChart = calculateBirthChart(birthDate, birthLat, birthLon);

    if (birthNatalChart.isErr()) {
        return birthNatalChart;
    }

    const transitNatalAspects = computeAspectsBetweenCharts(
        [...birthNatalChart.value.planets, ...birthNatalChart.value.angles],
        transitNatalChart.value.planets,
    );

    if (transitNatalAspects.isErr()) {
        return transitNatalAspects;
    }

    const retrogradePlanets = transitNatalChart.value.planets
        .map((planet) => (planet.isRetrograde ? planet.name : undefined))
        .filter((name) => name !== undefined);

    const yesterday = addDays(date, -1);
    const yesterdayJd = astronomia.julian.DateToJD(yesterday);

    const yesterdayPlanets = getPlanetaryPositionsForDate(
        yesterdayJd,
        transitLatAngle,
        transitLonAngle,
    );

    if (yesterdayPlanets.isErr()) {
        return yesterdayPlanets;
    }

    const ingresses: IngressObject[] = [];

    for (const planet of transitNatalChart.value.planets) {
        const yesterdayPlanet = yesterdayPlanets.value.find(
            (p) => p.id === planet.id,
        );

        if (yesterdayPlanet && yesterdayPlanet.zodiac !== planet.zodiac) {
            ingresses.push({
                planet: planet.name,
                enteredSign: planet.zodiac.name,
            });
        }
    }

    return ok({
        transitChart: transitNatalChart.value,
        transitNatalAspects: transitNatalAspects.value,
        notableEvents: {
            retrogradePlanets,
            ingresses,
        },
    } satisfies CalculateDailyTransitsResponse);
}
