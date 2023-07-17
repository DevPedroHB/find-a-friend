import { InMemoryAdoptionRequirementsRepository } from "@/repositories/in-memory/in-memory-adoption-requirements-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetGalleriesRepository } from "@/repositories/in-memory/in-memory-pet-galleries-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { makeAdoptionRequirements } from "@/utils/test/factories/make-adoption-requirements";
import { makeOrg } from "@/utils/test/factories/make-org";
import { makePet } from "@/utils/test/factories/make-pet";
import { makePetGalleries } from "@/utils/test/factories/make-pet-galleries";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { GetPetDetailsUseCase } from "./get-pet-details";

let petsRepository: InMemoryPetsRepository;
let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository;
let petGalleriesRepository: InMemoryPetGalleriesRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: GetPetDetailsUseCase;

describe("Get Pet Details Use Case", () => {
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
    sut = new GetPetDetailsUseCase(petsRepository);
  });

  it("should be able to get pet details", async () => {
    const orgCreated = await makeOrg(orgsRepository);
    const petCreated = await makePet(petsRepository, {
      org_id: orgCreated.id,
    });

    await makeAdoptionRequirements(adoptionRequirementsRepository, 3, {
      pet_id: petCreated.id,
    });

    await makePetGalleries(petGalleriesRepository, 3, {
      pet_id: petCreated.id,
    });

    const { pet } = await sut.execute({
      id: petCreated.id,
    });

    expect(pet.name).toEqual(petCreated.name);
  });

  it("should not be able to get pet details with wrong id", async () => {
    await expect(() =>
      sut.execute({
        id: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
