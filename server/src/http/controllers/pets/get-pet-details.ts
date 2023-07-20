import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetPetDetailsUseCase } from "@/use-cases/factories/make-get-pet-details-use-case";
import { removeProperties } from "@/utils/remove-properties";
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
        ...removeProperties(pet, ["org_id"], {
          objects: ["org.password_hash"],
          arrays: ["adoption_requirements.pet_id", "pet_galleries.pet_id"],
        }),
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
