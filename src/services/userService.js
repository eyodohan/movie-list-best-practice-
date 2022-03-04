import http from "./hhtpService";
import config from "../config.json";

const { apiUrl } = config;
const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
