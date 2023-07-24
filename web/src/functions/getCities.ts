export interface Cities {
  nome: string;
  codigo_ibge: string;
}

interface IResponse {
  cities: Cities[];
}

export async function getCities(uf_code: string): Promise<IResponse> {
  const response = await fetch(
    `https://find-a-friend-api-srvo.onrender.com/locations/cities/${uf_code}`,
  );

  return response.json();
}
