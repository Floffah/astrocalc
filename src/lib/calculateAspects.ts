import * as astronomia from "astronomia";
import { Err, Result, ok } from "neverthrow";

import type { AspectObject } from "@/defs";
import { Aspect, Planet, PlanetId } from "@/defs/enums.ts";
import { getAnglesForDate } from "@/lib/calculateAngles.ts";
import { getPlanetaryPositionsForDate } from "@/lib/calculatePlanetPositions.ts";
import type { ExtractError } from "@/types/neverthrow.ts";

const ASPECTS = [
    { id: 0, name: Aspect.Conjunction, angle: 0, orb: 10 },
    { id: 1, name: Aspect.Opposition, angle: 180, orb: 10 },
    { id: 2, name: Aspect.Square, angle: 90, orb: 8 },
    { id: 3, name: Aspect.SemiSquare, angle: 45, orb: 3 },
    { id: 4, name: Aspect.Sesquiquadrate, angle: 135, orb: 3 },
    { id: 5, name: Aspect.Trine, angle: 120, orb: 8 },
    { id: 6, name: Aspect.Sextile, angle: 60, orb: 6 },
    { id: 7, name: Aspect.SemiSextile, angle: 30, orb: 2 },
    { id: 8, name: Aspect.Quincunx, angle: 150, orb: 3 },
    { id: 9, name: Aspect.Quintile, angle: 72, orb: 2 },
    { id: 10, name: Aspect.BiQuintile, angle: 144, orb: 2 },
];

export function computeAspects(
    celestialBodies: { id: PlanetId; name: Planet; longitude: number }[],
) {
    const aspects: AspectObject[] = [];

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
                        planet1: { id: body1.id, name: body1.name },
                        planet2: { id: body2.id, name: body2.name },
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
        return Result.combine([planetResults, angleResults]) as Err<
            never,
            | ExtractError<typeof planetResults>
            | ExtractError<typeof angleResults>
        >;
    }

    const celestialBodies = [...planetResults.value, ...angleResults.value];
    return computeAspects(celestialBodies);
}
