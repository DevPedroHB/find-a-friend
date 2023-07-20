import { BrasilApiLocationsRepository } from "@/repositories/brasil-api/brasil-api-locations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { FetchGeoLocationUseCase } from "./fetch-geo-location";

let locationsRepository: BrasilApiLocationsRepository;
let sut: FetchGeoLocationUseCase;

describe("Fetch Geo Location Use Case", () => {
  beforeEach(async () => {
    locationsRepository = new BrasilApiLocationsRepository();
    sut = new FetchGeoLocationUseCase(locationsRepository);
  });

  it("should be able to fetch geo location", async () => {
    const cep = 13346360;

    const { location } = await sut.execute({ cep });

    expect(location.city).toEqual("Indaiatuba");
  });

  it("should not be able to fetch geo location with wrong cep", async () => {
    await expect(() =>
      sut.execute({
        cep: 12345678,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
