import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { baseURL } from "./config/config";
import ScrollTop from "./components/header/ScrollTop";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
// import { register } from "./utills/serviceworker";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = "Bearer " + sessionStorage.getItem("moretechglobal_access");

    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (error.response.data.data?.code !== "token_not_valid") {
        if (!!sessionStorage.getItem("moretechglobal_access")) {
          
          localStorage.setItem("sessionExpired", "true");
          sessionStorage.removeItem("moretechglobal_access");
          const event = new Event("sessionExpired");
          window.dispatchEvent(event);
        }
      }
    }
    return Promise.reject(error);
  }
);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollTop />
      <Provider store={store}>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
        </CookiesProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
// register();
