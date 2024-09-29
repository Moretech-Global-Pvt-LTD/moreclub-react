import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

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
import Resturant from "./pages/moreclub/Resturant/resturant";
import RestroInfo from "./pages/moreclub/Resturant/Info/info";
import RestroDiscount from "./pages/moreclub/Resturant/discount";
import RestroOffer from "./pages/moreclub/Resturant/Offers/offer";
import RestroMenu from "./pages/moreclub/Resturant/Menu/menu";
import ReactGA from "react-ga4";
import { GoogleAnalytics } from "./config/config";
import Setup from "./pages/moreclub/Resturant/setup";
import RestroMenuItem from "./pages/moreclub/Resturant/Menu/MenuItem";
import RestroOfferCreate from "./pages/moreclub/Resturant/Offers/CreateOffer";
import RestroUpdateInfo from "./pages/moreclub/Resturant/Info/Update";
import FoodItem from "./components/Moreclub/Resturant/Menu/FoodItem";
import ResturantOrder from "./pages/moreclub/Resturant/Orders/ResturantOrder";
import Morefood from "./pages/moreclub/morefood/morefood";
import OrderDetails from "./pages/moreclub/Resturant/Orders/orderDetail";
import GalleryPage from "./pages/moreclub/Resturant/Gallery/GalleryPage";
import Cuisine from "./pages/moreclub/Resturant/Cuisine/cuisine";
import UpdateCuisine from "./pages/moreclub/Resturant/Cuisine/UpdateCuisine";
import BusinessTypesDetail from "./pages/Partner/BusinessTypesDetail";
import RestaurantPage from "./pages/moreclub/Resturant/Gallery/RestaurantGalleryPage";
import UserPage from "./pages/moreclub/Resturant/Gallery/UserGalleryPage";
import OpeninghoursPage from "./pages/moreclub/Resturant/openinghours/OpeninghoursPage";
import Failed from "./pages/Points/buy/Failed";
import FeedPage from "./pages/feed/feedPage";
// import DisableDevtool from "disable-devtool";

import Cookies from "js-cookie";
import MoreSaloon from "./pages/moreclub/moresaloon/saloon/moreSaloon";
import SaloonPage from "./pages/moreclub/moresaloon/setup/SaloonPage";
import SaloonDetail from "./pages/moreclub/moresaloon/setup/SaloonDetail";
import ServicePage from "./pages/moreclub/moresaloon/Services/ServicePage";
import StaffPage from "./pages/moreclub/moresaloon/Staff/StaffPage";
import BookingPage from "./pages/moreclub/moresaloon/Bookings/BookingPage";
import SaloonGalleryPage from "./pages/moreclub/moresaloon/Gallery/SaloonGalleryPage";
import WorkinghourPage from "./pages/moreclub/moresaloon/Workingshours/WorkinghourPage";
import SaloonUpdate from "./pages/moreclub/moresaloon/saloon/SaloonUpdate";
import SaloonCreate from "./pages/moreclub/moresaloon/saloon/SaloonCreate";
import SupportPage from "./pages/Support/SupportPage";
import SaloonPhotoUploadGallery from "./pages/moreclub/moresaloon/Gallery/SaloonPhotoUploadGallery";
import SaloonUserUploadGallery from "./pages/moreclub/moresaloon/Gallery/SaloonUserUploadGallery";
import BlogDetail from "./pages/Support/BlogDetail";
import BlogDetailPage from "./pages/Support/BlogDetailPage";
import ServiceVariationPage from "./pages/moreclub/moresaloon/Services/ServiceVariationPage";
import StaffDetailPage from "./pages/moreclub/moresaloon/Staff/StaffDetailPage";





const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to={`/login`} />;
};

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const key = GoogleAnalytics;
  // Notification.requestPermission();

  // const location = useLocation();

  // useEffect(() => {
  //   const botWidget = document.querySelector(".ai-bot-widget");

  //   // If we're on the support page, show the bot
  //   if (location.pathname === "/support") {
  //     if (botWidget) botWidget.style.display = "block"; // Show the bot
  //   } else {
  //     if (botWidget) botWidget.style.display = "none"; // Hide the bot on other pages
  //   }
  // }, [location.pathname]); // Run the effect when the path changes

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

  // disableDevtool({
  //   md5: "0b9e05caf5000360ec1c263335bd83fe",
  //   interval: 200,
  //   disableMenu: true,
  //   clearLog: true,
  //   disableSelect: true,
  //   disableCopy: true,
  //   disableCut: true,
  //   disablePaste: true,
  // });
  // function configureDisableDevtool() {
  //   disableDevtool({

  //     clearIntervalWhenDevOpenTrigger: true,
  //     ondevtoolopen: (type, next) => {
  //       alert('DevTools opened! Type: ' + type , next);
  //       console.log("DevTools opened! Type:", type);
  //       // next(); // Uncomment to close the page when DevTools is detected
  //     },
  //     ondevtoolclose: () => {
  //       console.log("DevTools closed!");
  //     },
  //     ignore: () => window.ignore === undefined,
  //   });
  // }
  // useEffect(() => {
  //   configureDisableDevtool();
  // }, []);

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
    await dispatch(getMetadata());
  };

  useEffect(() => {
    if (!localStorage.getItem("sessionExpired")) {
      const fetchUser = async () => {
        await dispatch(load_user());
        await dispatch(userMembership());
        await dispatch(getBusinessProfile());
        await dispatch(loadUserPermissions());
        await dispatch(CurrencySet());
      };

      fetchUser();
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

  const authRoutes = [
    {
      path: "/login",

      page: <Login />,
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
      path: "/support",

      page: <SupportPage />,
    },
    {
      path: "/blog/detail/:slug",

      page: <BlogDetailPage />,
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
      path: "/products/",

      page: <ProjectPage />,
    },
    {
      path: "/partners/",

      page: <PartnerPage />,
    },
    {
      path: "/partners/:partnerId/:partnerName",

      page: <BusinessTypesDetail />,
    },

    {
      path: "/projects/:projectId",

      page: <ProjectDetail />,
    },

    {
      path: "/coupon/",

      page: <AllCoupon />,
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
      path: "/feed",

      page: <FeedPage />,
    },
    {
      path: "/scan",

      page: <GetMembership />,
    },
    {
      path: "/partner/detail/:partnerId/:slug",

      page: <PartnerDetail />,
    },
    {
      path: "/event/",

      page: <Eventpage />,
    },
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
      path: "/points/buy/failed",
      page: <Failed />,
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

  const resturant = [
    {
      path: "/resturant",

      page: <Resturant />,
    },
    {
      path: "/morefood",

      page: <Morefood />,
    },
    {
      path: "/resturant/info/",

      page: <RestroInfo />,
    },
    {
      path: "/resturant/info/:id",

      page: <RestroUpdateInfo />,
    },
    {
      path: "/resturant/setup/:id",

      page: <Setup />,
    },
    {
      path: "/resturant/:res_id/orders/:slug",
      page: <ResturantOrder />,
    },
    {
      path: "/resturant/:res_id/cuisine/:slug",
      page: <Cuisine />,
    },
    {
      path: "/resturant/:res_id/cuisine/:cuisine_id/:rest_name/:slug",
      page: <UpdateCuisine />,
    },
    {
      path: "/resturant/:res_id/orders/:slug/:ord_id",
      page: <OrderDetails />,
    },

    {
      path: "/resturant/:res_id/discount",

      page: <RestroDiscount />,
    },
    {
      path: "/resturant/:res_id/offer/create/:slug",

      page: <RestroOfferCreate />,
    },
    {
      path: "/resturant/:res_id/offer/:slug",

      page: <RestroOffer />,
    },
    {
      path: "/resturant/:res_id/gallery/:slug",

      page: <GalleryPage />,
    },
    {
      path: "/resturant/:res_id/opening-duration/:slug",

      page: <OpeninghoursPage />,
    },
    {
      path: "/resturant/:res_id/gallery/:slug/restaurant",

      page: <RestaurantPage />,
    },
    {
      path: "/resturant/:res_id/gallery/:slug/user-upload",

      page: <UserPage />,
    },
    {
      path: "/resturant/:res_id/menu",

      page: <RestroMenu />,
    },
    {
      path: "/resturant/:res_id/menu/:cat_id/:slug",

      page: <RestroMenuItem />,
    },
    {
      path: "/resturant/:res_id/:cat_id/:id",
      page: <FoodItem />,
    },
  ];

  const Saloon = [
    {
      path: "/saloon",
      page: <SaloonPage />,
    },
    {
      path: "/moresaloon",

      page: <MoreSaloon />,
    },
    {
      path: `/saloon/:id/:slug`,
      page: <SaloonDetail />,
    },
    {
      path: `/saloon/create/`,
      page: <SaloonCreate />,
    },
    {
      path: `/saloon/:id/update/:slug`,
      page: <SaloonUpdate />,
    },
    {
      path: `/saloon/:id/services/:slug`,
      page: <ServicePage />,
    },
    {
      path: `/saloon/:id/service/:ser_id/:slug/:ser_name`,
      page: <ServiceVariationPage />,
    },
    {
      path: `/saloon/:id/staff/:slug`,
      page: <StaffPage />,
    },
    {
      path: `/saloon/:id/:slug/staff/:staff_id/:staff_name`,
      page: <StaffDetailPage />,
    },
    {
      path: `/saloon/:id/booking/:slug`,
      page: <BookingPage />,
    },
    {
      path: `/saloon/:id/gallery/:slug`,
      page: <SaloonGalleryPage />,
    },
    {
      path: `/saloon/:id/gallery/:slug/saloon`,
      page: <SaloonPhotoUploadGallery />,
    },
    {
      path: `/saloon/:id/gallery/:slug/user-upload`,
      page: <SaloonUserUploadGallery />,
    },
    {
      path: `/saloon/:id/opening-duration/:slug`,
      page: <WorkinghourPage />,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("sessionExpired");
    window.location.href = "/login";
  };

  return (
    <div className="App">
      <Routes basename="#">
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.page} />
        ))}

        <Route
          path="/pricing"
          element={
            !Cookies.get("moretechglobal_access") ? (
              <NotFound />
            ) : (
              <PricingPage />
            )
          }
        />

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

        {resturant.map((route) => (
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

        {Saloon.map((route) => (
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
