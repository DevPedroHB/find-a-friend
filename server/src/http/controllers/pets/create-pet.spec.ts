import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new pet", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Caramelinho")
      .field("description", "Um doguinho para quem tem muito amor para dar")
      .field("age", "cub")
      .field("energy", "3")
      .field("size", "medium")
      .field("independence", "high")
      .field("type", "dog")
      .field(
        "requirements",
        JSON.stringify(["Requirement 1", "Requirement 2", "Requirement 3"])
      )
      .attach("images", "src/utils/images/caramelinho.jpeg");

    expect(response.statusCode).toEqual(201);
  });
});
