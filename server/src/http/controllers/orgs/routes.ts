import { FastifyInstance } from "fastify";
import { refreshToken } from "./refresh-token";
import { signUp } from "./sign-up";
import { signIn } from "./sing-in";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/sign-up", signUp);
  app.post("/sign-in", signIn);
  app.patch("/token/refresh", refreshToken);
}
