import { PrismaPetGalleriesRepository } from "@/repositories/prisma/prisma-pet-galleries-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetGalleriesUseCase } from "../pet-galleries/create-pet-galleries";

export function makeCreatePetGalleriesUseCase() {
  const petGalleriesRepository = new PrismaPetGalleriesRepository();
  const petsRepository = new PrismaPetsRepository();

  const createPetGalleriesUseCase = new CreatePetGalleriesUseCase(
    petGalleriesRepository,
    petsRepository
  );

  return createPetGalleriesUseCase;
}
