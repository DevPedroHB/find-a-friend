import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchGeoLocationUseCase } from "@/use-cases/factories/make-locations-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchGeoLocation(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    cep: z.coerce.number(),
  });

  const params = paramsSchema.parse(request.params);

  try {
    const fetchGeoLocationUseCase = makeFetchGeoLocationUseCase();

    const { location } = await fetchGeoLocationUseCase.execute(params);

    return reply.status(200).send({
      location,
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
