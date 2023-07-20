import { BrasilApiLocationsRepository } from "@/repositories/brasil-api/brasil-api-locations-repository";
import { FetchCitiesUseCase } from "../locations/fetch-cities";

export function makeFetchCitiesUseCase() {
  const locationsRepository = new BrasilApiLocationsRepository();

  const fetchCitiesUseCase = new FetchCitiesUseCase(locationsRepository);

  return fetchCitiesUseCase;
}
