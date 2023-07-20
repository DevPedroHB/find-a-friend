export interface IGetBrasilStates {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}

export interface IFindBrasilCitysByState {
  nome: string;
  codigo_ibge: string;
}

export interface IFindGeoLocationByCEP {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location: {
    type: string;
    coordinates: {
      longitude: string;
      latitude: string;
    };
  };
}

export interface LocationsRepository {
  getBrazilStates(): Promise<IGetBrasilStates[]>;
  findBrazilCitiesByState(
    uf_code: string
  ): Promise<IFindBrasilCitysByState[] | null>;
  findGeoLocationByCEP(cep: number): Promise<IFindGeoLocationByCEP | null>;
}
