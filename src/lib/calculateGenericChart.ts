import * as astronomia from "astronomia";
import { addDays } from "date-fns";
import { err, ok } from "neverthrow";

import type { IngressObject } from "@/defs";
import type {
    CalculateGenericChartResponse,
    CalculateGenericTransitChartResponse,
} from "@/defs/responses.ts";
import { computeAspects } from "@/lib/calculateAspects.ts";
import { getDeclinationsForDate } from "@/lib/calculateDeclinations.ts";
import { getPlanetaryPositionsForDate } from "@/lib/calculatePlanetPositions.ts";
import { calculateSunAndMoon } from "@/lib/calculateSigns.ts";

export function calculateGenericChart(date: Date) {
    if (!date) {
        return err("Invalid input");
    }

    const jde = astronomia.julian.DateToJDE(date);

    const sunAndMoon = calculateSunAndMoon(jde);
    if (sunAndMoon.isErr()) {
        return sunAndMoon;
    }

    const planetaryPositions = getPlanetaryPositionsForDate(jde);
    if (planetaryPositions.isErr()) {
        return planetaryPositions;
    }

    const aspects = computeAspects(
        planetaryPositions.value,
        "transit-to-transit",
    );
    if (aspects.isErr()) {
        return aspects;
    }

    const declinations = getDeclinationsForDate(jde);
    if (declinations.isErr()) {
        return declinations;
    }

    return ok({
        signs: sunAndMoon.value,
        planets: planetaryPositions.value,
        aspects: aspects.value,
        declinations: declinations.value,
    } satisfies CalculateGenericChartResponse);
}

export function calculateGenericTransitChart(date: Date) {
    const chart = calculateGenericChart(date);
    if (chart.isErr()) {
        return chart;
    }

    const retrogradePlanets = chart.value.planets
        .map((planet) => (planet.isRetrograde ? planet.name : undefined))
        .filter((name) => name !== undefined);

    const yesterday = addDays(date, -1);
    const yesterdayJd = astronomia.julian.DateToJD(yesterday);

    const yesterdayPlanets = getPlanetaryPositionsForDate(yesterdayJd);
    if (yesterdayPlanets.isErr()) {
        return yesterdayPlanets;
    }

    const ingresses: IngressObject[] = [];

    for (const planet of chart.value.planets) {
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
        chart: chart.value,
        notableEvents: {
            retrogradePlanets,
            ingresses,
        },
    } satisfies CalculateGenericTransitChartResponse);
}
