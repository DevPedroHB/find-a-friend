import { api } from "@/lib/axios";
import { IResponseStates } from "@/models/locations";

export async function getStates() {
  const { data } = await api.get<IResponseStates>("/locations/states");

  return data;
}
