import StripeProvider from "../components/HOC/StripeProvider";
import GetMembership from "../pages/AuthAndRegisterPages/GetMembership/GetMembership";
import OTPEmail from "../pages/AuthAndRegisterPages/OTP/OTPEmail";
import BusinessRegister from "../pages/Businesspages/BusinessRegister/BusinessRegister";
import BusinessDocumentPage from "../pages/Businesspages/BusinessUpdate/BusinessDocumentPage";
import BuyPlan from "../pages/BuyPlan/BuyPlan";
// import BuyCoupon from "../pages/Coupon/BuyCoupon";
// import ViewCoupon from "../pages/Coupon/ViewCoupon";
import Dashboard from "../pages/Dashboard/Dashboard";
import EventDetailPage from "../pages/event/EventDetailPage";
import Eventpage from "../pages/event/eventpage";
import FeedPage from "../pages/feed/feedPage";
import KYCFrom from "../pages/kYC/KYCCreate";
import KYCDocumentPage from "../pages/kYC/KYCDocumentPage";
import KYCPage from "../pages/kYC/KYCPage";
import NetworkMessage from "../pages/Network/NetworkMessage";
import NetworkPage from "../pages/Network/NetworkPage";
import PartnerDetail from "../pages/Partner/PartnerDetail";
import BuyPoints from "../pages/Points/buy/BuyPoints";
import Failed from "../pages/Points/buy/Failed";
import PointPurchase from "../pages/Points/buy/pointPurchase";
import Success from "../pages/Points/buy/success";
import SendPoints from "../pages/Points/send/SendPoints";
import Withdraw from "../pages/Points/withdraw/Withdraw";
import Settingpage from "../pages/settings/settingpage";
import ChangePin from "../pages/Transactionpin/ChangePin";
import ForgetPin from "../pages/Transactionpin/ForgetPin";
import ForgetPinEmail from "../pages/Transactionpin/ForgetPinEmail";
import ForgetPinOTP from "../pages/Transactionpin/ForgetPinOtp";
import TransactionPin from "../pages/Transactionpin/TransactionPin";
import UserTransaction from "../pages/Transactions/UserTransaction";
import NotificationPage from "../pages/UserPages/notification/NotificationPage";
import Profile from "../pages/UserPages/profile/Profile";
import ProfileChange from "../pages/UserPages/profile/ProfileChange";
import BusinessSetupPage from "../pages/AuthAndRegisterPages/BusinessRegistration/BusinessSetupPage";
import LeadDetails from "../pages/leads/LeadDetails";
import PartnerPage from "../pages/Partner/PartnerPage";
import BusinessTypesDetail from "../pages/Partner/BusinessTypesDetail";
import BusinessRestaurantPartner from "../pages/Partner/BusinessRestaurantPartner";
import TrasureDashboardContent from "../pages/NewHomePage/treasuredshboard";



const userRoutes = [

  {
    path: "/network/:username",
    page: <LeadDetails />,
  },

  // {
  //  path:"/newdashboard",
  //  page:<TrasureDashboardContent/>,
  // },
    {
      path:"/businessSetup",
      page:<BusinessSetupPage/>
    },
    {
      path: "/feed",

      page: <FeedPage />,
    },
    {
      path: "/scan",

      page: <GetMembership />,
    },
    {
      path: "/partner/detail/:partnerId/:slug/:businessName",

      page: <PartnerDetail />,
    },
    {
      path: "/event/",

      page: <Eventpage />,
    },
    //for email verification
    {
      path: "/otp-email",

      page: <OTPEmail />,
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
    // {
    //   path: "/buy/coupon/:couponId",
    //   page: <BuyCoupon />,
    // },
    // {
    //   path: "/my-coupons/",
    //   page: <ViewCoupon />,
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



    {
      path: "/partners/",

      page: <PartnerPage />,
    },
    {
      path: "/partners/:partnerId/:partnerName",

      page: <BusinessTypesDetail />,
    },
    {
      path: "/partners/:partnerId/:partnerName/:cuisineName/",

      page: <BusinessRestaurantPartner />,
    },
  ];

  export default userRoutes;