import type { ZodiacDetailsObject } from "@/defs";
import { Planet, ZodiacSign } from "@/defs/enums.ts";

export function getZodiacSignForDegrees(degrees: number) {
    const sign = zodiacSigns[Math.floor(degrees / 30)]?.name;

    if (!sign) {
        throw new RangeError("Invalid degrees");
    }

    return sign;
}

export function getZodiacSignCusp(degrees: number) {
    const remainder = degrees % 30;

    if (remainder > 28) {
        return getZodiacSignForDegrees((degrees + 5) % 360);
    } else if (remainder < 2) {
        return getZodiacSignForDegrees((degrees + 355) % 360);
    } else {
        return null;
    }
}

const zodiacSigns = [
    { id: 0, name: ZodiacSign.Aries, lord: { id: 4, name: Planet.Mars } },
    { id: 1, name: ZodiacSign.Taurus, lord: { id: 2, name: Planet.Venus } },
    {
        id: 2,
        name: ZodiacSign.Gemini,
        lord: { id: 3, name: Planet.Mercury },
    },
    { id: 3, name: ZodiacSign.Cancer, lord: { id: 1, name: Planet.Moon } },
    { id: 4, name: ZodiacSign.Leo, lord: { id: 0, name: Planet.Sun } },
    {
        id: 5,
        name: ZodiacSign.Virgo,
        lord: { id: 3, name: Planet.Mercury },
    },
    { id: 6, name: ZodiacSign.Libra, lord: { id: 2, name: Planet.Venus } },
    { id: 7, name: ZodiacSign.Scorpio, lord: { id: 4, name: Planet.Mars } },
    {
        id: 8,
        name: ZodiacSign.Sagittarius,
        lord: { id: 5, name: Planet.Jupiter },
    },
    {
        id: 9,
        name: ZodiacSign.Capricorn,
        lord: { id: 6, name: Planet.Saturn },
    },
    {
        id: 10,
        name: ZodiacSign.Aquarius,
        lord: { id: 6, name: Planet.Saturn },
    },
    {
        id: 11,
        name: ZodiacSign.Pisces,
        lord: { id: 5, name: Planet.Jupiter },
    },
] as ZodiacDetailsObject[];

export function getZodiacFromLongitude(longitude: number) {
    const signIndex = Math.floor(longitude / 30);
    const degreeInSign = longitude % 30;

    return {
        longitude,
        degree: degreeInSign,
        zodiac: zodiacSigns[signIndex]!,
    };
}
