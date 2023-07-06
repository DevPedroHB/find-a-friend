import { FastifyInstance } from "fastify";
import { signUp } from "./sign-up";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/sign-up", signUp);
}
