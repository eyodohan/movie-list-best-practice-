import http from "./hhtpService";
import config from "../config.json";

const { apiUrl } = config;

const apiEndpoint = apiUrl + "/genres";

export function getGenres() {
  return http.get(apiEndpoint);
}
