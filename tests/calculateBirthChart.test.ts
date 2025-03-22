import { describe, expect, test } from "bun:test";

import type { CalculateBirthChartResponse } from "@/defs/responses.ts";
import app from "@/index.ts";

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
        const body = (await res.json()) as {
            data: CalculateBirthChartResponse;
        };

        expect(body.data).toBeObject();
        expect(body.data.signs).toMatchObject({
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
            body.data.angles.map(
                ({ degree: _, longitude: _1, ...angle }) => angle,
            ),
        ).toMatchSnapshot();

        expect(
            body.data.houses.map(
                ({
                    cusp: { degree: _, longitude: _1, ...cusp },
                    ...house
                }) => ({
                    ...house,
                    cusp,
                }),
            ),
        ).toMatchSnapshot();

        expect(
            body.data.planets.map(
                ({ degree: _, latitude: _1, longitude: _2, ...planet }) =>
                    planet,
            ),
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

        expect(await res.json()).toMatchSnapshot();
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

        expect(await res.json()).toMatchSnapshot();
    });
});
