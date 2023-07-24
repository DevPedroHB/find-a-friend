export interface States {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}

interface IResponse {
  states: States[];
}

export async function getStates(): Promise<IResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/locations/states`,
  );

  return response.json();
}
