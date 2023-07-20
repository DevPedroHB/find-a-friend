import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    city: z.string(),
  });

  const querySchema = z.object({
    age: z.enum(["cub", "adolescent", "elderly"]).optional(),
    energy: z.number().min(0).optional(),
    independence: z.enum(["low", "medium", "high"]).optional(),
    size: z.enum(["small", "medium", "big"]).optional(),
    type: z.enum(["dog", "cat"]).optional(),
  });

  const params = paramsSchema.parse(request.params);
  const query = querySchema.parse(request.query);

  const searchPetsUseCase = makeSearchPetsUseCase();

  const { pets } = await searchPetsUseCase.execute({
    ...params,
    params: query,
  });

  return reply.status(200).send({
    pets,
  });
}
