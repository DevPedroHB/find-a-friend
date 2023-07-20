import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get States (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get states", async () => {
    const response = await request(app.server).get("/locations/states");

    expect(response.statusCode).toEqual(200);
    expect(response.body.states).toHaveLength(27);
  });
});
