import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetPetDetailsUseCase } from "@/use-cases/factories/make-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const params = paramsSchema.parse(request.params);

  try {
    const getPetDetailsUseCase = makeGetPetDetailsUseCase();

    const { pet } = await getPetDetailsUseCase.execute(params);

    return reply.status(200).send({
      pet: {
        ...pet,
        org: {
          ...pet.org,
          phone: Number(pet.org.phone),
        },
      },
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
