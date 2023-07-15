import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyStatic from "@fastify/static";
import fastify from "fastify";
import multer from "fastify-multer";
import path from "path";
import { ZodError } from "zod";
import { env } from "./env";
import { orgsRoutes } from "./http/controllers/orgs/routes";

export const app = fastify();

app.register(cors);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(multer.contentParser);

app.register(fastifyStatic, {
  root: path.join(__dirname, "..", "uploads"),
  prefix: "/images/",
});

app.register(fastifyCookie);
app.register(orgsRoutes, { prefix: "/orgs" });

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error." });
});
