import { BrasilApiLocationsRepository } from "@/repositories/brasil-api/brasil-api-locations-repository";
import { InMemoryAdoptionRequirementsRepository } from "@/repositories/in-memory/in-memory-adoption-requirements-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetGalleriesRepository } from "@/repositories/in-memory/in-memory-pet-galleries-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { makeOrg } from "@/utils/test/factories/make-org";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { CreatePetUseCase } from "./create-pet";

let petsRepository: InMemoryPetsRepository;
let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository;
let petGalleriesRepository: InMemoryPetGalleriesRepository;
let orgsRepository: InMemoryOrgsRepository;
let locationsRepository: BrasilApiLocationsRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository();
    petGalleriesRepository = new InMemoryPetGalleriesRepository();
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(
      adoptionRequirementsRepository,
      petGalleriesRepository,
      orgsRepository
    );
    locationsRepository = new BrasilApiLocationsRepository();
    sut = new CreatePetUseCase(
      petsRepository,
      orgsRepository,
      locationsRepository
    );
  });

  it("should be able to create a new pet", async () => {
    const orgCreated = await makeOrg(orgsRepository);

    const { pet } = await sut.execute({
      name: "Caramelinho",
      age: "cub",
      size: "medium",
      description: "Um doguinho para quem tem muito amor para dar",
      energy: 3,
      independence: "high",
      type: "dog",
      org_id: orgCreated.id,
      image_url: "caramelinho.jpeg",
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be able to create a new pet with wrong ong_id", async () => {
    await expect(() =>
      sut.execute({
        name: "Caramelinho",
        age: "cub",
        size: "medium",
        description: "Um doguinho para quem tem muito amor para dar",
        energy: 3,
        independence: "high",
        type: "dog",
        org_id: "non-existing-id",
        image_url: "caramelinho.jpeg",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
