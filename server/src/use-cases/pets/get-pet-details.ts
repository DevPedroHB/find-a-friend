import { env } from "@/env";
import { PetsRepository } from "@/repositories/pets-repository";
import { AdoptionRequirements, Org, Pet, PetGallery } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPetDetailsUseCaseRequest {
  id: string;
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet & {
    adoption_requirements: AdoptionRequirements[];
    pet_galleries: PetGallery[];
    org: Org;
  };
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return {
      pet: {
        ...pet,
        image_url: `${env.RENDER_EXTERNAL_URL}/images/${pet.image_url}`,
        pet_galleries: pet.pet_galleries.map((pet_gallery) => ({
          ...pet_gallery,
          image_url: `${env.RENDER_EXTERNAL_URL}/images/${pet_gallery.image_url}`,
        })),
      },
    };
  }
}
