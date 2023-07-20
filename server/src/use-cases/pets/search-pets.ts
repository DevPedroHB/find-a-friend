import { env } from "@/env";
import { PetParams, PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface SearchPetsUseCaseRequest {
  city: string;
  params?: PetParams;
}

interface SearchPetsUseCaseResponse {
  pets: Pet[];
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    params,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(city, params);

    return {
      pets: pets.map((pet) => ({
        ...pet,
        image_url: `${env.RENDER_EXTERNAL_URL}/images/${pet.image_url}`,
      })),
    };
  }
}
