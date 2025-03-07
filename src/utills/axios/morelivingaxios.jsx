import axios from "axios";
import Cookies from "js-cookie";
import { checkAndUpdateLocation } from "../utility";
import { morelivingURL } from "../../config/config";

// Base URL for morefood API
const countryCode = await checkAndUpdateLocation();

const commonConfig = {
  baseURL: morelivingURL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "x-country-code": countryCode,
  },
};

// Create an axios instance without interceptors for unauthenticated requests
export const morelivingPublicAxios = axios.create({
  ...commonConfig,
});

// Create an axios instance with interceptors for authenticated requests
export const morelivingAuthenticatedAxios = axios.create({
  ...commonConfig,
});

// Add Authorization header if the token is available
morelivingAuthenticatedAxios.interceptors.request.use(
     (config) => {
        const token = "Bearer " + Cookies.get("moretechglobal_access");
    
        if (token) {
          config.headers.authorization = token;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
);

// Handle response errors for the authenticated instance
morelivingAuthenticatedAxios.interceptors.response.use(
  (response) => response,
  (error) => {
     if (error.response && error.response.status === 401) {
          if (error.response.data.data?.code !== "token_not_valid") {
            if (error.response.data.message !== "Permissions list")
              if (!!Cookies.get("moretechglobal_access")) {
                localStorage.setItem("sessionExpired", "true");
                Cookies.remove("moretechglobal_access");
                const event = new Event("sessionExpired");
                window.dispatchEvent(event);
              }
          }
        }
    return Promise.reject(error);
  }
);
