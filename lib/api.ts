import { config } from "process";
import axios from "axios";
import { storeAccessToken, getAccessToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

//Request interceptor: Adds the access token to every request
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response interceptor: Handles the refresh token logic
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    //if the error is 401 and it's not a retry request
    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh') {
      originalRequest._retry = true;

      try {
        console.log("Interceptor: Attempting to refresh token...")
        //Call refresh token endpoint
        const { data } = await axios.get("http://localhost:8080/auth/refresh", {
          withCredentials: true,
        });
        //Store the new access token
        const newAccessToken = data.access_token;
        storeAccessToken(newAccessToken);

        //Update the Authorization Header
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        //retry the origianl request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Interceptor: Session refresh failed.", refreshError);
        //Handle refresh token failure
        storeAccessToken("");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
