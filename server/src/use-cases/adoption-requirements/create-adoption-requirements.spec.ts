import { InMemoryAdoptionRequirementsRepository } from "@/repositories/in-memory/in-memory-adoption-requirements-repository";
import { InMemoryPetGalleriesRepository } from "@/repositories/in-memory/in-memory-pet-galleries-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { makePet } from "@/utils/test/factories/make-pet";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { CreateAdoptionRequirementsUseCase } from "./create-adoption-requirements";

let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository;
let petGalleriesRepository: InMemoryPetGalleriesRepository;
let petsRepository: InMemoryPetsRepository;
let sut: CreateAdoptionRequirementsUseCase;

describe("Create Adoption Requirements Use Case", () => {
  beforeEach(() => {
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository();
    petGalleriesRepository = new InMemoryPetGalleriesRepository();
    petsRepository = new InMemoryPetsRepository(
      adoptionRequirementsRepository,
      petGalleriesRepository
    );
    sut = new CreateAdoptionRequirementsUseCase(
      adoptionRequirementsRepository,
      petsRepository
    );
  });

  it("should be able to create a new adoption requirements", async () => {
    const petCreated = await makePet(petsRepository);

    const requirements = [
      "Requerimento de adoção 1",
      "Requerimento de adoção 2",
      "Requerimento de adoção 3",
    ];

    const { adoption_requirements } = await sut.execute({
      requirements,
      pet_id: petCreated.id,
    });

    expect(adoption_requirements).toHaveLength(3);
  });

  it("should not be able to create a new adoption requirements with wrong pet_id", async () => {
    const requirements = [
      "Requerimento de adoção 1",
      "Requerimento de adoção 2",
      "Requerimento de adoção 3",
    ];

    await expect(() =>
      sut.execute({
        requirements,
        pet_id: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
