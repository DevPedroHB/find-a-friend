export interface IFindBrasilStates {
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
  findBrasilStates(): Promise<IFindBrasilStates[]>;
  findBrasilCitysByState(uf_code: string): Promise<IFindBrasilCitysByState[]>;
  findGeoLocationByCEP(cep: number): Promise<IFindGeoLocationByCEP>;
}
