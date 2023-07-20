import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search pets by some parameters (city, age, energy, independence, size, type)", async () => {
    const response = await request(app.server).get("/pets/Sao Paulo?type=dog");

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(2);
  });
});
