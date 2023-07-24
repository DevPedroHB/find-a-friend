export interface Pet {
  id: string;
  name: string;
  description: string;
  city: string;
  age: string;
  energy: number;
  size: string;
  independence: string;
  type: string;
  image_url: string;
  org_id: string;
}

interface IResponse {
  pets: Pet[];
}

export async function getPets(city: string): Promise<IResponse> {
  const response = await fetch(
    `http://find-a-friend-api-srvo.onrender.com/pets/${city}`,
  );

  return response.json();
}
