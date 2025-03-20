import { z } from "zod";

import { Aspect, Planet, PlanetId, ZodiacSign } from "@/defs/enums.ts";

export const zodiacSignEnum = z.nativeEnum(ZodiacSign);

export const zodiacSignObject = z.object({
    value: zodiacSignEnum,
    degree: z.number(),
    cuspWarning: zodiacSignEnum.nullable(),
});

export type ZodiacSignObject = z.infer<typeof zodiacSignObject>;

export const planetEnum = z.nativeEnum(Planet);

export const planetIdEnum = z.nativeEnum(PlanetId);

export const zodiacDetailsObject = z.object({
    id: z.number().min(0).max(11),
    name: zodiacSignEnum,
    lord: z.object({
        id: planetIdEnum,
        name: planetEnum,
    }),
});

export type ZodiacDetailsObject = z.infer<typeof zodiacDetailsObject>;

export const zodiacPositionObject = z.object({
    longitude: z.number(),
    degree: z.number().min(0).max(30),
    zodiac: zodiacDetailsObject,
});

export const houseObject = z.object({
    id: z.number().min(0).max(11),
    number: z.number().min(1).max(12),
    cusp: zodiacPositionObject,
});

export const planetPositionObject = z.object({
    id: planetIdEnum,
    name: planetEnum,
    longitude: z.number(),
    isRetrograde: z.boolean(),
    degree: z.number().min(0).max(30),
    houseNumber: z.number().min(1).max(12),
    zodiac: zodiacDetailsObject,
});

export type PlanetPositionObject = z.infer<typeof planetPositionObject>;

export const aspectEnum = z.nativeEnum(Aspect);

export const aspectObject = z.object({
    planet1: z.object({
        id: planetIdEnum,
        name: planetEnum,
    }),
    planet2: z.object({
        id: planetIdEnum,
        name: planetEnum,
    }),
    aspect: z.object({
        id: z.number().min(0).max(10),
        name: aspectEnum,
    }),
    orb: z.number(),
});

export type AspectObject = z.infer<typeof aspectObject>;

export const declinationObject = z.object({
    id: planetIdEnum,
    name: planetEnum,
    declination: z.number(),
});

export type DeclinationObject = z.infer<typeof declinationObject>;
