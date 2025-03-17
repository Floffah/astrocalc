import * as astronomia from "astronomia";
import { ok } from "neverthrow";

import { calculateHouses } from "@/lib/birthCharts/calculateHouses.ts";
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

    return ok({
        signs: signs.value,
        hosues: houses.value,
    });
}
