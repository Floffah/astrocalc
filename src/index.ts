import { Hono } from "hono";

import { getBirthChart } from "@/lib/getBirthChart.ts";

const app = new Hono();

app.get("/birth-chart", async (c) => {
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

    const birthDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

    const latitude = parseFloat(latitudeString);
    const longitude = parseFloat(longitudeString);

    const chart = getBirthChart(birthDate, latitude, longitude);

    if (chart.isErr()) {
        return c.json({
            error: chart.error,
        });
    }

    return c.json(chart.value);
});

export default app;
