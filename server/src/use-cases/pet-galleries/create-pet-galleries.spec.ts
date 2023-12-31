import { InMemoryAdoptionRequirementsRepository } from "@/repositories/in-memory/in-memory-adoption-requirements-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetGalleriesRepository } from "@/repositories/in-memory/in-memory-pet-galleries-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { makeOrg } from "@/utils/test/factories/make-org";
import { makePet } from "@/utils/test/factories/make-pet";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { CreatePetGalleriesUseCase } from "./create-pet-galleries";

let petGalleriesRepository: InMemoryPetGalleriesRepository;
let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository;
let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: CreatePetGalleriesUseCase;

describe("Create Pet Galleries Use Case", () => {
  beforeEach(() => {
    petGalleriesRepository = new InMemoryPetGalleriesRepository();
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(
      adoptionRequirementsRepository,
      petGalleriesRepository,
      orgsRepository
    );
    sut = new CreatePetGalleriesUseCase(petGalleriesRepository, petsRepository);
  });

  it("should be able to create a new pet galleries", async () => {
    const orgCreated = await makeOrg(orgsRepository);
    const petCreated = await makePet(petsRepository, {
      org_id: orgCreated.id,
    });

    const images = ["Imagem 1", "Imagem 2", "Imagem 3"];

    const { pet_galleries } = await sut.execute({
      images,
      pet_id: petCreated.id,
    });

    expect(pet_galleries).toHaveLength(3);
  });

  it("should not be able to create a new pet galleries with wrong pet_id", async () => {
    const images = ["Imagem 1", "Imagem 2", "Imagem 3"];

    await expect(() =>
      sut.execute({
        images,
        pet_id: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
