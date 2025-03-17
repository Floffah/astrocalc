import * as astronomia from "astronomia";
import { Result, ok } from "neverthrow";

import { getAnglesForDate } from "@/lib/birthCharts/calculateAngles.ts";
import { getPlanetaryPositionsForDate } from "@/lib/birthCharts/calculatePlanetPositions.ts";

const ASPECTS = [
    { id: 0, name: "Conjunction", angle: 0, orb: 10 },
    { id: 1, name: "Opposition", angle: 180, orb: 10 },
    { id: 2, name: "Square", angle: 90, orb: 8 },
    { id: 3, name: "Semi Square", angle: 45, orb: 3 },
    { id: 4, name: "Sesquiquadrate", angle: 135, orb: 3 },
    { id: 5, name: "Trine", angle: 120, orb: 8 },
    { id: 6, name: "Sextile", angle: 60, orb: 6 },
    { id: 7, name: "Semi Sextile", angle: 30, orb: 2 },
    { id: 8, name: "Quincunx", angle: 150, orb: 3 },
    { id: 9, name: "Quintile", angle: 72, orb: 2 },
    { id: 10, name: "Bi Quintile", angle: 144, orb: 2 },
];

function computeAspects(
    celestialBodies: { id: number; name: string; longitude: number }[],
) {
    const aspects: {
        planet_one: { id: number; name: string };
        planet_two: { id: number; name: string };
        aspect: { id: number; name: string };
        orb: number;
    }[] = [];

    for (let i = 0; i < celestialBodies.length; i++) {
        for (let j = i + 1; j < celestialBodies.length; j++) {
            const body1 = celestialBodies[i]!;
            const body2 = celestialBodies[j]!;

            let angleDiff = Math.abs(body1.longitude - body2.longitude);
            if (angleDiff > 180) {
                angleDiff = 360 - angleDiff;
            }

            for (const aspect of ASPECTS) {
                const orb = Math.abs(angleDiff - aspect.angle);
                if (orb <= aspect.orb) {
                    aspects.push({
                        planet_one: { id: body1.id, name: body1.name },
                        planet_two: { id: body2.id, name: body2.name },
                        aspect: { id: aspect.id, name: aspect.name },
                        orb: orb,
                    });
                    break;
                }
            }
        }
    }

    return ok(aspects);
}

export function getAspectsForDate(
    jde: number,
    lat: astronomia.sexagesimal.Angle,
    lon: astronomia.sexagesimal.Angle,
) {
    const planetResults = getPlanetaryPositionsForDate(jde, lat, lon);
    const angleResults = getAnglesForDate(jde, lat, lon);

    if (planetResults.isErr() || angleResults.isErr()) {
        return Result.combine([planetResults, angleResults]);
    }

    const celestialBodies = [...planetResults.value, ...angleResults.value];
    return computeAspects(celestialBodies);
}
