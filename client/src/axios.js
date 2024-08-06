
import axios from "axios";

const backendURL = "http://localhost:8800/Api/"

export const makeRequest = axios.create({
  baseURL: `${backendURL}`,
  withCredentials: true,
}); 