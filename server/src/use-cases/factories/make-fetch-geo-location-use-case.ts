import { BrasilApiLocationsRepository } from "@/repositories/brasil-api/brasil-api-locations-repository";
import { FetchGeoLocationUseCase } from "../locations/fetch-geo-location";

export function makeFetchGeoLocationUseCase() {
  const locationsRepository = new BrasilApiLocationsRepository();

  const fetchGeoLocationUseCase = new FetchGeoLocationUseCase(
    locationsRepository
  );

  return fetchGeoLocationUseCase;
}
