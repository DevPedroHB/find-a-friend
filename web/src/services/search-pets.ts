import { api } from "@/lib/axios";
import { IResponsePets } from "@/models/pets";

export default async function searchPets(city: string) {
  const response = await api.get<IResponsePets>(`/pets/${city}`);

  return response.data;
}
