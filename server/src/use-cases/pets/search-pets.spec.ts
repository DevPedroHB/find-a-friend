import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { PetParams } from "@/repositories/pets-repository";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetsUseCase } from "./search-pets";

let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;

describe("Search Pets Use Case", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new SearchPetsUseCase(petsRepository);

    await petsRepository.create({
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

    await petsRepository.create({
      name: "Yoda",
      age: "adolescent",
      size: "small",
      city: "Sao Paulo",
      description: "Um companheiro para todas as horas",
      energy: 5,
      independence: "low",
      type: "cat",
      org_id: randomUUID(),
      image_url: "yoda.jpeg",
    });
  });

  it("should be able to list all pets available for adoption in a city", async () => {
    const city = "Indaiatuba";

    const { pets } = await sut.execute({ city });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ name: "Caramelinho" })]);
  });

  it("should be able to search pets by some parameters (age, energy, independence, size, type)", async () => {
    const city = "Indaiatuba";

    const params: PetParams = {
      age: "cub",
      energy: 3,
      independence: "high",
      size: "medium",
      type: "dog",
    };

    const { pets } = await sut.execute({ city, params });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ name: "Caramelinho" })]);
  });
});
