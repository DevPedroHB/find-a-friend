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
    `https://find-a-friend-api-srvo.onrender.com/locations/states`,
  );

  return response.json();
}
