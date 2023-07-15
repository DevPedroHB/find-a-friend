import { PrismaAdoptionRequirementsRepository } from "@/repositories/prisma/prisma-adoption-requirements-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreateAdoptionRequirementsUseCase } from "../adoption-requirements/create-adoption-requirements";

const adoptionRequirementsRepository =
  new PrismaAdoptionRequirementsRepository();

export function makeCreateAdoptionRequirementsUseCase() {
  const petsRepository = new PrismaPetsRepository();

  const createAdoptionRequirementsUseCase =
    new CreateAdoptionRequirementsUseCase(
      adoptionRequirementsRepository,
      petsRepository
    );

  return createAdoptionRequirementsUseCase;
}
