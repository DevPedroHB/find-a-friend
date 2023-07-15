import { PetsRepository } from "@/repositories/pets-repository";
import { AdoptionRequirements, Pet, PetGallery } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPetDetailsUseCaseRequest {
  pet_id: string;
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet & {
    adoption_requirements: AdoptionRequirements[];
    pet_galleries: PetGallery[];
  };
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    pet_id,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(pet_id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return {
      pet,
    };
  }
}
