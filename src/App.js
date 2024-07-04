import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import ScrollToTop from "react-scroll-to-top";
import { load_user, logout } from "./redux/api/loginAPI";
import Home from "./pages/Home/Home";
import ProjectDetail from "./pages/Project/ProjectDetail";
import ProjectPage from "./pages/Project/ProjectPage";
import Login from "./pages/AuthAndRegisterPages/Login/Login";
import Register from "./pages/AuthAndRegisterPages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import OTP from "./pages/AuthAndRegisterPages/OTP/OTP";
import BusinessRegister from "./pages/Businesspages/BusinessRegister/BusinessRegister";
import Profile from "./pages/UserPages/profile/Profile";
import ForgotPassword from "./pages/AuthAndRegisterPages/ForgotPassword/ForgotPassword";
import ForgetPasswordVerifyOTP from "./pages/AuthAndRegisterPages/ForgotPassword/ForgetPasswordVerifyOTP";
import PasswordChange from "./pages/AuthAndRegisterPages/PasswordChange/PasswordChange";
import BuyPlan from "./pages/BuyPlan/BuyPlan";
import BuyCoupon from "./pages/Coupon/BuyCoupon";
import BusinessProfile from "./pages/Businesspages/BusinessProfile/BusinessProfilePage";
import GetMembership from "./pages/AuthAndRegisterPages/GetMembership/GetMembership";
import { userMembership } from "./redux/api/userMembershipAPI";
import BusinessProfilePage from "./pages/Businesspages/BusinessProfile/BusinessProfilePage";
import { getBusinessProfile } from "./redux/api/userDetailAPI";

import PricingPage from "./pages/Pricing/Pricing";
import ViewCoupon from "./pages/Coupon/ViewCoupon";
import CouponDetail from "./pages/Coupon/CouponDetail";
import ProfileChange from "./pages/UserPages/profile/ProfileChange";
import UserTransaction from "./pages/Transactions/UserTransaction";

import BusinessTransaction from "./pages/Businesspages/BusinessTransaction/BusinessTransaction";
import SendPoints from "./pages/Points/send/SendPoints";
import BuyPoints from "./pages/Points/buy/BuyPoints";
import Wallet from "./pages/Wallet/WalletPage";
import Aboutpage from "./pages/about/aboutpage";
import TransactionPin from "./pages/Transactionpin/TransactionPin";
import ChangePin from "./pages/Transactionpin/ChangePin";
import Settingpage from "./pages/settings/settingpage";
import NetworkPage from "./pages/Network/NetworkPage";
import BusinessDocumentPage from "./pages/Businesspages/BusinessUpdate/BusinessDocumentPage";
import LearmMorePage from "./pages/LearnMore/LearmMorePage";
import PartnerPage from "./pages/Partner/PartnerPage";
import LoginPhoneNumber from "./pages/AuthAndRegisterPages/Login/LoginPhonenumber";
import NetworkMessage from "./pages/Network/NetworkMessage";

import { loadUserPermissions } from "./redux/api/PermissionsAPI";
import BillingPage from "./pages/Businesspages/Billing/Billing";
import AllCoupon from "./pages/Coupon/AllCoupon";
import Withdraw from "./pages/Points/withdraw/Withdraw";
import PointPurchase from "./pages/Points/buy/pointPurchase";
import FAQPage from "./pages/faqs/FAQ'spage";
import TermsPage from "./pages/terms/TermsPage";
import { getMetadata } from "./redux/api/infoApi";
import PrivacyPage from "./pages/Privacy/privacy";
import NotificationPage from "./pages/UserPages/notification/NotificationPage";
import OTPPhone from "./pages/AuthAndRegisterPages/OTP/OTPPhone";
import PartnerDetail from "./pages/Partner/PartnerDetail";
import LiscencePage from "./pages/Liscence/LiscencePage";
import NotFound from "./pages/notfound";
import { CurrencySet } from "./redux/api/CurrencyConvertorAPI";
import StripeProvider from "./components/HOC/StripeProvider";
import Success from "./pages/Points/buy/success";
import Paymentpage from "./pages/Payment/paymentpage";
import Eventpage from "./pages/event/eventpage";
import EventDetailPage from "./pages/event/EventDetailPage";
import KYCPage from "./pages/kYC/KYCPage";
import KYCFrom from "./pages/kYC/KYCCreate";
import KYCDocumentPage from "./pages/kYC/KYCDocumentPage";
import Eventcreate from "./pages/event/eventcreate";
import EventUpdate from "./pages/event/eventupdate";
import UserEventpage from "./pages/event/userEventpage";
import EventImageUpload from "./components/event/eventImageUpload";
import UserEventDetailPage from "./pages/event/UsereventDetailspage";
import ForgetPin from "./pages/Transactionpin/ForgetPin";
import ForgetPinEmail from "./pages/Transactionpin/ForgetPinEmail";
import ForgetPinOTP from "./pages/Transactionpin/ForgetPinOtp";
import SessionExpiredModal from "./components/sessiondialog";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  // useEffect(() => {
  //   const handleSessionExpired = () => {
  //     dispatch(logout());
  //     window.location.href = "/login"; // Redirect to login page
  //   };
  //   window.addEventListener("sessionExpired", handleSessionExpired);
  //   return () => {
  //     window.removeEventListener("sessionExpired", handleSessionExpired);
  //   };
  // }, [dispatch]);
  // const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    const handleSessionExpired = () => {
      setIsSessionExpired(sessionStorage.getItem("sessionExpired"));
    };

    window.addEventListener("sessionExpired", handleSessionExpired);

    return () => {
      window.removeEventListener("sessionExpired", handleSessionExpired);
    };
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("sessionExpired")) {
      const fetchUser = async () => {
        await dispatch(load_user());
        await dispatch(userMembership());
        await dispatch(getBusinessProfile());
        await dispatch(loadUserPermissions());
        await dispatch(CurrencySet());
        await dispatch(getMetadata());
      };
      fetchUser();
    }
  }, [dispatch]);

  const authRoutes = [
    {
      path: "/login",

      page: <Login />,
    },
    {
      path: "/login-phonenumber",

      page: <LoginPhoneNumber />,
    },
    {
      path: "/register-membership",

      page: <Register />,
    },
    {
      path: "/otp",

      page: <OTP />,
    },
    {
      path: "/forgot/password/",

      page: <ForgotPassword />,
    },
    {
      path: "/forgot/password/otp/",

      page: <ForgetPasswordVerifyOTP />,
    },
    {
      path: "/register-business",

      page: <BusinessProfile />,
    },
    {
      path: "/business/register/",

      page: <BusinessRegister />,
    },
  ];

  const publicRoutes = [
    {
      path: "/",

      page: <Home />,
    },
    {
      path: "/change-password",
      page: <PasswordChange />,
    },
    {
      path: "/learnmore",

      page: <LearmMorePage />,
    },
    {
      path: "/faq/",

      page: <FAQPage />,
    },
    {
      path: "/products/",

      page: <ProjectPage />,
    },
    {
      path: "/about/",

      page: <Aboutpage />,
    },
    {
      path: "/privacy/",

      page: <PrivacyPage />,
    },
    {
      path: "/event/",

      page: <Eventpage />,
    },

    {
      path: "/products/",

      page: <ProjectPage />,
    },
    {
      path: "/partners/",

      page: <PartnerPage />,
    },
    {
      path: "/partners/:partnerId",

      page: <PartnerDetail />,
    },
    {
      path: "/projects/:projectId",

      page: <ProjectDetail />,
    },
    {
      path: "/pricing/",

      page: <PricingPage />,
    },
    {
      path: "/coupon/",

      page: <AllCoupon />,
    },
    {
      path: "/coupon/:couponId",

      page: <CouponDetail />,
    },
    {
      path: "/scan",

      page: <GetMembership />,
    },
    {
      path: "/terms",

      page: <TermsPage />,
    },
    {
      path: "/liscence",

      page: <LiscencePage />,
    },
  ];

  const businessRoutes = [
    {
      path: "/billing",
      page: <BillingPage />,
    },
    {
      path: "/business-transactions",
      page: <BusinessTransaction />,
    },
    {
      path: "/business-profile/",
      page: <BusinessProfilePage />,
    },
    {
      path: "/business-events/",
      page: <UserEventpage />,
    },
    {
      path: "/event/create",
      page: <Eventcreate />,
    },
    {
      path: "/event/details/:eventId",
      page: <UserEventDetailPage />,
    },
    {
      path: "/event/upload/:eventId",
      page: <EventImageUpload />,
    },
    {
      path: "/event/update/:eventId",
      page: <EventUpdate />,
    },
  ];

  const userRoutes = [
    {
      path: "/otp-phone",

      page: <OTPPhone />,
    },
    {
      path: "/dashboard/",
      page: <Dashboard />,
    },
    {
      path: "/notification/",
      page: <NotificationPage />,
    },
    // {
    //   path: "/wallet/",
    //   page: <Wallet />,
    // },
    {
      path: "/profile/",
      page: <Profile />,
    },
    {
      path: "/settings/",
      page: <Settingpage />,
    },
    {
      path: "/profile/change",
      page: <ProfileChange />,
    },
    {
      path: "/buy/plan/:planId/:planTime",
      page: <BuyPlan />,
    },
    {
      path: "/buy/coupon/:couponId",
      page: <BuyCoupon />,
    },
    {
      path: "/my-coupons/",
      page: <ViewCoupon />,
    },
    // {
    //   path: "/refer/",
    //   page: <ReferPage />,
    // },
    {
      path: "/transactions",
      page: <UserTransaction />,
    },
    {
      path: "/forget-pin",
      page: <ForgetPin />,
    },
    {
      path: "/my-network",
      page: <NetworkPage />,
    },
    {
      path: "/network/message",
      page: <NetworkMessage />,
    },
    {
      path: "/points/withdraw",
      page: <Withdraw />,
    },

    {
      path: "/transactions-pin",
      page: <TransactionPin />,
    },
    {
      path: "/transactions-pin-change",
      page: <ChangePin />,
    },
    {
      path: "/business/register/",
      page: <BusinessRegister />,
    },
    {
      path: "/points/send",
      page: <SendPoints />,
    },
    {
      path: "/points/buy",
      page: <BuyPoints />,
    },
    {
      path: "/points/buy/success",
      page: <Success />,
    },
    {
      path: "/points/buy/:paymentId",
      page: <PointPurchase />,
    },
    {
      path: "/event/:eventId",

      page: <EventDetailPage />,
    },
    {
      path: "/payments/:paymentKey",
      page: <Paymentpage />,
    },
    {
      path: "/business/update",
      page: (
        <StripeProvider>
          <BusinessDocumentPage />
        </StripeProvider>
      ),
    },
    {
      path: "/KYC",
      page: <KYCPage />,
    },
    {
      path: "/KYC/update",
      page: <KYCFrom />,
    },
    {
      path: "/KYC/document/update",
      page: <KYCDocumentPage />,
    },
    {
      path: "/forget/pin",
      page: <ForgetPinEmail />,
    },
    {
      path: "/forget/pin/otp",
      page: <ForgetPinOTP />,
    },
    {
      path: "/reset/pin/",
      page: <ForgetPin />,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("sessionExpired");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.page} />
        ))}

        {/*   {authRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<AuthRoute element={route.page} redirectTo="/dashboard" />}
          />
        ))}

        {userRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PrivateRoute element={route.page} redirectTo="/login" />}
          />
        ))} */}

        {authRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              !user.isAuthenticated ? (
                route.page
              ) : (
                <Navigate to={"/dashboard"} />
              )
            }
          />
        ))}

        {userRoutes.map((route) =>
          user.isAuthenticated ? (
            <Route key={route.path} path={route.path} element={route.page} />
          ) : (
            <Route element={<Navigate to="/login" />} />
          )
        )}

        {/*   {businessRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PrivateRoute element={route.page} redirectTo="/login" />}
          />
        ))} */}

        {businessRoutes.map((route) =>
          user.isAuthenticated ? (
            <Route key={route.path} path={route.path} element={route.page} />
          ) : (
            <Route element={<Navigate to="/login" />} />
          )
        )}

        <Route path="/wallet/" element={<Wallet />} />
        <Route path="" element={<NotFound />} />
      </Routes>
      <div className={isSessionExpired ? "blur-background" : ""}>
        <SessionExpiredModal
          visible={isSessionExpired}
          onLogout={handleLogout}
        />
        {/* Your app components */}
      </div>
      {/* Scroll To Top */}
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
