import type { getOrbitalAspects } from "@/lib/getOrbitalAspects.ts";

export function getGeocentricPlanetaryPositions(
    orbitalAspects: ReturnType<typeof getOrbitalAspects>["value"],
) {
    const earthPosition = {
        lon: (orbitalAspects.sun.lon + 180) % 360, // Earth's heliocentric longitude (opposite to the Sun)
        r: orbitalAspects.sun.r, // Earth's distance from the Sun (same as Sun's geocentric distance)
        xe: -orbitalAspects.sun.xe, // Negate Sun’s equatorial coordinates
        ye: -orbitalAspects.sun.ye,
        ze: -orbitalAspects.sun.ze,
        xs: -orbitalAspects.sun.xs, // Negate Sun’s ecliptic coordinates
        ys: -orbitalAspects.sun.ys,
        zs: -orbitalAspects.sun.ze,
        RA: (orbitalAspects.sun.RA + 180) % 360, // Opposite of Sun's Right Ascension
        Dec: -orbitalAspects.sun.Dec, // Opposite of Sun's Declination
    };

    return {
        earth: earthPosition,
    };
}
