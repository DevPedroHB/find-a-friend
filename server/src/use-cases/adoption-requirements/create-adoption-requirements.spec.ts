import { InMemoryAdoptionRequirementsRepository } from "@/repositories/in-memory/in-memory-adoption-requirements-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { makePet } from "@/utils/test/factories/make-pet";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { CreateAdoptionRequirementsUseCase } from "./create-adoption-requirements";

let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: CreateAdoptionRequirementsUseCase;

describe("Create Adoption Requirements Use Case", () => {
  beforeEach(() => {
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository();
    petsRepository = new InMemoryPetsRepository(adoptionRequirementsRepository);
    sut = new CreateAdoptionRequirementsUseCase(
      adoptionRequirementsRepository,
      petsRepository
    );
  });

  it("should be able to create a new adoption requirements", async () => {
    const petCreated = await makePet(petsRepository);

    const adoptionRequirements = [
      {
        title: "Adoption requirements",
        pet_id: petCreated.id,
      },
      {
        title: "Adoption requirements",
        pet_id: petCreated.id,
      },
    ];

    const { adoption_requirements } = await sut.execute({
      adoptionRequirements,
    });

    expect(adoption_requirements).toHaveLength(2);
  });

  it("should not be able to create a new adoption requirements with wrong pet_id", async () => {
    const adoptionRequirements = [
      {
        title: "Adoption requirements",
        pet_id: "non-existing-id",
      },
      {
        title: "Adoption requirements",
        pet_id: "non-existing-id",
      },
    ];

    await expect(() =>
      sut.execute({ adoptionRequirements })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
