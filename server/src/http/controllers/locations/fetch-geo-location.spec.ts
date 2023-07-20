import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Fetch Geo Location (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch geo location", async () => {
    const response = await request(app.server).get("/locations/geo/13346360");

    expect(response.statusCode).toEqual(200);
    expect(response.body.location.city).toEqual("Indaiatuba");
  });
});
