import { ExternalLocationRepository } from "@/repositories/external/external-locations-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { CreatePetUseCase } from "./create-pet";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let locationsRepository: ExternalLocationRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    locationsRepository = new ExternalLocationRepository();
    sut = new CreatePetUseCase(
      petsRepository,
      orgsRepository,
      locationsRepository
    );
  });

  it("should be able to create a new pet", async () => {
    const orgCreated = await orgsRepository.create({
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      address: "123 Main Street",
      cep: 13346360,
      phone: 19991994368,
      password_hash: await hash("123456", 6),
    });

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
