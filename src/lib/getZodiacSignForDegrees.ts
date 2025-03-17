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
