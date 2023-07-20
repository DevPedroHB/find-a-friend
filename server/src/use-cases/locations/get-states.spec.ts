import { BrasilApiLocationsRepository } from "@/repositories/brasil-api/brasil-api-locations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetStatesUseCase } from "./get-states";

let locationsRepository: BrasilApiLocationsRepository;
let sut: GetStatesUseCase;

describe("Get States Use Case", () => {
  beforeEach(async () => {
    locationsRepository = new BrasilApiLocationsRepository();
    sut = new GetStatesUseCase(locationsRepository);
  });

  it("should be able to get states", async () => {
    const { states } = await sut.execute();

    expect(states).toHaveLength(27);
  });
});
