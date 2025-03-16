import { Hono } from "hono";

import { calculateJulianDate } from "@/lib/calculateJulianDate.ts";
import { getPlanetaryPositionsForDate } from "@/lib/getPlanetaryPositionsForDate.ts";

const app = new Hono();

app.get("/birth-chart", (c) => {
    const birthDate = new Date(Date.UTC(2004, 12, 17, 4, 21));
    const latitude = 56.119911;
    const longitude = -3.17311;

    const jd = calculateJulianDate(birthDate);
    //
    // const marsHeliocentric = getHeliocentricCoordinates(mars as any, jd);
    // const earthHeliocentric = getHeliocentricCoordinates(earth as any, jd);
    //
    // const geocentric = heliocentricToGeocentric(
    //     marsHeliocentric,
    //     earthHeliocentric,
    // );
    //
    // const spherical = rectangularToSpherical(geocentric);
    //
    // const lonDegrees = radiansToDegrees(spherical.longitude);
    //
    // const zodiacPosition = getZodiacSign(lonDegrees);
    //
    // return c.json({
    //     jd,
    //     marsHeliocentric,
    //     earthHeliocentric,
    //     geocentric,
    //     zodiacPosition,
    // });

    return c.json({
        orbitalElements: getPlanetaryPositionsForDate(jd, latitude, longitude),
    });
});

export default app;
