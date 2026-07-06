import { z } from "@hono/zod-openapi";

import {
    aspectEnum,
    aspectObject,
    genericPlanetPositionObject,
    houseObject,
    ingressObject,
    planetEnum,
    planetPositionObject,
    zodiacMoonSignObject,
    zodiacSignEnum,
    zodiacSignObject,
} from "@/defs/index.ts";

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
    .openapi("CalculateBirthChartResponse");

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
    .openapi("CalculateDailyTransitsResponse");

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
    .openapi("CalculateGenericChartResponse");

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
    .openapi("CalculateGenericTransitChartResponse");

export type CalculateGenericTransitChartResponse = z.infer<
    typeof calculateGenericTransitChartResponse
>;

const dominantPlanetObject = z
    .object({
        planet: planetEnum,
        count: z.number(),
        score: z.number(),
    })
    .openapi("DominantPlanetObject");

const dominantHouseObject = z
    .object({
        houseNumber: z.number().min(1).max(12),
        count: z.number(),
        score: z.number(),
    })
    .openapi("DominantHouseObject");

const dominantSignObject = z
    .object({
        sign: zodiacSignEnum,
        count: z.number(),
        score: z.number(),
    })
    .openapi("DominantSignObject");

const dominantAspectTypeObject = z
    .object({
        aspect: aspectEnum,
        count: z.number(),
        score: z.number(),
    })
    .openapi("DominantAspectTypeObject");

const rangeAspectSampleObject = z
    .object({
        date: z.string(),
        orb: z.number(),
        applying: z.boolean().nullable(),
        transitSign: zodiacSignEnum,
        transitHouse: z.number().min(1).max(12).nullable(),
        natalSign: zodiacSignEnum.nullable(),
        natalHouse: z.number().min(1).max(12).nullable(),
    })
    .openapi("RangeAspectSampleObject");

const rangeAspectEventBase = z.object({
    aspect: z.object({
        id: z.number().min(0).max(10),
        name: aspectEnum,
    }),
    firstSeen: z.string(),
    activeFrom: z.string(),
    exactPeakTime: z.string().nullable(),
    activeUntil: z.string(),
    minimumOrb: z.number(),
    minimumOrbDate: z.string(),
    orbAtStart: z.number().nullable(),
    orbAtEnd: z.number().nullable(),
    applyingAtStart: z.boolean().nullable(),
    separatingAtEnd: z.boolean().nullable(),
    exactInRange: z.boolean(),
    importance: z.number(),
    rank: z.number(),
    samples: z.array(rangeAspectSampleObject),
});

const transitNatalRangeEventObject = rangeAspectEventBase
    .extend({
        transitPlanet: planetEnum,
        natalBody: planetEnum,
        natalHouse: z.number().min(1).max(12).nullable(),
        natalSign: zodiacSignEnum,
        transitHouse: z.number().min(1).max(12).nullable(),
        transitSign: zodiacSignEnum,
    })
    .openapi("TransitNatalRangeEventObject");

const transitTransitRangeEventObject = rangeAspectEventBase
    .extend({
        planet1: planetEnum,
        planet2: planetEnum,
        planet1House: z.number().min(1).max(12).nullable(),
        planet1Sign: zodiacSignEnum,
        planet2House: z.number().min(1).max(12).nullable(),
        planet2Sign: zodiacSignEnum,
    })
    .openapi("TransitTransitRangeEventObject");

const rangeIngressObject = z
    .object({
        planet: planetEnum,
        fromSign: zodiacSignEnum.nullable(),
        toSign: zodiacSignEnum,
        exactTimestamp: z.string().nullable(),
        firstSeenDate: z.string(),
        houseAfterIngress: z.number().min(1).max(12).nullable(),
    })
    .openapi("RangeIngressObject");

const rangeRetrogradeObject = z
    .object({
        planet: planetEnum,
        stationType: z.enum(["retrograde", "direct"]),
        exactTimestamp: z.string().nullable(),
        firstSeenDate: z.string(),
        sign: zodiacSignEnum,
        degree: z.number(),
    })
    .openapi("RangeRetrogradeObject");

const moonEventObject = z
    .object({
        date: z.string(),
        moonSign: zodiacMoonSignObject,
        voidOfCourseWindows: z.array(
            z.object({
                startsAt: z.string(),
                endsAt: z.string(),
            }),
        ),
        majorMoonAspects: z.array(aspectObject),
    })
    .openapi("MoonEventObject");

export const calculateTransitRangeResponse = z
    .object({
        range: z.object({
            startDate: z.string(),
            endDate: z.string(),
            timezone: z.string(),
        }),
        summaryData: z.object({
            dominantPlanets: z.array(dominantPlanetObject),
            dominantHouses: z.array(dominantHouseObject),
            dominantSigns: z.array(dominantSignObject),
            dominantAspectTypes: z.array(dominantAspectTypeObject),
            overallToneScore: z.number().nullable(),
            sampleCount: z.number(),
        }),
        transitNatalEvents: z.array(transitNatalRangeEventObject),
        transitTransitEvents: z.array(transitTransitRangeEventObject),
        ingresses: z.array(rangeIngressObject),
        retrogrades: z.array(rangeRetrogradeObject),
        moonEvents: z.array(moonEventObject),
    })
    .openapi("CalculateTransitRangeResponse");

export type CalculateTransitRangeResponse = z.infer<
    typeof calculateTransitRangeResponse
>;

export const errorResponse = z
    .object({
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
            .openapi({}),
    })
    .openapi("ErrorResponse", {
        description:
            "An error response. Note that 'error' can be a string, or a ZodError object.",
    });
