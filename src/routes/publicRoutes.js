import UserDashboard from "../components/Layout/userdashboard/UserDashboardLayout";
import MorelivingContent from "../components/Moreclub/moreliving/MorelivingContent";
import AboutPage from "../pages/about/aboutpage";
import PasswordChange from "../pages/AuthAndRegisterPages/PasswordChange/PasswordChange";
import AllCoupon from "../pages/Coupon/AllCoupon";
import FAQPage from "../pages/faqs/FAQ'spage";
import Home from "../pages/Home/Home";
import LearmMorePage from "../pages/LearnMore/LearmMorePage";
import LiscencePage from "../pages/Liscence/LiscencePage";
import Morefood from "../pages/moreclub/morefood/morefood";
import MoreLiving from "../pages/moreclub/moreliving/moreliving";
import MoreSaloon from "../pages/moreclub/moresaloon/saloon/moreSaloon";
import TreasureHunt from "../pages/NewHomePage/NewHome";
import OfferPage from "../pages/offers/offerPage";
import BusinessTypesDetail from "../pages/Partner/BusinessTypesDetail";
import PartnerPage from "../pages/Partner/PartnerPage";
import PrivacyPage from "../pages/Privacy/privacy";
import ProjectDetail from "../pages/Project/ProjectDetail";
import ProjectPage from "../pages/Project/ProjectPage";
import BlogDetailPage from "../pages/Support/BlogDetailPage";
import SupportPage from "../pages/Support/SupportPage";
import TermsPage from "../pages/terms/TermsPage";



const publicRoutes = [
    {
      path: "/",

      page: <TreasureHunt />,
    },
    // {
    //   path: "/home",

    //   page: <Home />,
    // },
   
    {
      path: "/offers",

      page: <OfferPage />,
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

      page: <AboutPage />,
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

    {
      path: "/partners/",

      page: <PartnerPage />,
    },
    {
      path: "/partners/:partnerId/:partnerName",

      page: <BusinessTypesDetail />,
    },

    {
      path: "/morefood",

      page: <Morefood />,
    },

    {
      path: "/moresalons",

      page: <MoreSaloon />,
    },

    {
      path: "/moreliving",

      page: <MoreLiving />,
    },
  ];

  export default publicRoutes