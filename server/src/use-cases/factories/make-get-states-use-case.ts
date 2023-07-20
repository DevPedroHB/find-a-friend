import { BrasilApiLocationsRepository } from "@/repositories/brasil-api/brasil-api-locations-repository";
import { GetStatesUseCase } from "../locations/get-states";

export function makeGetStatesUseCase() {
  const locationsRepository = new BrasilApiLocationsRepository();

  const getStatesUseCase = new GetStatesUseCase(locationsRepository);

  return getStatesUseCase;
}
