import axios from "axios";

export interface IResponseError {
  message: string;
}

export const api = axios.create({
  // baseURL: "http://192.168.15.187:3333",
  baseURL: "https://find-a-friend-api-srvo.onrender.com",
});
