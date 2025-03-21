import { describe, expect, test } from "bun:test";

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

        expect(await res.json()).toMatchSnapshot();
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
