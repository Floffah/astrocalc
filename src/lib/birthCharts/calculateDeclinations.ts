import { ok } from "neverthrow";
import sweph from "sweph";

import { PLANETS } from "@/lib/birthCharts/calculatePlanetPositions.ts";

export function computeDeclinations(
    celestialBodies: { id: number; name: string; declination: number }[],
) {
    const declinations: {
        planet_one: { id: number; name: string };
        planet_two: { id: number; name: string };
        aspect: { id: number; name: string };
        orb: number;
    }[] = [];

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
                    planet_one: { id: body1.id, name: body1.name },
                    planet_two: { id: body2.id, name: body2.name },
                    aspect: { id: 11, name: "Parallel" },
                    orb: declinationDiff,
                });
            } else if (
                Math.abs(body1.declination + body2.declination) <= orbAllowance
            ) {
                if (
                    !declinations.some(
                        (d) =>
                            d.planet_one.id === body1.id &&
                            d.planet_two.id === body2.id,
                    )
                ) {
                    declinations.push({
                        planet_one: { id: body1.id, name: body1.name },
                        planet_two: { id: body2.id, name: body2.name },
                        aspect: { id: 12, name: "Contraparallel" },
                        orb: Math.abs(body1.declination + body2.declination),
                    });
                }
            }
        }
    }

    return ok(declinations);
}

export function getDeclinationsForDate(jde: number) {
    const celestialBodies: { id: number; name: string; declination: number }[] =
        [];

    for (const planet of PLANETS) {
        const ut = sweph.calc_ut(jde, planet.flag, sweph.constants.SEFLG_SPEED);
        if (!ut.error) {
            const [, lat] = ut.data;
            celestialBodies.push({
                id: planet.id,
                name: planet.name,
                declination: lat,
            });
        }
    }

    return computeDeclinations(celestialBodies);
}
