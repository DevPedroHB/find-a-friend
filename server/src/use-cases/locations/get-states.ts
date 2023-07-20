import {
  IGetBrasilStates,
  LocationsRepository,
} from "@/repositories/locations-repository";

interface GetStatesUseCaseResponse {
  states: IGetBrasilStates[];
}

export class GetStatesUseCase {
  constructor(private locationsRepository: LocationsRepository) {}

  async execute(): Promise<GetStatesUseCaseResponse> {
    const states = await this.locationsRepository.getBrazilStates();

    return {
      states,
    };
  }
}
