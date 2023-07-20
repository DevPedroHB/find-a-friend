import { FastifyInstance } from "fastify";
import { fetchCities } from "./fetch-cities";
import { fetchGeoLocation } from "./fetch-geo-location";
import { getStates } from "./get-states";

export async function locationsRoutes(app: FastifyInstance) {
  app.get("/states", getStates);
  app.get("/cities/:uf_code", fetchCities);
  app.get("/geo/:cep", fetchGeoLocation);
}
