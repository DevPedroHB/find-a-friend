import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { GetPetDetailsUseCase } from "./get-pet-details";

let petsRepository: InMemoryPetsRepository;
let sut: GetPetDetailsUseCase;

describe("Get Pet Details Use Case", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetDetailsUseCase(petsRepository);
  });

  it("should be able to get pet details", async () => {
    const petCreated = await petsRepository.create({
      name: "Caramelinho",
      age: "cub",
      size: "medium",
      city: "Indaiatuba",
      description: "Um doguinho para quem tem muito amor para dar",
      energy: 3,
      independence: "high",
      type: "dog",
      org_id: randomUUID(),
      image_url: "caramelinho.jpeg",
    });

    const { pet } = await sut.execute({
      pet_id: petCreated.id,
    });

    expect(pet.name).toEqual("Caramelinho");
  });

  it("should not be able to get pet details with wrong id", async () => {
    await expect(() =>
      sut.execute({
        pet_id: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
