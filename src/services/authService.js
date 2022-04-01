import http from "./hhtpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const { apiUrl } = config;
const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  getCurrentUser,
  logout,
  getJwt,
};
