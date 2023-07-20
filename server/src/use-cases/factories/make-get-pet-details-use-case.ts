import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetDetailsUseCase } from "../pets/get-pet-details";

export function makeGetPetDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository();

  const getPetDetailsUseCase = new GetPetDetailsUseCase(petsRepository);

  return getPetDetailsUseCase;
}
