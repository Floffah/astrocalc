import { Hono } from "hono";
import { logger } from "hono/logger";

import { calculateBirthChart } from "@/lib/birthCharts/calculateBirthChart.ts";
import { setSwissephPath } from "@/lib/swisseph.ts";

setSwissephPath();

const app = new Hono();

app.use(logger());

app.get("/", (c) =>
    c.text("See API specifications at https://floffah.github.io/astrocalc/"),
);

app.get("/birth-chart", async (c) => {
    const yearString = c.req.query("year");
    const monthString = c.req.query("month");
    const dayString = c.req.query("day");
    const hourString = c.req.query("hour") || "0";
    const minuteString = c.req.query("minute") || "0";

    if (!yearString || !monthString || !dayString) {
        return c.json(
            {
                error: "Missing required parameters",
            },
            400,
        );
    }

    const year = parseInt(yearString);
    const month = parseInt(monthString);
    const day = parseInt(dayString);
    const hour = parseInt(hourString);
    const minute = parseInt(minuteString);

    const latitudeString = c.req.query("latitude");
    const longitudeString = c.req.query("longitude");

    if (!latitudeString || !longitudeString) {
        return c.json(
            {
                error: "Missing required parameters",
            },
            400,
        );
    }

    const birthDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

    const latitude = parseFloat(latitudeString);
    const longitude = parseFloat(longitudeString);

    const chart = calculateBirthChart(birthDate, latitude, longitude);

    if (chart.isErr()) {
        return c.json(
            {
                error: chart.error,
            },
            500,
        );
    }

    return c.json(chart.value);
});

app.get("/healthz", (c) => c.json({ status: "ok" }));

export default app;
