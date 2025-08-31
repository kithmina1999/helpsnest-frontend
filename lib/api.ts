import { config } from 'process';
import axios from "axios";
import {storeAccessToken,getAccessToken} from './auth';


const api = axios.create({
    baseURL:"http://localhost:8080",
});

//Request interceptor: Adds the access token to every request
api.interceptors.request.use(
    (config)=>{
        const token = getAccessToken();
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`; 
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

//Response interceptor: Handles the refresh token logic
api.interceptors.response.use(
    (response)=>{
        return response;
    },
    async (error)=>{
        const originalRequest = error.config;

        //if the error is 401 and it's not a retry request
        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try {
                //Call refresh token endpoint
                const {data} = await axios.post("http://localhost:8080/auth/refresh",{
                    withCredentials:true,
                });
                //Store the new access token
                const newAccessToken = data.accessToken;
                storeAccessToken(newAccessToken);

                //Update the Authorization Header
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                //retry the origianl request
                return axios(originalRequest);
            } catch (refreshError) {
                //Handle refresh token failure
                console.error("Session expired, please log in again.", refreshError);
                window.location.href = "/auth/sign-in";  
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default api;