import { env } from "@/env";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeCreateAdoptionRequirementsUseCase } from "@/use-cases/factories/make-create-adoption-requirements-use-case";
import { makeCreatePetGalleriesUseCase } from "@/use-cases/factories/make-create-pet-galleries-use-case";
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(["cub", "adolescent", "elderly"]),
    energy: z.coerce.number(),
    size: z.enum(["small", "medium", "big"]),
    independence: z.enum(["low", "medium", "high"]),
    type: z.enum(["dog", "cat"]),
    requirements: z.string().transform((data) => JSON.parse(data) as string[]),
  });

  const { requirements, ...body } = bodySchema.parse(request.body);
  const org_id = request.user.sub;
  const images = request.files.map((file) => String(file.filename));

  try {
    if (images.length <= 0) {
      throw new ResourceNotFoundError();
    }

    if (requirements.length <= 0) {
      throw new ResourceNotFoundError();
    }

    const createPetUseCase = makeCreatePetUseCase();
    const createAdoptionRequirementsUseCase =
      makeCreateAdoptionRequirementsUseCase();
    const createPetGalleriesUseCase = makeCreatePetGalleriesUseCase();

    const { pet } = await createPetUseCase.execute({
      image_url: images[0],
      org_id,
      ...body,
    });

    await createAdoptionRequirementsUseCase.execute({
      requirements,
      pet_id: pet.id,
    });

    await createPetGalleriesUseCase.execute({
      images,
      pet_id: pet.id,
    });

    return reply.status(201).send({
      pet: {
        ...pet,
        image_url: `${env.APP_URL}/images/${pet.image_url}`,
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
