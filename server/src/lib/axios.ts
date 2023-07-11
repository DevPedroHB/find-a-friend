import axios from "axios";

export const locationApi = axios.create({
  baseURL: "https://brasilapi.com.br/api",
});
