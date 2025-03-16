type XYZ = [number, number, number];

interface VsopTerm {
    index: number;
    coefficients: number[];
    amplitude: number;
    phase: number;
    frequency: number;
    reference: number;
}

interface VSOPPlanetData {
    X: VsopTerm[];
    Y: VsopTerm[];
    Z: VsopTerm[];
}

export function getHeliocentricCoordinates(
    vsopData: VSOPPlanetData,
    jd: number,
): XYZ {
    const T = getTimeVariable(jd);

    const x = calculateVSOPCoordinate(vsopData.X, T);
    const y = calculateVSOPCoordinate(vsopData.Y, jd);
    const z = calculateVSOPCoordinate(vsopData.Z, jd);

    return [x, y, z];
}

// Julian centuries from J2000:
function getTimeVariable(jd: number): number {
    return (jd - 2451545.0) / 365250;
}

// Calculation for individual coordinates (X, Y, Z)
function calculateVSOPCoordinate(terms: VsopTerm[], jd: number): number {
    const T = getTimeVariable(jd);
    let coordinate = 0;

    for (const term of terms) {
        const argument = term.phase + term.frequency * T;
        coordinate += term.amplitude * Math.cos(argument);
    }

    return coordinate;
}

export function heliocentricToGeocentric(planetXYZ: XYZ, earthXYZ: XYZ): XYZ {
    return [
        planetXYZ[0] - earthXYZ[0], // X
        planetXYZ[1] - earthXYZ[1], // Y
        planetXYZ[2] - earthXYZ[2], // Z
    ];
}

export function rectangularToSpherical([X, Y, Z]: XYZ): {
    longitude: number;
    latitude: number;
} {
    const r = Math.sqrt(X * X + Y * Y + Z * Z);
    const longitude = Math.atan2(Y, X);
    const latitude = Math.asin(Z / Math.sqrt(X * X + Y * Y + Z * Z));

    return {
        longitude, // radians
        latitude, // radians
    };
}

export function radiansToDegrees(radians: number): number {
    return radians * (180 / Math.PI);
}

export function normalizeDegrees(degrees: number): number {
    return (degrees + 360) % 360;
}
