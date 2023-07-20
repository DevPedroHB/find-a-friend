import axios from "axios";

export const brasilApi = axios.create({
  baseURL: "https://brasilapi.com.br/api",
});
