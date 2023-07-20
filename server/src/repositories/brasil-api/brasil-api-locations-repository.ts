import { brasilApi } from "@/lib/axios";
import {
  IFindBrasilCitysByState,
  IFindGeoLocationByCEP,
  IGetBrasilStates,
  LocationsRepository,
} from "../locations-repository";

export class BrasilApiLocationsRepository implements LocationsRepository {
  async getBrazilStates() {
    const { data: states } = await brasilApi.get<IGetBrasilStates[]>(
      "/ibge/uf/v1"
    );

    return states;
  }

  async findBrazilCitiesByState(uf_code: string) {
    try {
      const { data: cities } = await brasilApi.get<IFindBrasilCitysByState[]>(
        `/ibge/municipios/v1/${uf_code}`
      );

      return cities;
    } catch (error) {
      return null;
    }
  }

  async findGeoLocationByCEP(cep: number) {
    try {
      const { data: location } = await brasilApi.get<IFindGeoLocationByCEP>(
        `/cep/v2/${cep}`
      );

      return location;
    } catch (error) {
      return null;
    }
  }
}
