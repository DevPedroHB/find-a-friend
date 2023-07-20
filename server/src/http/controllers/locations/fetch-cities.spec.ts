import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Fetch Cities (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch cities", async () => {
    const response = await request(app.server).get("/locations/cities/SP");

    expect(response.statusCode).toEqual(200);
    expect(response.body.cities).toHaveLength(645);
  });
});
