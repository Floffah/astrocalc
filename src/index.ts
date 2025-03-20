import { apiReference } from "@scalar/hono-api-reference";
import { Hono } from "hono";
import { describeRoute, openAPISpecs } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { logger } from "hono/logger";
import { z } from "zod";

import { calculateBirthChartResponse } from "@/defs/responses.ts";
import { calculateBirthChart } from "@/lib/birthCharts/calculateBirthChart.ts";
import { calculateTransitsForDay } from "@/lib/calculateTransitsForDay.ts";
import { setSwissephPath } from "@/lib/swisseph.ts";

setSwissephPath();

const app = new Hono();

app.use(logger());

app.get("/", (c) =>
    c.text("See API specifications at https://floffah.github.io/astrocalc/"),
);

app.get("/healthz", (c) => c.json({ status: "ok" }));

app.get(
    "/birth-chart",
    describeRoute({
        operationId: "calculateBirthChart",
        description:
            "This endpoint calculates a birth chart for a given date, time, and location. It will give information such as: signs, houses, and aspects of the planets.",
        summary: "Calculate a birth chart",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(calculateBirthChartResponse),
                    },
                },
            },
        },
    }),
    validator(
        "query",
        z.object({
            year: z.coerce
                .number()
                .min(1900)
                .max(2100)
                .describe("The UTC year of birth"),
            month: z.coerce
                .number()
                .min(1)
                .max(12)
                .describe("The UTC month of birth. NOT zero-indexed"),
            day: z.coerce
                .number()
                .min(1)
                .max(31)
                .describe("The UTC day of birth"),
            hour: z.coerce
                .number()
                .min(0)
                .max(23)
                .optional()
                .describe("The UTC hour of birth"),
            minute: z.coerce
                .number()
                .min(0)
                .max(59)
                .optional()
                .describe("The UTC minute of birth"),
            latitude: z.coerce
                .number()
                .min(-90)
                .max(90)
                .describe("The latitude of the birth location"),
            longitude: z.coerce
                .number()
                .min(-180)
                .max(180)
                .describe("The longitude of the birth location"),
        }),
    ),
    async (c) => {
        const { year, minute, day, hour, month, latitude, longitude } =
            c.req.valid("query");

        const birthDate = new Date(
            Date.UTC(year, month - 1, day, hour ?? 0, minute ?? 0),
        );

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
    },
);

app.get("/daily-transits", async (c) => {
    const currentDate = new Date();

    const yearString =
        c.req.query("year") || currentDate.getUTCFullYear().toString();
    const monthString =
        c.req.query("month") || (currentDate.getUTCMonth() + 1).toString();
    const dayString = c.req.query("day") || currentDate.getUTCDate().toString();

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

    const year = parseInt(yearString);
    const month = parseInt(monthString);
    const day = parseInt(dayString);

    const latitude = parseFloat(latitudeString);
    const longitude = parseFloat(longitudeString);

    const date = new Date(Date.UTC(year, month - 1, day));

    const transits = calculateTransitsForDay(date, latitude, longitude);

    if (transits.isErr()) {
        return c.json(
            {
                error: transits.error,
            },
            500,
        );
    }

    return c.json(transits.value);
});

app.get(
    "/openapi.json",
    openAPISpecs(app, {
        documentation: {
            info: {
                title: "Astrocalc API",
                version: "0.0.0",
                description:
                    "Astronomy & astrology microservice for working out planetary positions & birth charts",
                license: {
                    name: "AGPL-3.0",
                },
                contact: {
                    name: "Astrocalc Contributors",
                    url: "https://github.com/floffah/astrocalc",
                },
            },
            servers: ["https://astrocalc-api.onrender.com"],
            security: [],
        },
    }),
);

app.get(
    "/docs",
    apiReference({
        pageTitle: "Astrocalc API Reference",
        url: "/openapi.json",
    }),
);

export default app;
