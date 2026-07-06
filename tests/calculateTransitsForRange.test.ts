import { describe, expect, test } from "bun:test";

import type { CalculateTransitRangeResponse } from "@/defs/responses.ts";
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

function validParams() {
    const params = new URLSearchParams();

    params.set("birthYear", "2000");
    params.set("birthMonth", "1");
    params.set("birthDay", "1");
    params.set("birthHour", "5");
    params.set("birthMinute", "30");
    params.set("birthLatitude", "50.123456");
    params.set("birthLongitude", "3.123456");

    params.set("transitStartYear", "2025");
    params.set("transitStartMonth", "3");
    params.set("transitStartDay", "10");
    params.set("transitEndYear", "2025");
    params.set("transitEndMonth", "3");
    params.set("transitEndDay", "16");
    params.set("transitLatitude", "50.123456");
    params.set("transitLongitude", "3.123456");
    params.set("timezone", "UTC");

    return params;
}

function normalizeSamples(
    samples: CalculateTransitRangeResponse["transitNatalEvents"][number]["samples"],
) {
    return samples.map(({ orb: _, ...sample }) => sample);
}

function normalizeNatalEvents(
    events: CalculateTransitRangeResponse["transitNatalEvents"],
) {
    return events
        .slice(0, 12)
        .map(
            ({
                minimumOrb: _,
                orbAtStart: _1,
                orbAtEnd: _2,
                importance: _3,
                samples,
                ...event
            }) => ({
                ...event,
                samples: normalizeSamples(samples),
            }),
        );
}

function normalizeTransitEvents(
    events: CalculateTransitRangeResponse["transitTransitEvents"],
) {
    return events
        .slice(0, 12)
        .map(
            ({
                minimumOrb: _,
                orbAtStart: _1,
                orbAtEnd: _2,
                importance: _3,
                samples,
                ...event
            }) => ({
                ...event,
                samples: normalizeSamples(samples),
            }),
        );
}

function normalizeMoonEvents(
    events: CalculateTransitRangeResponse["moonEvents"],
) {
    return events.map((event) => ({
        date: event.date,
        moonSign: {
            value: event.moonSign.value,
            cuspWarning: event.moonSign.cuspWarning,
            phase: event.moonSign.phase,
            isVoidOfCourse: event.moonSign.isVoidOfCourse,
        },
        voidOfCourseWindows: event.voidOfCourseWindows,
        majorMoonAspects: event.majorMoonAspects.map(
            ({ orb: _, ...aspect }) => aspect,
        ),
    }));
}

describe("Valid", () => {
    test("Call calculateTransitsForRange with valid parameters", async () => {
        const res = await app.request(
            "/transits/range?" + validParams().toString(),
        );
        const body = (await res.json()) as CalculateTransitRangeResponse;

        expect(body).toBeObject();
        expect(body.range).toEqual({
            startDate: "2025-03-10",
            endDate: "2025-03-16",
            timezone: "UTC",
        });
        expect(body.summaryData.sampleCount).toBe(7);
        expect(body.transitNatalEvents.length).toBeGreaterThan(0);
        expect(body.transitTransitEvents.length).toBeGreaterThan(0);
        expect(body.moonEvents).toHaveLength(7);

        expect({
            dominantPlanets: body.summaryData.dominantPlanets.map(
                ({ score: _, ...item }) => item,
            ),
            dominantHouses: body.summaryData.dominantHouses.map(
                ({ score: _, ...item }) => item,
            ),
            dominantSigns: body.summaryData.dominantSigns.map(
                ({ score: _, ...item }) => item,
            ),
            dominantAspectTypes: body.summaryData.dominantAspectTypes.map(
                ({ score: _, ...item }) => item,
            ),
        }).toMatchSnapshot();

        expect(normalizeNatalEvents(body.transitNatalEvents)).toMatchSnapshot();
        expect(
            normalizeTransitEvents(body.transitTransitEvents),
        ).toMatchSnapshot();
        expect(body.ingresses).toMatchSnapshot();
        expect(
            body.retrogrades.map(({ degree: _, ...retrograde }) => retrograde),
        ).toMatchSnapshot();
        expect(normalizeMoonEvents(body.moonEvents)).toMatchSnapshot();
    });
});

describe("Invalid", () => {
    test("Call calculateTransitsForRange with missing parameters", async () => {
        const params = new URLSearchParams();

        params.set("birthYear", "2000");
        params.set("birthMonth", "1");
        params.set("birthDay", "1");
        params.set("transitLatitude", "50.123456");
        params.set("transitLongitude", "3.123456");

        const res = await app.request("/transits/range?" + params.toString());

        expect(res.status).toBe(400);
        expectIssuePaths(await res.json(), [
            "birthHour",
            "birthMinute",
            "birthLatitude",
            "birthLongitude",
            "transitStartYear",
            "transitStartMonth",
            "transitStartDay",
            "transitEndYear",
            "transitEndMonth",
            "transitEndDay",
        ]);
    });

    test("Call calculateTransitsForRange with invalid range order", async () => {
        const params = validParams();

        params.set("transitStartDay", "16");
        params.set("transitEndDay", "10");

        const res = await app.request("/transits/range?" + params.toString());

        expect(res.status).toBe(400);
        expect(await res.json()).toEqual({
            error: "Transit start date must be before or equal to end date",
        });
    });
});
