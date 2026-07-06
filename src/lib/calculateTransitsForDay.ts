import * as astronomia from "astronomia";
import { addDays } from "date-fns";

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

    let transitNatalAspects: ReturnType<
        typeof computeAspectsBetweenCharts
    > | null = null;

    if (birthDate && birthLat && birthLon) {
        const birthNatalChart = calculateBirthChart(
            birthDate,
            birthLat,
            birthLon,
        );

        transitNatalAspects = computeAspectsBetweenCharts(
            [...birthNatalChart.planets, ...birthNatalChart.angles],
            transitChart.planets,
        );
    }

    const retrogradePlanets = transitChart.planets
        .map((planet) => (planet.isRetrograde ? planet.name : undefined))
        .filter((name) => name !== undefined);

    const yesterday = addDays(date, -1);
    const yesterdayJd = astronomia.julian.DateToJD(yesterday);

    const yesterdayPlanets = getPlanetaryPositionsForDateAndLocation(
        yesterdayJd,
        transitLatAngle,
        transitLonAngle,
    );

    const ingresses: IngressObject[] = [];

    for (const planet of transitChart.planets) {
        const yesterdayPlanet = yesterdayPlanets.find(
            (p) => p.id === planet.id,
        );

        if (yesterdayPlanet && yesterdayPlanet.zodiac !== planet.zodiac) {
            ingresses.push({
                planet: planet.name,
                enteredSign: planet.zodiac.name,
            });
        }
    }

    return {
        transitChart,
        transitNatalAspects: transitNatalAspects ?? null,
        notableEvents: {
            retrogradePlanets,
            ingresses,
        },
    } satisfies CalculateDailyTransitsResponse;
}
