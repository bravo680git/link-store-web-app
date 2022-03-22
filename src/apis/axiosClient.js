import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://link-store-bravo680.herokuapp.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem("authToken");
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
    switch (status) {
      case 400:
        return Promise.reject(errorData || "Bad request");
      case 401:
        return Promise.reject(errorData || "Unauthorzied");
      case 404:
        return Promise.reject(errorData || "Not Found");
      case 403:
        return Promise.reject(errorData || "No prohibit");
      case 500:
        return Promise.reject(errorData || "Internal server error");
    }
  }
);

export default axiosClient;
