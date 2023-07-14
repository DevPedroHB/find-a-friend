import { locationApi } from "@/lib/axios";
import {
  IFindBrasilCitysByState,
  IFindBrasilStates,
  IFindGeoLocationByCEP,
  LocationsRepository,
} from "../locations-repository";

export class ExternalLocationRepository implements LocationsRepository {
  async findBrasilStates() {
    const { data: states } = await locationApi.get<IFindBrasilStates[]>(
      "/ibge/uf/v1"
    );

    return states;
  }

  async findBrasilCitysByState(ufCode: string) {
    const { data: cities } = await locationApi.get<IFindBrasilCitysByState[]>(
      `/ibge/municipios/v1/${ufCode}`
    );

    return cities;
  }

  async findGeoLocationByCEP(cep: number) {
    const { data: location } = await locationApi.get<IFindGeoLocationByCEP>(
      `/cep/v2/${cep}`
    );

    return location;
  }
}
