import http from "./hhtpService";
import config from "../config.json";

const { apiUrl } = config;

const apiEndpoint = apiUrl + "/movies";

function movieUrl(movieId) {
  return `${apiEndpoint}/${movieId}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(movieUrl(movie));
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
