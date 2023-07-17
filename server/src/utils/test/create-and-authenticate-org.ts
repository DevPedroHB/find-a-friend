import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const response = await request(app.server).post("/orgs/sign-in").send({
    email: "adote_pets@email.com",
    password: "123456",
  });

  const { token } = response.body;

  return {
    token,
  };
}
