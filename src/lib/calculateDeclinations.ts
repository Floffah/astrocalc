import { ok } from "neverthrow";
import sweph from "sweph";

import type { AspectObject, DeclinationObject } from "@/defs";
import { Aspect, Planet, type PlanetId } from "@/defs/enums.ts";
import { PLANETS } from "@/lib/calculatePlanetPositions.ts";

export function computeDeclinations(
    celestialBodies: { id: PlanetId; name: Planet; declination: number }[],
) {
    const declinations: AspectObject[] = [];

    for (let i = 0; i < celestialBodies.length; i++) {
        for (let j = i + 1; j < celestialBodies.length; j++) {
            const body1 = celestialBodies[i]!;
            const body2 = celestialBodies[j]!;

            const declinationDiff = Math.abs(
                body1.declination - body2.declination,
            );
            const orbAllowance = 1;

            if (declinationDiff <= orbAllowance) {
                declinations.push({
                    planet1: { id: body1.id, name: body1.name },
                    planet2: { id: body2.id, name: body2.name },
                    aspect: { id: 11, name: Aspect.Parallel },
                    orb: declinationDiff,
                });
            } else if (
                Math.abs(body1.declination + body2.declination) <= orbAllowance
            ) {
                if (
                    !declinations.some(
                        (d) =>
                            d.planet1.id === body1.id &&
                            d.planet2.id === body2.id,
                    )
                ) {
                    declinations.push({
                        planet1: { id: body1.id, name: body1.name },
                        planet2: { id: body2.id, name: body2.name },
                        aspect: { id: 12, name: Aspect.Contraparallel },
                        orb: Math.abs(body1.declination + body2.declination),
                    });
                }
            }
        }
    }

    return ok(declinations);
}

export function getDeclinationsForDate(jde: number) {
    const celestialBodies: {
        id: PlanetId;
        name: Planet;
        declination: number;
    }[] = [];

    for (const planet of PLANETS) {
        const ut = sweph.calc_ut(jde, planet.flag, sweph.constants.SEFLG_SPEED);
        if (!ut.error) {
            const [, lat] = ut.data;
            celestialBodies.push({
                id: planet.id,
                name: planet.name,
                declination: lat,
            } satisfies DeclinationObject);
        }
    }

    return computeDeclinations(celestialBodies);
}
