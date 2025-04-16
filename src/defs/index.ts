import { z } from "zod";

import {
    Aspect,
    MoonPhase,
    Planet,
    PlanetId,
    ZodiacSign,
} from "@/defs/enums.ts";

export const zodiacSignEnum = z.nativeEnum(ZodiacSign).openapi({
    ref: "ZodiacSign",
});

export const zodiacSignObject = z
    .object({
        value: zodiacSignEnum,
        degree: z.number(),
        cuspWarning: zodiacSignEnum.nullable(),
    })
    .openapi({
        ref: "ZodiacSignObject",
    });

export type ZodiacSignObject = z.infer<typeof zodiacSignObject>;

export const moonPhaseEnum = z.nativeEnum(MoonPhase).openapi({
    ref: "MoonPhase",
});

export const zodiacMoonSignObject = zodiacSignObject
    .extend({
        phase: moonPhaseEnum,
        isVoidOfCourse: z.boolean(),
    })
    .openapi({
        ref: "ZodiacMoonSignObject",
    });

export type ZodiacMoonSignObject = z.infer<typeof zodiacMoonSignObject>;

export const planetEnum = z.nativeEnum(Planet).openapi({
    ref: "Planet",
});

export const planetIdEnum = z.nativeEnum(PlanetId).openapi({
    ref: "PlanetId",
});

export const zodiacDetailsObject = z
    .object({
        id: z.number().min(0).max(11),
        name: zodiacSignEnum,
        lord: z.object({
            id: planetIdEnum,
            name: planetEnum,
        }),
    })
    .openapi({
        ref: "ZodiacDetailsObject",
    });

export type ZodiacDetailsObject = z.infer<typeof zodiacDetailsObject>;

export const zodiacPositionObject = z
    .object({
        longitude: z.number(),
        degree: z.number().min(0).max(30),
        zodiac: zodiacDetailsObject,
    })
    .openapi({
        ref: "ZodiacPositionObject",
    });

export const houseObject = z
    .object({
        id: z.number().min(0).max(11),
        number: z.number().min(1).max(12),
        cusp: zodiacPositionObject,
    })
    .openapi({
        ref: "HouseObject",
    });

export const genericPlanetPositionObject = z
    .object({
        id: planetIdEnum,
        name: planetEnum,
        longitude: z.number(),
        latitude: z.number().optional(),
        isRetrograde: z.boolean(),
        degree: z.number().min(0).max(30),
        zodiac: zodiacDetailsObject,
    })
    .openapi({
        ref: "GenericPlanetPositionObject",
    });

export type GenericPlanetPositionObject = z.infer<
    typeof genericPlanetPositionObject
>;

export const planetPositionObject = genericPlanetPositionObject
    .extend({
        houseNumber: z.number().min(1).max(12),
    })
    .openapi({
        ref: "PlanetPositionObject",
    });

export type PlanetPositionObject = z.infer<typeof planetPositionObject>;

export const aspectEnum = z.nativeEnum(Aspect).openapi({
    ref: "Aspect",
});

export const typeOfAspect = z
    .enum(["transit-to-natal", "natal-to-natal", "transit-to-transit"])
    .openapi({
        ref: "TypeOfAspect",
    });

export type TypeOfAspect = z.infer<typeof typeOfAspect>;

export const aspectObject = z
    .object({
        planet1: z.object({
            id: planetIdEnum,
            name: planetEnum,
            fromChart: z.string().optional(),
        }),
        planet2: z.object({
            id: planetIdEnum,
            name: planetEnum,
            fromChart: z.string().optional(),
        }),
        aspect: z.object({
            id: z.number().min(0).max(10),
            name: aspectEnum,
        }),
        orb: z.number(),
        typeOfAspect,
    })
    .openapi({
        ref: "AspectObject",
    });

export type AspectObject = z.infer<typeof aspectObject>;

export const declinationObject = z
    .object({
        id: planetIdEnum,
        name: planetEnum,
        declination: z.number(),
    })
    .openapi({
        ref: "DeclinationObject",
    });

export type DeclinationObject = z.infer<typeof declinationObject>;

export const ingressObject = z
    .object({
        planet: planetEnum,
        enteredSign: zodiacSignEnum,
    })
    .openapi({
        ref: "IngressObject",
    });

export type IngressObject = z.infer<typeof ingressObject>;
