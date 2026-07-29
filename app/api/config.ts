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
      const token =
        localStorage.getItem("accessToken") || localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.accesstoken = token;
      }
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        typeof window !== "undefined"
      ) {
        originalRequest._retry = true;
        try {
          const accessToken =
            localStorage.getItem("accessToken") ||
            localStorage.getItem("token") ||
            "";
          const refreshToken = localStorage.getItem("refreshToken") || "";

          if (accessToken && refreshToken) {
            const res = await axios.post(`${services.auth}/renewToken`, {
              accessToken,
              refreshToken,
            });

            const newAccessToken =
              res.data?.data?.accessToken || res.data?.accessToken;
            const newRefreshToken =
              res.data?.data?.refreshToken || res.data?.refreshToken;

            if (newAccessToken) {
              localStorage.setItem("accessToken", newAccessToken);
              localStorage.setItem("token", newAccessToken);
              if (newRefreshToken) {
                localStorage.setItem("refreshToken", newRefreshToken);
              }

              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return instance(originalRequest);
            }
          }
        } catch (renewError) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

const authPublicAPI = createPublicAPI(services.auth);
const authSecuredAPI = createSecuredApi(services.auth);
const userSecuredAPI = createSecuredApi(services.user);

export {
  authPublicAPI,
  authSecuredAPI,
  createPublicAPI,
  createSecuredApi,
  userSecuredAPI,
};
