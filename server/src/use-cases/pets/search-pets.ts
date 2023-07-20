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
    const appURL = env.APP_URL ? env.APP_URL : "http://localhost:3333";

    return {
      pets: pets.map((pet) => ({
        ...pet,
        image_url: `${appURL}/images/${pet.image_url}`,
      })),
    };
  }
}
