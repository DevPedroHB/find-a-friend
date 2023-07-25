export type TState = {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
};

export interface IResponseStates {
  states: TState[];
}

export type TCity = {
  nome: string;
  codigo_ibge: string;
};

export interface IResponseCities {
  cities: TCity[];
}
