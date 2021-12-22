import axios, { AxiosRequestConfig } from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: "/api",
    timeout: 9999,
  });

  instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.sessionStorage.getItem("token");
    return config;
  });

  return instance(config);
}
