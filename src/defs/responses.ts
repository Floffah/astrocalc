import { z } from "zod";

import {
    aspectObject,
    declinationObject,
    houseObject,
    planetEnum,
    planetIdEnum,
    planetPositionObject,
    zodiacSignObject,
} from "@/defs/index.ts";

export const calculateBirthChartResponse = z.object({
    signs: z.object({
        sun: zodiacSignObject,
        moon: zodiacSignObject,
        ascendant: zodiacSignObject,
    }),
    houses: z.array(houseObject),
    planets: z.array(planetPositionObject),
    angles: z.array(planetPositionObject),
    aspects: z.array(aspectObject),
    declinations: z.array(aspectObject),
});

export type CalculateBirthChartResponse = z.infer<
    typeof calculateBirthChartResponse
>;
