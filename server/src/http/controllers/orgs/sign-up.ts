import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { makeSignUpUseCase } from "@/use-cases/factories/make-orgs-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const signUpBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    address: z.string(),
    cep: z.coerce.number(),
    phone: z.coerce.number(),
    password: z.string().min(6),
  });

  const { name, email, address, cep, phone, password } = signUpBodySchema.parse(
    request.body
  );

  try {
    const signUpUseCase = makeSignUpUseCase();

    await signUpUseCase.execute({ name, email, address, cep, phone, password });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    throw error;
  }
}
