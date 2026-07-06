import { describe, expect, test } from "bun:test";

import type { CalculateDailyTransitsResponse } from "@/defs/responses.ts";
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
    test("Call calculateDailyTransits with valid parameters", async () => {
        const params = new URLSearchParams();

        params.set("birthYear", "2000");
        params.set("birthMonth", "1");
        params.set("birthDay", "1");
        params.set("birthLatitude", "50.123456");
        params.set("birthLongitude", "3.123456");

        params.set("transitYear", "2025");
        params.set("transitMonth", "3");
        params.set("transitDay", "13");
        params.set("transitLatitude", "50.123456");
        params.set("transitLongitude", "3.123456");

        const res = await app.request("/daily-transits?" + params.toString());
        const body = (await res.json()) as CalculateDailyTransitsResponse;

        expect(body.transitNatalAspects).toBeArray();
        expect(
            body.transitNatalAspects?.map(({ orb: _, ...value }) => value),
        ).toMatchSnapshot();

        expect(body.notableEvents).toMatchSnapshot();
    });
});

describe("Invalid", () => {
    test("Call calculateDailyTransits with missing parameters", async () => {
        const params = new URLSearchParams();

        params.set("birthYear", "2000");
        params.set("birthMonth", "1");
        params.set("birthDay", "1");
        params.set("birthLatitude", "50.123456");
        params.set("birthLongitude", "3.123456");

        const res = await app.request("/daily-transits?" + params.toString());

        expect(res.status).toBe(400);
        expectIssuePaths(await res.json(), [
            "transitLatitude",
            "transitLongitude",
        ]);
    });

    test("Call calculateDailyTransits with invalid parameters", async () => {
        const params = new URLSearchParams();

        params.set("birthYear", "2200");
        params.set("birthMonth", "18");
        params.set("birthDay", "-5");
        params.set("birthLatitude", "50.123456");
        params.set("birthLongitude", "3.123456");

        params.set("transitLatitude", "50.123456");
        params.set("transitLongitude", "3.123456");

        const res = await app.request("/daily-transits?" + params.toString());

        expect(res.status).toBe(400);
        expectIssuePaths(await res.json(), [
            "birthYear",
            "birthMonth",
            "birthDay",
        ]);
    });
});
