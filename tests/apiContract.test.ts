import { describe, expect, test } from "bun:test";

import app from "@/index.ts";

type ApiIssue = {
    code: string;
    message: string;
    path: string[];
};

type ErrorBody = {
    success: false;
    error: {
        issues: ApiIssue[];
    };
};

function query(params: Record<string, string>) {
    return new URLSearchParams(params).toString();
}

async function expectJson<T>(res: Response, status: number) {
    expect(res.status).toBe(status);
    expect(res.headers.get("content-type")).toStartWith("application/json");

    return (await res.json()) as T;
}

function expectSuccessfulEnvelope(body: unknown) {
    expect(body).toBeObject();
    expect(body).toHaveProperty("success", true);
    expect(body).toHaveProperty("data");
}

function expectValidationIssuePaths(body: ErrorBody, paths: string[]) {
    expect(body.success).toBe(false);
    expect(body.error.issues).toBeArray();

    const actualPaths = body.error.issues.map((issue) => issue.path.join("."));

    for (const path of paths) {
        expect(actualPaths).toContain(path);
    }
}

describe("API contract", () => {
    test("health check returns a stable JSON response", async () => {
        const res = await app.request("/healthz");
        const body = await expectJson<{ status: string }>(res, 200);

        expect(body).toEqual({ status: "ok" });
    });

    test("unknown paths return 404", async () => {
        const res = await app.request("/does-not-exist");

        expect(res.status).toBe(404);
    });

    test("unsupported methods return 404", async () => {
        const res = await app.request("/birth-chart", { method: "POST" });

        expect(res.status).toBe(404);
    });
});

describe("Birth chart endpoint contract", () => {
    test("accepts required query parameters and applies optional time defaults", async () => {
        const res = await app.request(
            "/birth-chart?" +
                query({
                    year: "2000",
                    month: "1",
                    day: "1",
                    latitude: "50.123456",
                    longitude: "3.123456",
                }),
        );

        const body = await expectJson<{
            success: true;
            data: {
                signs: {
                    sun: { value: string; cuspWarning: string | null };
                    moon: {
                        value: string;
                        cuspWarning: string | null;
                        phase: string;
                        isVoidOfCourse: boolean;
                    };
                    ascendant: { value: string; cuspWarning: string | null };
                };
                houses: unknown[];
                planets: {
                    id: number;
                    name: string;
                    houseNumber: number;
                    isRetrograde: boolean;
                }[];
                angles: unknown[];
                aspects: unknown[];
                declinations: unknown[];
            };
        }>(res, 200);

        expectSuccessfulEnvelope(body);
        expect(body.data.signs.sun.value).toBe("Capricorn");
        expect(body.data.signs.moon).toMatchObject({
            value: "Scorpio",
            phase: "Waxing Crescent",
            isVoidOfCourse: false,
        });
        expect(body.data.houses).toHaveLength(12);
        expect(body.data.planets).toHaveLength(14);
        expect(body.data.angles).toHaveLength(4);
        expect(body.data.aspects.length).toBeGreaterThan(0);
        expect(body.data.declinations.length).toBeGreaterThan(0);

        for (const planet of body.data.planets) {
            expect(planet.houseNumber).toBeGreaterThanOrEqual(1);
            expect(planet.houseNumber).toBeLessThanOrEqual(12);
        }
    });

    test("rejects missing location parameters with validation details", async () => {
        const res = await app.request(
            "/birth-chart?" +
                query({
                    year: "2000",
                    month: "1",
                    day: "1",
                }),
        );

        const body = await expectJson<ErrorBody>(res, 400);

        expectValidationIssuePaths(body, ["latitude", "longitude"]);
    });

    test("rejects out-of-range query parameters with validation details", async () => {
        const res = await app.request(
            "/birth-chart?" +
                query({
                    year: "2200",
                    month: "18",
                    day: "-5",
                    hour: "24",
                    minute: "60",
                    latitude: "100",
                    longitude: "-190",
                }),
        );

        const body = await expectJson<ErrorBody>(res, 400);

        expectValidationIssuePaths(body, [
            "year",
            "month",
            "day",
            "hour",
            "minute",
            "latitude",
            "longitude",
        ]);
    });
});

describe("Generic chart endpoint contract", () => {
    test("accepts required query parameters and applies default noon time", async () => {
        const res = await app.request(
            "/generic-chart?" +
                query({
                    year: "2000",
                    month: "1",
                    day: "1",
                }),
        );

        const body = await expectJson<{
            success: true;
            data: {
                chart: {
                    signs: {
                        sun: { value: string };
                        moon: { value: string; phase: string };
                    };
                    planets: { name: string; houseNumber?: number }[];
                    aspects: unknown[];
                    declinations: unknown[];
                };
                notableEvents: {
                    retrogradePlanets: string[];
                    ingresses: unknown[];
                };
            };
        }>(res, 200);

        expectSuccessfulEnvelope(body);
        expect(body.data.chart.signs.sun.value).toBe("Capricorn");
        expect(body.data.chart.signs.moon).toMatchObject({
            value: "Scorpio",
            phase: "Waxing Crescent",
        });
        expect(body.data.chart.planets).toHaveLength(14);
        expect(body.data.chart.planets[0]).not.toHaveProperty("houseNumber");
        expect(body.data.chart.aspects.length).toBeGreaterThan(0);
        expect(body.data.chart.declinations.length).toBeGreaterThan(0);
        expect(body.data.notableEvents.retrogradePlanets).toBeArray();
        expect(body.data.notableEvents.ingresses).toBeArray();
    });

    test("rejects missing required date parameters", async () => {
        const res = await app.request(
            "/generic-chart?" +
                query({
                    year: "2000",
                    month: "1",
                }),
        );

        const body = await expectJson<ErrorBody>(res, 400);

        expectValidationIssuePaths(body, ["day"]);
    });
});

describe("Daily transits endpoint contract", () => {
    test("allows transit-only requests without natal comparison data", async () => {
        const res = await app.request(
            "/daily-transits?" +
                query({
                    transitYear: "2025",
                    transitMonth: "3",
                    transitDay: "13",
                    transitLatitude: "50.123456",
                    transitLongitude: "3.123456",
                }),
        );

        const body = await expectJson<{
            success: true;
            data: {
                transitChart: {
                    houses: unknown[];
                    planets: unknown[];
                    angles: unknown[];
                };
                transitNatalAspects: unknown[] | null;
                notableEvents: {
                    retrogradePlanets: string[];
                    ingresses: unknown[];
                };
            };
        }>(res, 200);

        expectSuccessfulEnvelope(body);
        expect(body.data.transitChart.houses).toHaveLength(12);
        expect(body.data.transitChart.planets).toHaveLength(14);
        expect(body.data.transitChart.angles).toHaveLength(4);
        expect(body.data.transitNatalAspects).toBeNull();
        expect(body.data.notableEvents.retrogradePlanets).toBeArray();
        expect(body.data.notableEvents.ingresses).toBeArray();
    });

    test("returns natal comparison aspects when full birth data is supplied", async () => {
        const res = await app.request(
            "/daily-transits?" +
                query({
                    birthYear: "2000",
                    birthMonth: "1",
                    birthDay: "1",
                    birthLatitude: "50.123456",
                    birthLongitude: "3.123456",
                    transitYear: "2025",
                    transitMonth: "3",
                    transitDay: "13",
                    transitLatitude: "50.123456",
                    transitLongitude: "3.123456",
                }),
        );

        const body = await expectJson<{
            success: true;
            data: {
                transitNatalAspects: unknown[] | null;
            };
        }>(res, 200);

        expectSuccessfulEnvelope(body);
        expect(body.data.transitNatalAspects).toBeArray();
        expect(body.data.transitNatalAspects?.length).toBeGreaterThan(0);
    });

    test("rejects missing transit location parameters", async () => {
        const res = await app.request(
            "/daily-transits?" +
                query({
                    transitYear: "2025",
                    transitMonth: "3",
                    transitDay: "13",
                }),
        );

        const body = await expectJson<ErrorBody>(res, 400);

        expectValidationIssuePaths(body, ["transitLatitude", "transitLongitude"]);
    });
});

describe("Documentation contract", () => {
    test("serves the Scalar API reference HTML", async () => {
        const res = await app.request("/");
        const html = await res.text();

        expect(res.status).toBe(200);
        expect(res.headers.get("content-type")).toStartWith("text/html");
        expect(html).toContain("Astrocalc API Reference");
        expect(html).toContain("/openapi.json");
    });

    test("serves an OpenAPI document for the public calculation routes", async () => {
        const res = await app.request("/openapi.json");
        const body = await expectJson<{
            openapi: string;
            info: { title: string; version: string; license: { name: string } };
            servers: { description: string; url: string }[];
            paths: Record<
                string,
                {
                    get?: {
                        operationId?: string;
                        responses?: Record<string, unknown>;
                        parameters?: { name: string; in: string; required?: boolean }[];
                    };
                }
            >;
            components?: { schemas?: Record<string, unknown> };
        }>(res, 200);

        expect(body.openapi).toBe("3.1.0");
        expect(body.info).toMatchObject({
            title: "Astrocalc API",
            version: "0.0.0",
            license: { name: "AGPL-3.0" },
        });
        expect(body.servers).toContainEqual({
            description: "Production server",
            url: "https://astrocalc-api.onrender.com",
        });
        expect(body.servers).toContainEqual({
            description: "Local server",
            url: "http://localhost:3001",
        });

        expect(Object.keys(body.paths).sort()).toEqual([
            "/birth-chart",
            "/daily-transits",
            "/generic-chart",
        ]);

        expect(body.paths["/birth-chart"]?.get?.operationId).toBe(
            "calculateBirthChart",
        );
        expect(body.paths["/daily-transits"]?.get?.operationId).toBe(
            "calculateDailyTransits",
        );
        expect(body.paths["/generic-chart"]?.get?.operationId).toBe(
            "calculateGenericTransitChart",
        );

        for (const path of [
            "/birth-chart",
            "/daily-transits",
            "/generic-chart",
        ]) {
            expect(body.paths[path]?.get?.responses).toHaveProperty("200");
            expect(body.paths[path]?.get?.responses).toHaveProperty("400");
        }

        expect(body.components?.schemas).toHaveProperty(
            "CalculateBirthChartResponse",
        );
        expect(body.components?.schemas).toHaveProperty(
            "CalculateDailyTransitsResponse",
        );
        expect(body.components?.schemas).toHaveProperty(
            "CalculateGenericTransitChartResponse",
        );
        expect(body.components?.schemas).toHaveProperty("ErrorResponse");
    });
});
