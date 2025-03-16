import { Hono } from "hono";

import { calculateJulianDate } from "@/lib/calculateJulianDate.ts";
import { getOrbitalAspects } from "@/lib/getOrbitalAspects.ts";

const app = new Hono();

app.get("/planetary-positions", (c) => {
    const yearString = c.req.query("year");
    const monthString = c.req.query("month");
    const dayString = c.req.query("day");
    const hourString = c.req.query("hour") || "0";
    const minuteString = c.req.query("minute") || "0";

    if (!yearString || !monthString || !dayString) {
        return c.json({
            error: "Missing required parameters",
        });
    }

    const year = parseInt(yearString);
    const month = parseInt(monthString);
    const day = parseInt(dayString);
    const hour = parseInt(hourString);
    const minute = parseInt(minuteString);

    const latitudeString = c.req.query("latitude");
    const longitudeString = c.req.query("longitude");

    if (!latitudeString || !longitudeString) {
        return c.json({
            error: "Missing required parameters",
        });
    }

    const birthDate = new Date(Date.UTC(year, month, day, hour, minute));
    const latitude = parseFloat(latitudeString);
    const longitude = parseFloat(longitudeString);

    const jd = calculateJulianDate(birthDate).value;

    const positions = getOrbitalAspects(jd, latitude, longitude);

    if (positions.isErr()) {
        return c.json({
            error: positions.error,
        });
    }

    return c.json(positions.value);
});

export default app;
