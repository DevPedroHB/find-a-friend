import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SearchPetsUseCase } from "../pets/search-pets";

export function makeSearchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();

  const searchPetsUseCase = new SearchPetsUseCase(petsRepository);

  return searchPetsUseCase;
}
