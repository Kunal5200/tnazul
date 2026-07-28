import axios, { InternalAxiosRequestConfig } from "axios";
import { services } from "./serverconstant";

const createPublicAPI = (baseURL: string) =>
  axios.create({
    baseURL,
  });

const createSecuredApi = (baseURL: string) => {
  const instance = axios.create({ baseURL });
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });
  return instance;
};

const authPublicAPI = createPublicAPI(services.auth);

export { authPublicAPI };
