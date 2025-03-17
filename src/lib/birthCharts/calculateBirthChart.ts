import * as astronomia from "astronomia";
import { ok } from "neverthrow";

import { getAnglesForDate } from "@/lib/birthCharts/calculateAngles.ts";
import { getAspectsForDate } from "@/lib/birthCharts/calculateAspects.ts";
import { getDeclinationsForDate } from "@/lib/birthCharts/calculateDeclinations.ts";
import { calculateHouses } from "@/lib/birthCharts/calculateHouses.ts";
import { getPlanetaryPositionsForDate } from "@/lib/birthCharts/calculatePlanetPositions.ts";
import { calculateSigns } from "@/lib/birthCharts/calculateSigns.ts";
import { rad } from "@/lib/degrees.ts";

export function calculateBirthChart(
    date: Date,
    latitude: number,
    longitude: number,
) {
    const jde = astronomia.julian.DateToJDE(date);

    const latAngle = new astronomia.sexagesimal.Angle(rad(latitude));
    const lonAngle = new astronomia.sexagesimal.Angle(rad(longitude));

    const signs = calculateSigns(jde, latAngle, lonAngle);

    if (signs.isErr()) {
        return signs;
    }

    const houses = calculateHouses(jde, latAngle, lonAngle);

    if (houses.isErr()) {
        return houses;
    }

    const planetPositions = getPlanetaryPositionsForDate(
        jde,
        latAngle,
        lonAngle,
    );

    if (planetPositions.isErr()) {
        return planetPositions;
    }

    const angles = getAnglesForDate(jde, latAngle, lonAngle);

    if (angles.isErr()) {
        return angles;
    }

    const aspects = getAspectsForDate(jde, latAngle, lonAngle);

    if (aspects.isErr()) {
        return aspects;
    }

    const declinations = getDeclinationsForDate(jde);

    if (declinations.isErr()) {
        return declinations;
    }

    return ok({
        signs: signs.value,
        houses: houses.value,
        planets: planetPositions.value,
        angles: angles.value,
        aspects: aspects.value,
        declinations: declinations.value,
    });
}
