import { api } from "@/lib/axios";
import { IResponseCities } from "@/models/locations";

export default async function fetchCities(uf_code: string) {
    const response = await api.get<IResponseCities>(
      `/locations/cities/${uf_code}`,
    );

    return response.data;
}
