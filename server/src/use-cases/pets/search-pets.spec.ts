import { InMemoryAdoptionRequirementsRepository } from "@/repositories/in-memory/in-memory-adoption-requirements-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetGalleriesRepository } from "@/repositories/in-memory/in-memory-pet-galleries-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { PetParams } from "@/repositories/pets-repository";
import { makePet } from "@/utils/test/factories/make-pet";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetsUseCase } from "./search-pets";

let petsRepository: InMemoryPetsRepository;
let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository;
let petGalleriesRepository: InMemoryPetGalleriesRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: SearchPetsUseCase;

describe("Search Pets Use Case", () => {
  beforeEach(async () => {
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository();
    petGalleriesRepository = new InMemoryPetGalleriesRepository();
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(
      adoptionRequirementsRepository,
      petGalleriesRepository,
      orgsRepository
    );
    sut = new SearchPetsUseCase(petsRepository);

    await makePet(petsRepository, {
      name: "Caramelinho",
      city: "Indaiatuba",
    });
    await makePet(petsRepository, {
      city: "Indaiatuba",
    });
    await makePet(petsRepository);
  });

  it("should be able to list all pets available for adoption in a city", async () => {
    const city = "Indaiatuba";

    const { pets } = await sut.execute({ city });

    expect(pets).toHaveLength(2);
  });

  it("should be able to search pets by some parameters (age, energy, independence, size, type)", async () => {
    const city = "Indaiatuba";

    const { age, energy, independence, size, type } = petsRepository
      .items[0] as PetParams;

    const { pets } = await sut.execute({
      city,
      params: { age, energy, independence, size, type },
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ name: "Caramelinho" })]);
  });
});
