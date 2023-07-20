import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchCitiesUseCase } from "@/use-cases/factories/make-fetch-cities-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchCities(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    uf_code: z.string(),
  });

  const params = paramsSchema.parse(request.params);

  try {
    const fetchCitiesUseCase = makeFetchCitiesUseCase();

    const { cities } = await fetchCitiesUseCase.execute(params);

    return reply.status(200).send({
      cities,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }
}
