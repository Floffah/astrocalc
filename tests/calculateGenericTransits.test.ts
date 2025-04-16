import { describe, expect, test } from "bun:test";

import type { CalculateGenericTransitChartResponse } from "@/defs/responses.ts";
import app from "@/index.ts";

describe("Valid", () => {
    test("Call calculateGenericChart with valid parameters", async () => {
        const params = new URLSearchParams();

        params.set("year", "2000");
        params.set("month", "1");
        params.set("day", "1");
        params.set("hour", "5");
        params.set("minute", "30");

        const res = await app.request("/generic-chart?" + params.toString());

        const body = (await res.json()) as {
            data: CalculateGenericTransitChartResponse;
        };

        expect(body.data).toBeObject();
        expect(body.data.chart.signs).toMatchObject({
            moon: {
                cuspWarning: null,
                isVoidOfCourse: false,
                phase: "Waxing Crescent",
                value: "Scorpio",
            },
            sun: {
                cuspWarning: null,
                value: "Capricorn",
            },
        });

        expect(
            body.data.chart.planets.map(
                ({ degree: _, latitude: _1, longitude: _2, ...planet }) =>
                    planet,
            ),
        ).toMatchSnapshot();

        expect(
            body.data.chart.aspects.map(({ orb: _, ...aspect }) => aspect),
        ).toMatchSnapshot();

        expect(
            body.data.chart.declinations.map(
                ({ orb: _, ...declination }) => declination,
            ),
        ).toMatchSnapshot();

        expect(body.data.notableEvents).toMatchSnapshot();
    });
});
