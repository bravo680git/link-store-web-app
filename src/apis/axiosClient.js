import axios from "axios";
import { handleReloadApp } from "../ultils/functions";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => status < 400,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token =
      sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  async (error) => Promise.reject(new Error(error))
);

axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data;
    }
  },
  async (error) => {
    const status = error.response?.status || 500;
    const errorData = error.response?.data;
    const originalConfig = error.config;

    switch (status) {
      case 400:
        return Promise.reject(errorData || "Bad request");
      case 401:
        if (!originalConfig._retry) {
          originalConfig._retry = true;
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            handleReloadApp();
          }

          await axiosClient
            .post("/auth/refreshToken", { refreshToken })
            .then((res) => {
              localStorage.setItem("authToken", res.authToken);
              localStorage.setItem("refreshToken", res.refreshToken);
              originalConfig.headers = {
                Authorization: `Bearer ${res.authToken}`,
              };
            })
            .catch((err) => {
              console.log(err);
              handleReloadApp();
            });
        }
        return axiosClient(originalConfig);
      case 403:
        return Promise.reject(errorData || "Forbidden");
      case 404:
        return Promise.reject(errorData || "Not Found");
      case 500:
        return Promise.reject(errorData || "Internal server error");
      default:
    }
  }
);

export default axiosClient;
