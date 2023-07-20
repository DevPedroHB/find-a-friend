import {
  IFindBrasilCitysByState,
  LocationsRepository,
} from "@/repositories/locations-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

interface FetchCitiesUseCaseRequest {
  uf_code: string;
}

interface FetchCitiesUseCaseResponse {
  cities: IFindBrasilCitysByState[];
}

export class FetchCitiesUseCase {
  constructor(private locationsRepository: LocationsRepository) {}

  async execute({
    uf_code,
  }: FetchCitiesUseCaseRequest): Promise<FetchCitiesUseCaseResponse> {
    const cities = await this.locationsRepository.findBrazilCitiesByState(
      uf_code
    );

    if (!cities) {
      throw new ResourceNotFoundError();
    }

    return {
      cities,
    };
  }
}
