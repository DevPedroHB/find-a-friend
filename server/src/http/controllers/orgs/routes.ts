import { FastifyInstance } from "fastify";
import { refreshToken } from "./refresh-token";
import { signIn } from "./sign-in";
import { signUp } from "./sign-up";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/sign-up", signUp);
  app.post("/sign-in", signIn);
  app.patch("/token/refresh", refreshToken);
}
