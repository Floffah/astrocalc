import { z } from "zod";

import {
    aspectObject,
    genericPlanetPositionObject,
    houseObject,
    ingressObject,
    planetEnum,
    planetPositionObject,
    zodiacMoonSignObject,
    zodiacSignObject,
} from "@/defs/index.ts";

export const baseResponse = z.object({
    success: z.boolean(),
});

export const calculateBirthChartResponse = z
    .object({
        signs: z.object({
            sun: zodiacSignObject,
            moon: zodiacMoonSignObject,
            ascendant: zodiacSignObject,
        }),
        houses: z.array(houseObject),
        planets: z.array(planetPositionObject),
        angles: z.array(planetPositionObject),
        aspects: z.array(aspectObject),
        declinations: z.array(aspectObject),
    })
    .openapi({
        ref: "CalculateBirthChartResponse",
    });

export type CalculateBirthChartResponse = z.infer<
    typeof calculateBirthChartResponse
>;

export const calculateDailyTransitsResponse = z
    .object({
        transitChart: calculateBirthChartResponse,
        transitNatalAspects: z.array(aspectObject).nullable(),
        notableEvents: z.object({
            retrogradePlanets: z.array(planetEnum),
            ingresses: z.array(ingressObject),
        }),
    })
    .openapi({
        ref: "CalculateDailyTransitsResponse",
    });

export type CalculateDailyTransitsResponse = z.infer<
    typeof calculateDailyTransitsResponse
>;

export const calculateGenericChartResponse = z
    .object({
        signs: z.object({
            sun: zodiacSignObject,
            moon: zodiacMoonSignObject,
        }),
        planets: z.array(genericPlanetPositionObject),
        aspects: z.array(aspectObject),
        declinations: z.array(aspectObject),
    })
    .openapi({
        ref: "CalculateGenericChartResponse",
    });

export type CalculateGenericChartResponse = z.infer<
    typeof calculateGenericChartResponse
>;

export const calculateGenericTransitChartResponse = z
    .object({
        chart: calculateGenericChartResponse,
        notableEvents: z.object({
            retrogradePlanets: z.array(planetEnum),
            ingresses: z.array(ingressObject),
        }),
    })
    .openapi({
        ref: "CalculateGenericTransitChartResponse",
    });

export type CalculateGenericTransitChartResponse = z.infer<
    typeof calculateGenericTransitChartResponse
>;

export const errorResponse = z
    .object({
        success: z.literal(false),
        error: z
            .union([
                z.string().openapi({
                    title: "Error message",
                }),
                z
                    .object({
                        issues: z.array(
                            z.object({
                                code: z.string(),
                                message: z.string(),
                                path: z.array(z.string()),
                            }),
                        ),
                    })
                    .openapi({
                        title: "ZodError input validation error",
                    }),
            ])
            .openapi({
                unionOneOf: true,
            }),
    })
    .openapi({
        ref: "ErrorResponse",
        description:
            "An error response. Note that 'error' can be a string, or a ZodError object.",
    });
