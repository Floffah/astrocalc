import { err, ok } from "neverthrow";

export enum ZodiacSign {
    Aries = "Aries",
    Taurus = "Taurus",
    Gemini = "Gemini",
    Cancer = "Cancer",
    Leo = "Leo",
    Virgo = "Virgo",
    Libra = "Libra",
    Scorpio = "Scorpio",
    Sagittarius = "Sagittarius",
    Capricorn = "Capricorn",
    Aquarius = "Aquarius",
    Pisces = "Pisces",
}

export function getZodiacSignForDegrees(degrees: number) {
    const idx = Math.floor(degrees / 30);

    switch (idx) {
        case 0:
            return ok(ZodiacSign.Aries);
        case 1:
            return ok(ZodiacSign.Taurus);
        case 2:
            return ok(ZodiacSign.Gemini);
        case 3:
            return ok(ZodiacSign.Cancer);
        case 4:
            return ok(ZodiacSign.Leo);
        case 5:
            return ok(ZodiacSign.Virgo);
        case 6:
            return ok(ZodiacSign.Libra);
        case 7:
            return ok(ZodiacSign.Scorpio);
        case 8:
            return ok(ZodiacSign.Sagittarius);
        case 9:
            return ok(ZodiacSign.Capricorn);
        case 10:
            return ok(ZodiacSign.Aquarius);
        case 11:
            return ok(ZodiacSign.Pisces);
        default:
            return err("Invalid degrees");
    }
}

export function getZodiacSignCusp(degrees: number) {
    const remainder = degrees % 30;

    if (remainder > 28) {
        return getZodiacSignForDegrees((degrees + 5) % 360);
    } else if (remainder < 2) {
        return getZodiacSignForDegrees((degrees + 355) % 360);
    } else {
        return ok(null);
    }
}

export function getZodiacFromLongitude(longitude: number) {
    const zodiacSigns = [
        { id: 0, name: "Aries", lord: { id: 4, name: "Mars" } },
        { id: 1, name: "Taurus", lord: { id: 2, name: "Venus" } },
        { id: 2, name: "Gemini", lord: { id: 3, name: "Mercury" } },
        { id: 3, name: "Cancer", lord: { id: 1, name: "Moon" } },
        { id: 4, name: "Leo", lord: { id: 0, name: "Sun" } },
        { id: 5, name: "Virgo", lord: { id: 3, name: "Mercury" } },
        { id: 6, name: "Libra", lord: { id: 2, name: "Venus" } },
        { id: 7, name: "Scorpio", lord: { id: 4, name: "Mars" } },
        { id: 8, name: "Sagittarius", lord: { id: 5, name: "Jupiter" } },
        { id: 9, name: "Capricorn", lord: { id: 6, name: "Saturn" } },
        { id: 10, name: "Aquarius", lord: { id: 6, name: "Saturn" } },
        { id: 11, name: "Pisces", lord: { id: 5, name: "Jupiter" } },
    ];

    const signIndex = Math.floor(longitude / 30);
    const degreeInSign = longitude % 30;

    return {
        longitude,
        degree: degreeInSign,
        zodiac: zodiacSigns[signIndex],
    };
}
