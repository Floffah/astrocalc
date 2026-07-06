import * as astronomia from "astronomia";
import { addDays } from "date-fns";

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
        throw new Error("Invalid input");
    }

    const jde = astronomia.julian.DateToJDE(date);

    const sunAndMoon = calculateSunAndMoon(jde);
    const planetaryPositions = getPlanetaryPositionsForDate(jde);
    const aspects = computeAspects(planetaryPositions, "transit-to-transit");
    const declinations = getDeclinationsForDate(jde);

    return {
        signs: sunAndMoon,
        planets: planetaryPositions,
        aspects,
        declinations,
    } satisfies CalculateGenericChartResponse;
}

export function calculateGenericTransitChart(date: Date) {
    const chart = calculateGenericChart(date);

    const retrogradePlanets = chart.planets
        .map((planet) => (planet.isRetrograde ? planet.name : undefined))
        .filter((name) => name !== undefined);

    const yesterday = addDays(date, -1);
    const yesterdayJd = astronomia.julian.DateToJD(yesterday);

    const yesterdayPlanets = getPlanetaryPositionsForDate(yesterdayJd);

    const ingresses: IngressObject[] = [];

    for (const planet of chart.planets) {
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
        chart,
        notableEvents: {
            retrogradePlanets,
            ingresses,
        },
    } satisfies CalculateGenericTransitChartResponse;
}
