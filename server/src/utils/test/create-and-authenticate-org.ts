import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      address: "123 Main Street",
      cep: 13346360,
      phone: 19991994368,
      password_hash: await hash("123456", 6),
    },
  });

  const response = await request(app.server).post("/orgs/sign-in").send({
    email: "johndoe@example.com",
    password: "123456",
  });

  const { token } = response.body;

  return {
    token,
  };
}
