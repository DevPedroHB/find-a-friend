import {
  IFindGeoLocationByCEP,
  LocationsRepository,
} from "@/repositories/locations-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface FetchGeoLocationUseCaseRequest {
  cep: number;
}

interface FetchGeoLocationUseCaseResponse {
  location: IFindGeoLocationByCEP;
}

export class FetchGeoLocationUseCase {
  constructor(private locationsRepository: LocationsRepository) {}

  async execute({
    cep,
  }: FetchGeoLocationUseCaseRequest): Promise<FetchGeoLocationUseCaseResponse> {
    const location = await this.locationsRepository.findGeoLocationByCEP(cep);

    if (!location) {
      throw new ResourceNotFoundError();
    }

    return {
      location,
    };
  }
}
