import { backendUrl } from "./constants";
import axios from "axios";

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const authAxios = axios.create();

authAxios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = "Bearer " + accessToken;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

authAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const url = `${backendUrl}/rpc/refreshToken/`;
                const refreshToken = localStorage.getItem("refreshToken");
                const { data: resData } = await axios.post(url, {
                    refreshToken,
                });
                // Successfully refreshed
                localStorage.setItem("accessToken", resData.accessToken);
                const accessToken = localStorage.getItem("accessToken");
                authAxios.defaults.headers.common["Authorization"] =
                    "Bearer " + accessToken;
                return authAxios(originalRequest);
            } catch (error) {
                // Refresh token failed too
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);
