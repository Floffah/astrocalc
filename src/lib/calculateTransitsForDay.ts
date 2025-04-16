import * as astronomia from "astronomia";
import { addDays } from "date-fns";
import { ok } from "neverthrow";

import type { IngressObject } from "@/defs";
import type { CalculateDailyTransitsResponse } from "@/defs/responses.ts";
import { calculateBirthChart } from "@/lib/birthCharts/calculateBirthChart.ts";
import { computeAspectsBetweenCharts } from "@/lib/calculateAspects.ts";
import { getPlanetaryPositionsForDateAndLocation } from "@/lib/calculatePlanetPositions.ts";
import { rad } from "@/lib/degrees.ts";

export function calculateTransitsForDay(
    date: Date,
    transitLat: number,
    transitLon: number,
    birthDate: Date | null,
    birthLat: number | null,
    birthLon: number | null,
) {
    const transitLatAngle = new astronomia.sexagesimal.Angle(rad(transitLat));
    const transitLonAngle = new astronomia.sexagesimal.Angle(rad(transitLon));

    const transitChart = calculateBirthChart(date, transitLat, transitLon);

    if (transitChart.isErr()) {
        return transitChart;
    }

    let birthNatalChart: ReturnType<typeof calculateBirthChart> | null = null;
    let transitNatalAspects: ReturnType<
        typeof computeAspectsBetweenCharts
    > | null = null;

    if (birthDate && birthLat && birthLon) {
        birthNatalChart = calculateBirthChart(birthDate, birthLat, birthLon);

        if (birthNatalChart.isErr()) {
            return birthNatalChart;
        }

        transitNatalAspects = computeAspectsBetweenCharts(
            [...birthNatalChart.value.planets, ...birthNatalChart.value.angles],
            transitChart.value.planets,
        );

        if (transitNatalAspects.isErr()) {
            return transitNatalAspects;
        }
    }

    const retrogradePlanets = transitChart.value.planets
        .map((planet) => (planet.isRetrograde ? planet.name : undefined))
        .filter((name) => name !== undefined);

    const yesterday = addDays(date, -1);
    const yesterdayJd = astronomia.julian.DateToJD(yesterday);

    const yesterdayPlanets = getPlanetaryPositionsForDateAndLocation(
        yesterdayJd,
        transitLatAngle,
        transitLonAngle,
    );

    if (yesterdayPlanets.isErr()) {
        return yesterdayPlanets;
    }

    const ingresses: IngressObject[] = [];

    for (const planet of transitChart.value.planets) {
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
        transitChart: transitChart.value,
        transitNatalAspects: transitNatalAspects?.value ?? null,
        notableEvents: {
            retrogradePlanets,
            ingresses,
        },
    } satisfies CalculateDailyTransitsResponse);
}
