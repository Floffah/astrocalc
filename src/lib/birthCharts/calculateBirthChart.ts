import * as astronomia from "astronomia";

import type { CalculateBirthChartResponse } from "@/defs/responses.ts";
import { calculateHouses } from "@/lib/birthCharts/calculateHouses.ts";
import { getAnglesForDate } from "@/lib/calculateAngles.ts";
import { getAspectsForDate } from "@/lib/calculateAspects.ts";
import { getDeclinationsForDate } from "@/lib/calculateDeclinations.ts";
import { getPlanetaryPositionsForDateAndLocation } from "@/lib/calculatePlanetPositions.ts";
import { calculateSigns } from "@/lib/calculateSigns.ts";
import { rad } from "@/lib/degrees.ts";

export function calculateBirthChart(
    date: Date,
    latitude: number,
    longitude: number,
) {
    if (!date || isNaN(latitude) || isNaN(longitude)) {
        throw new Error("Invalid input");
    }

    const jde = astronomia.julian.DateToJDE(date);

    const latAngle = new astronomia.sexagesimal.Angle(rad(latitude));
    const lonAngle = new astronomia.sexagesimal.Angle(rad(longitude));

    const signs = calculateSigns(jde, latAngle, lonAngle);
    const houses = calculateHouses(jde, latAngle, lonAngle);
    const planetPositions = getPlanetaryPositionsForDateAndLocation(
        jde,
        latAngle,
        lonAngle,
    );
    const angles = getAnglesForDate(jde, latAngle, lonAngle);
    const aspects = getAspectsForDate(jde, latAngle, lonAngle);
    const declinations = getDeclinationsForDate(jde);

    return {
        signs,
        houses,
        planets: planetPositions,
        angles,
        aspects,
        declinations,
    } satisfies CalculateBirthChartResponse;
}
