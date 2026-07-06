import { describe, expect, test } from "bun:test";

import type { CalculateBirthChartResponse } from "@/defs/responses.ts";
import app from "@/index.ts";

function expectIssuePaths(body: unknown, paths: string[]) {
    expect(body).toBeObject();
    expect(body).toHaveProperty("error");

    const issues = (body as { error: { issues: { path: string[] }[] } }).error
        .issues;

    expect(issues).toBeArray();

    const actualPaths = issues.map((issue) => issue.path.join("."));

    for (const path of paths) {
        expect(actualPaths).toContain(path);
    }
}

describe("Valid", () => {
    test("Call calculateBirthChart with valid parameters", async () => {
        const params = new URLSearchParams();

        params.set("year", "2000");
        params.set("month", "1");
        params.set("day", "1");
        params.set("hour", "5");
        params.set("minute", "30");

        params.set("latitude", "50.123456");
        params.set("longitude", "3.123456");

        const res = await app.request("/birth-chart?" + params.toString());
        const body = (await res.json()) as CalculateBirthChartResponse;

        expect(body).toBeObject();
        expect(body.signs).toMatchObject({
            ascendant: {
                value: "Sagittarius",
                cuspWarning: null,
            },
            moon: {
                value: "Scorpio",
                cuspWarning: null,
                isVoidOfCourse: false,
                phase: "Waxing Crescent",
            },
            sun: {
                value: "Capricorn",
                cuspWarning: null,
            },
        });
        expect(
            body.angles.map(({ degree: _, longitude: _1, ...angle }) => angle),
        ).toMatchSnapshot();

        expect(
            body.houses.map(
                ({ cusp: { degree: _, longitude: _1, ...cusp }, ...house }) => ({
                    ...house,
                    cusp,
                }),
            ),
        ).toMatchSnapshot();

        expect(
            body.planets.map(
                ({ degree: _, latitude: _1, longitude: _2, ...planet }) =>
                    planet,
            ),
        ).toMatchSnapshot();

        expect(body.aspects.map(({ orb: _, ...aspect }) => aspect)).toMatchSnapshot();

        expect(
            body.declinations.map(({ orb: _, ...declination }) => declination),
        ).toMatchSnapshot();
    });
});

describe("Invalid", () => {
    test("Call calculateBirthChart with missing parameters", async () => {
        const params = new URLSearchParams();

        params.set("year", "2000");
        params.set("month", "1");
        params.set("day", "1");
        params.set("hour", "5");
        params.set("minute", "30");

        const res = await app.request("/birth-chart?" + params.toString());

        expect(res.status).toBe(400);
        expectIssuePaths(await res.json(), ["latitude", "longitude"]);
    });

    test("Call calculateBirthChart with invalid parameters", async () => {
        const params = new URLSearchParams();

        params.set("year", "2200");
        params.set("month", "18");
        params.set("day", "-5");
        params.set("hour", "24");
        params.set("minute", "30");

        params.set("latitude", "50.123456");
        params.set("longitude", "3.123456");

        const res = await app.request("/birth-chart?" + params.toString());

        expect(res.status).toBe(400);
        expectIssuePaths(await res.json(), ["year", "month", "day", "hour"]);
    });
});
