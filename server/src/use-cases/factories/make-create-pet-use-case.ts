import { BrasilApiLocationsRepository } from "@/repositories/brasil-api/brasil-api-locations-repository";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetUseCase } from "../pets/create-pet";

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrgsRepository();
  const locationsRepository = new BrasilApiLocationsRepository();

  const createPetUseCase = new CreatePetUseCase(
    petsRepository,
    orgsRepository,
    locationsRepository
  );

  return createPetUseCase;
}
