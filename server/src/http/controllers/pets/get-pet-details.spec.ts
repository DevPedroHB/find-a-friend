import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Pet Details (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get pet details", async () => {
    const response = await request(app.server).get(
      "/pets/details/137d9eb5-aae2-4aa2-958a-525ec830dde9"
    );

    console.log(response.body);

    expect(response.statusCode).toEqual(200);
  });
});
