import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import {load_user, logout } from "./redux/api/loginAPI";
import Wallet from "./pages/Wallet/WalletPage";
import { getMetadata } from "./redux/api/infoApi";
import NotFound from "./pages/notfound";
import SessionExpiredModal from "./components/sessiondialog";
import ReactGA from "react-ga4";
import { GoogleAnalytics } from "./config/config";

import DisableDevtool from "disable-devtool";

import Cookies from "js-cookie";
import Locationretrive from "./components/ui/Locationset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// routes 
import authRoutes from "./routes/authroutes";
import publicRoutes from "./routes/publicRoutes";
import userRoutes from "./routes/userRoutes";
import businessRoutes from "./routes/businessRoutes";
import restaurantRoutes from "./routes/restaurantRoutes";
import salonRoutes from "./routes/salonRoutes";

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to={`/login`} />;
};

const App = () => {
  const dispatch = useDispatch();
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const key = GoogleAnalytics;
  // Notification.requestPermission();

  const location = useLocation();

  useEffect(() => {
    const botWidget = document.querySelector(".ai-bot-widget");

    // If we're on the support page, show the bot
    if (location.pathname === "/support") {
      if (botWidget) botWidget.style.display = "block"; // Show the bot
    } else {
      if (botWidget) botWidget.style.display = "none"; // Hide the bot on other pages
    }
  }, [location.pathname]); // Run the effect when the path changes

  // DisableDevtool({
  //   url:'https://_blank',

  //   ondevtoolopen: (type, next) => {
  //     next();
  //   },

  //   ondevtoolclose: () => {
  //     console.log("Developer tools closed");
  //   },

  //   interval: 1,
  //   disableMenu: true,
  //   disableSelect: false,
  //   disableCopy: false,
  //   disableCut: false,
  //   disablePaste: false,
  // });


  useEffect(() => {
    ReactGA.initialize(key);
    const handleSessionExpired = () => {
      setIsSessionExpired(sessionStorage.getItem("sessionExpired"));
    };

    window.addEventListener("sessionExpired", handleSessionExpired);

    return () => {
      window.removeEventListener("sessionExpired", handleSessionExpired);
    };
  }, []);

  const getMetadatas = async () => {
     dispatch(getMetadata());
  };

  useEffect(() => {
    if (!localStorage.getItem("sessionExpired")) {


      const fetchUser = async () => {
        dispatch(load_user());
      };
      if(!!Cookies.get("moretechglobal_access")) {

      fetchUser();
      }
    }
    getMetadatas();
  }, [dispatch]);

  // useEffect(() => {
  //    if (typeof importScripts !== "function") {
  //      console.warn(
  //        `You're trying to run service-worker.js file on non-worker scope. Please check your framework build and make sure you're running your service worker file once on WorkerGlobalScope.`
  //      );
  //      return;
  //    }
  // }, [])


  

  

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("sessionExpired");
    window.location.href = "/login";
  };

  return (
    <div className="App">
      <Locationretrive />
      <Routes basename="#">
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.page} />
        ))}

        {/* <Route
          path="/pricing"
          element={
            !Cookies.get("moretechglobal_access") ? (
              <NotFound />
            ) : (
              <PricingPage />
            )
          }
        /> */}

        {authRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              !!Cookies.get("moretechglobal_access") ? (
                <Navigate to={"/dashboard"} />
              ) : (
                route.page
              )
            }
          />
        ))}

        {userRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PrivateRoute
                element={route.page}
                isAuthenticated={!!Cookies.get("moretechglobal_access")}
              />
            }
          />
        ))}
        {businessRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PrivateRoute
                element={route.page}
                isAuthenticated={!!Cookies.get("moretechglobal_access")}
              />
            }
          />
        ))}

        <Route
          path="/wallet/"
          element={
            <PrivateRoute
              element={<Wallet />}
              isAuthenticated={!!Cookies.get("moretechglobal_access")}
            />
          }
        />

        {restaurantRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PrivateRoute
                element={route.page}
                isAuthenticated={!!Cookies.get("moretechglobal_access")}
              />
            }
          />
        ))}

        {salonRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PrivateRoute
                element={route.page}
                isAuthenticated={!!Cookies.get("moretechglobal_access")}
              />
            }
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <div className={isSessionExpired ? "blur-background" : ""}>
        <SessionExpiredModal
          visible={isSessionExpired}
          onLogout={handleLogout}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ScrollToTop
        id="scrollTopButton"
        width="14"
        height="14"
        component={<i className="bi bi-arrow-up-short" />}
        color="white"
        smooth
        top={500}
      />
    </div>
  );
};

export default App;
