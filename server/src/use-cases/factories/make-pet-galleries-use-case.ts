import { PrismaPetGalleriesRepository } from "@/repositories/prisma/prisma-pet-galleries-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetGalleriesUseCase } from "../pet-galleries/create-pet-galleries";

const petGalleriesRepository = new PrismaPetGalleriesRepository();

export function makeCreatePetGalleriesUseCase() {
  const petsRepository = new PrismaPetsRepository();

  const createPetGalleriesUseCase = new CreatePetGalleriesUseCase(
    petGalleriesRepository,
    petsRepository
  );

  return createPetGalleriesUseCase;
}
