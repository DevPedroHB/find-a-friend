import { BrasilApiLocationsRepository } from "@/repositories/brasil-api/brasil-api-locations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { FetchCitiesUseCase } from "./fetch-cities";

let locationsRepository: BrasilApiLocationsRepository;
let sut: FetchCitiesUseCase;

describe("Fetch Cities Use Case", () => {
  beforeEach(async () => {
    locationsRepository = new BrasilApiLocationsRepository();
    sut = new FetchCitiesUseCase(locationsRepository);
  });

  it("should be able to fetch cities", async () => {
    const uf_code = "SP";

    const { cities } = await sut.execute({ uf_code });

    expect(cities).toHaveLength(645);
  });

  it("should not be able to fetch cities with wrong uf_code", async () => {
    await expect(() =>
      sut.execute({
        uf_code: "non-existing-uf-code",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
