import { BrasilApiLocationsRepository } from "@/repositories/brasil-api/brasil-api-locations-repository";
import { FetchCitiesUseCase } from "../locations/fetch-cities";
import { FetchGeoLocationUseCase } from "../locations/fetch-geo-location";
import { GetStatesUseCase } from "../locations/get-states";

const locationsRepository = new BrasilApiLocationsRepository();

export function makeGetStatesUseCase() {
  const getStatesUseCase = new GetStatesUseCase(locationsRepository);

  return getStatesUseCase;
}

export function makeFetchCitiesUseCase() {
  const fetchCitiesUseCase = new FetchCitiesUseCase(locationsRepository);

  return fetchCitiesUseCase;
}

export function makeFetchGeoLocationUseCase() {
  const fetchGeoLocationUseCase = new FetchGeoLocationUseCase(
    locationsRepository
  );

  return fetchGeoLocationUseCase;
}
