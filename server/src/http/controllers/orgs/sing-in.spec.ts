import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Sign-In (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to sign-in", async () => {
    await request(app.server).post("/orgs/sign-up").send({
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      address: "123 Main Street",
      cep: 13346360,
      phone: 19991994368,
      password: "123456",
    });

    const response = await request(app.server).post("/orgs/sign-in").send({
      email: "jhondoe@example.com",
      password: "123456",
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
