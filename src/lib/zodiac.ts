const zodiacSigns = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
];

export function getZodiacSign(degree: number): {
    sign: string;
    degree: number;
} {
    const normalizedDegree = ((degree % 360) + 360) % 360;
    const signIndex = Math.floor(normalizedDegree / 30);
    const signDegree = normalizedDegree % 30;

    return {
        sign: zodiacSigns[signIndex]!,
        degree: signDegree,
    };
}
