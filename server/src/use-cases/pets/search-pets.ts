import { PetParams, PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface SearchPetsRequest {
  city: string;
  params?: PetParams;
}

interface SearchPetsResponse {
  pets: Pet[];
}

export class SearchPets {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    params,
  }: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.searchMany(city, params);

    return {
      pets,
    };
  }
}
