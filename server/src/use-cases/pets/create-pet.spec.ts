import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetUseCase } from "./create-pet";

let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(petsRepository);
  });

  it("should be able to create a new pet", async () => {
    const { pet } = await sut.execute({
      name: "Caramelinho",
      age: "cub",
      size: "medium",
      city: "Sao Paulo",
      description: "Um doguinho para quem tem muito amor para dar",
      energy: 3,
      independence: "high",
      type: "dog",
      org_id: randomUUID(),
      image_url: "caramelinho.jpeg",
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
