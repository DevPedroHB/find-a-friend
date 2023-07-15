import { PetGalleriesRepository } from "@/repositories/pet-galleries-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { PetGallery } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreatePetGalleriesUseCaseRequest {
  images: string[];
  pet_id: string;
}

interface CreatePetGalleriesUseCaseResponse {
  pet_galleries: PetGallery[];
}

export class CreatePetGalleriesUseCase {
  constructor(
    private petGalleriesRepository: PetGalleriesRepository,
    private petsRepository: PetsRepository
  ) {}

  async execute({
    images,
    pet_id,
  }: CreatePetGalleriesUseCaseRequest): Promise<CreatePetGalleriesUseCaseResponse> {
    const pet = await this.petsRepository.findById(pet_id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    const pet_galleries = await this.petGalleriesRepository.create(
      images,
      pet_id
    );

    return {
      pet_galleries,
    };
  }
}
