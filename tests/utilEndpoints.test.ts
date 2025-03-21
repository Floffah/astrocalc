import { expect, test } from "bun:test";

import app from "@/index.ts";

test("Ensure healthz endpoint is working", async () => {
    const res = await app.request("/healthz");

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "ok" });
});
