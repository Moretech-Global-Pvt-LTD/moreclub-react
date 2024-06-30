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
import StripeProvider from "./components/HOC/StripeProvider";
import PayPalProvider from "./components/HOC/PaypalProvider";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = "Token " + localStorage.getItem("moretechglobal_access");
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
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
        <PayPalProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
          </PayPalProvider>
        </CookiesProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
