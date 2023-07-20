import { PrismaAdoptionRequirementsRepository } from "@/repositories/prisma/prisma-adoption-requirements-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreateAdoptionRequirementsUseCase } from "./../adoption-requirements/create-adoption-requirements";

export function makeCreateAdoptionRequirementsUseCase() {
  const adoptionRequirementsRepository =
    new PrismaAdoptionRequirementsRepository();
  const petsRepository = new PrismaPetsRepository();

  const createAdoptionRequirementsUseCase =
    new CreateAdoptionRequirementsUseCase(
      adoptionRequirementsRepository,
      petsRepository
    );

  return createAdoptionRequirementsUseCase;
}
