import { ExternalLocationRepository } from "@/repositories/external/external-locations-repository";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetUseCase } from "../pets/create-pet";
import { GetPetDetailsUseCase } from "../pets/get-pet-details";
import { SearchPetsUseCase } from "../pets/search-pets";

const petsRepository = new PrismaPetsRepository();

export function makeCreatePetUseCae() {
  const orgsRepository = new PrismaOrgsRepository();
  const locationRepository = new ExternalLocationRepository();

  const createPetUseCase = new CreatePetUseCase(
    petsRepository,
    orgsRepository,
    locationRepository
  );

  return createPetUseCase;
}

export function makeGetPetDetailsUseCase() {
  const getPetDetailsUseCase = new GetPetDetailsUseCase(petsRepository);

  return getPetDetailsUseCase;
}

export function makeSearchPetsUseCase() {
  const searchPetsUseCase = new SearchPetsUseCase(petsRepository);

  return searchPetsUseCase;
}
