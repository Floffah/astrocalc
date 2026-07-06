import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { logger } from "hono/logger";

import {
    baseResponse,
    calculateBirthChartResponse,
    calculateDailyTransitsResponse,
    calculateGenericTransitChartResponse,
    errorResponse,
} from "@/defs/responses.ts";
import { calculateBirthChart } from "@/lib/birthCharts/calculateBirthChart.ts";
import { calculateGenericTransitChart } from "@/lib/calculateGenericChart.ts";
import { calculateTransitsForDay } from "@/lib/calculateTransitsForDay.ts";
import { setSwissephPath } from "@/lib/swisseph.ts";

setSwissephPath();

const jsonContent = <Schema extends z.ZodType>(schema: Schema) => ({
    "application/json": {
        schema,
    },
});

const calculationErrorResponses = {
    400: {
        description: "User Error",
        content: jsonContent(errorResponse),
    },
    500: {
        description: "Calculation Error",
        content: jsonContent(errorResponse),
    },
};

const birthChartQuery = z.object({
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
    day: z.coerce.number().min(1).max(31).describe("The UTC day of birth"),
    hour: z.coerce
        .number()
        .min(0)
        .max(23)
        .default(0)
        .optional()
        .describe("The UTC hour of birth"),
    minute: z.coerce
        .number()
        .min(0)
        .max(59)
        .default(0)
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
});

const dailyTransitsQuery = z.object({
    birthYear: z.coerce
        .number()
        .min(1900)
        .max(2100)
        .optional()
        .describe("The UTC year of birth"),
    birthMonth: z.coerce
        .number()
        .min(1)
        .max(12)
        .optional()
        .describe("The UTC month of birth. NOT zero-indexed"),
    birthDay: z.coerce
        .number()
        .min(1)
        .max(31)
        .optional()
        .describe("The UTC day of birth"),
    birthMinute: z.coerce
        .number()
        .min(0)
        .max(59)
        .default(0)
        .optional()
        .describe("The UTC minute of birth"),
    birthHour: z.coerce
        .number()
        .min(0)
        .max(23)
        .default(0)
        .optional()
        .describe("The UTC hour of birth"),
    birthLatitude: z.coerce
        .number()
        .min(-90)
        .max(90)
        .optional()
        .describe("The latitude of the birth location"),
    birthLongitude: z.coerce
        .number()
        .min(-180)
        .max(180)
        .optional()
        .describe("The longitude of the birth location"),
    transitYear: z.coerce
        .number()
        .min(1900)
        .max(2100)
        .optional()
        .describe("The UTC year to calculate transits for"),
    transitMonth: z.coerce
        .number()
        .min(1)
        .max(12)
        .optional()
        .describe("The UTC month to calculate transits for. NOT zero-indexed"),
    transitDay: z.coerce
        .number()
        .min(1)
        .max(31)
        .optional()
        .describe("The UTC day to calculate transits for"),
    transitLatitude: z.coerce
        .number()
        .min(-90)
        .max(90)
        .describe("The latitude of the location to calculate transits for"),
    transitLongitude: z.coerce
        .number()
        .min(-180)
        .max(180)
        .describe("The longitude of the location to calculate transits for"),
});

const genericChartQuery = z.object({
    year: z.coerce
        .number()
        .min(1900)
        .max(2100)
        .describe("The UTC year to calculate transits for"),
    month: z.coerce
        .number()
        .min(1)
        .max(12)
        .describe("The UTC month to calculate transits for. NOT zero-indexed"),
    day: z.coerce
        .number()
        .min(1)
        .max(31)
        .describe("The UTC day to calculate transits for"),
    hour: z.coerce
        .number()
        .min(0)
        .max(23)
        .default(12)
        .optional()
        .describe("The UTC hour to calculate transits for"),
    minute: z.coerce
        .number()
        .min(0)
        .max(59)
        .default(0)
        .optional()
        .describe("The UTC minute to calculate transits for"),
});

const birthChartRoute = createRoute({
    method: "get",
    path: "/birth-chart",
    operationId: "calculateBirthChart",
    description:
        "This endpoint calculates a birth chart for a given date, time, and location. It will give information such as: signs, houses, and aspects of the planets.",
    summary: "Calculate a birth chart",
    request: {
        query: birthChartQuery,
    },
    responses: {
        200: {
            description: "OK",
            content: jsonContent(
                baseResponse.extend({
                    data: calculateBirthChartResponse,
                }),
            ),
        },
        ...calculationErrorResponses,
    },
});

const dailyTransitsRoute = createRoute({
    method: "get",
    path: "/daily-transits",
    operationId: "calculateDailyTransits",
    description:
        "This endpoint calculates the transits for a given day at a given location. Useful for generating horoscopes.\n\nIf birth date is omitted you just get a chart for the current day along with ingresses and retrogrades, but no comparative aspects.",
    summary: "Calculate daily transits",
    request: {
        query: dailyTransitsQuery,
    },
    responses: {
        200: {
            description: "OK",
            content: jsonContent(
                baseResponse.extend({
                    data: calculateDailyTransitsResponse,
                }),
            ),
        },
        ...calculationErrorResponses,
    },
});

const genericChartRoute = createRoute({
    method: "get",
    path: "/generic-chart",
    operationId: "calculateGenericTransitChart",
    description:
        "This endpoint calculates the transits for a given date but does not require a location or birth data.\n\n**Do not use this for personalised horoscopes**",
    summary: "Calculate a generic transit chart",
    request: {
        query: genericChartQuery,
    },
    responses: {
        200: {
            description: "OK",
            content: jsonContent(
                baseResponse.extend({
                    data: calculateGenericTransitChartResponse,
                }),
            ),
        },
        ...calculationErrorResponses,
    },
});

const app = new OpenAPIHono({
    defaultHook: (result, c) => {
        if (result.success) {
            return;
        }

        return c.json(
            {
                success: false as const,
                error: {
                    issues: result.error.issues.map((issue) => ({
                        code: issue.code,
                        message: issue.message,
                        path: issue.path.map(String),
                    })),
                    name: "ZodError",
                },
            },
            400,
        );
    },
});

if (process.env.NODE_ENV !== "test") {
    app.use(logger());
}

app.get("/healthz", (c) => c.json({ status: "ok" }));

app.openapi(birthChartRoute, (c) => {
    const { year, minute, day, hour, month, latitude, longitude } =
        c.req.valid("query");

    const birthDate = new Date(
        Date.UTC(year, month - 1, day, hour ?? 0, minute ?? 0),
    );

    const chart = calculateBirthChart(birthDate, latitude, longitude);

    if (chart.isErr()) {
        return c.json(
            {
                success: false as const,
                error: chart.error,
            },
            500,
        );
    }

    return c.json(
        {
            success: true,
            data: chart.value,
        },
        200,
    );
});

app.openapi(dailyTransitsRoute, (c) => {
    const {
        birthYear,
        birthMinute,
        birthDay,
        birthHour,
        birthMonth,
        birthLatitude,
        birthLongitude,
        transitYear,
        transitMonth,
        transitDay,
        transitLatitude,
        transitLongitude,
    } = c.req.valid("query");

    let transitDate: Date = new Date();

    if (transitYear && transitMonth && transitDay) {
        transitDate = new Date(
            Date.UTC(transitYear, transitMonth - 1, transitDay),
        );
    }

    let birthDate: Date | null = null;

    if (birthYear && birthMonth && birthDay) {
        birthDate = new Date(
            Date.UTC(
                birthYear,
                birthMonth - 1,
                birthDay,
                birthHour ?? 0,
                birthMinute ?? 0,
            ),
        );
    }

    const transits = calculateTransitsForDay(
        transitDate,
        transitLatitude,
        transitLongitude,
        birthDate,
        birthLatitude ?? null,
        birthLongitude ?? null,
    );

    if (transits.isErr()) {
        return c.json(
            {
                success: false as const,
                error: transits.error,
            },
            500,
        );
    }

    return c.json(
        {
            success: true,
            data: transits.value,
        },
        200,
    );
});

app.openapi(genericChartRoute, (c) => {
    const { year, month, day, hour, minute } = c.req.valid("query");

    const transitDate = new Date(
        Date.UTC(year, month - 1, day, hour ?? 12, minute ?? 0),
    );

    const transits = calculateGenericTransitChart(transitDate);

    if (transits.isErr()) {
        return c.json(
            {
                success: false as const,
                error: transits.error,
            },
            500,
        );
    }

    return c.json(
        {
            success: true,
            data: transits.value,
        },
        200,
    );
});

const openapiServers = [
    {
        description: "Production server",
        url: "https://astrocalc-api.onrender.com",
    },
];

if (process.env.NODE_ENV !== "production") {
    openapiServers.push({
        description: "Local server",
        url: "http://localhost:3001",
    });
}

app.doc31("/openapi.json", {
    openapi: "3.1.0",
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
    servers: openapiServers,
    security: [],
});

app.get(
    "/",
    Scalar({
        pageTitle: "Astrocalc API Reference",
        slug: "astrocalc-api",
        url: "/openapi.json",
        theme: "bluePlanet",
        baseServerURL: "https://astrocalc-api.onrender.com",
        servers: openapiServers,
    }),
);

export default app;
