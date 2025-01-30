import AboutPage from "../pages/about/aboutpage";
import PasswordChange from "../pages/AuthAndRegisterPages/PasswordChange/PasswordChange";
import AllCoupon from "../pages/Coupon/AllCoupon";
import FAQPage from "../pages/faqs/FAQ'spage";
import Home from "../pages/Home/Home";
import LearmMorePage from "../pages/LearnMore/LearmMorePage";
import LiscencePage from "../pages/Liscence/LiscencePage";
import PrivacyPage from "../pages/Privacy/privacy";
import ProjectDetail from "../pages/Project/ProjectDetail";
import ProjectPage from "../pages/Project/ProjectPage";
import BlogDetailPage from "../pages/Support/BlogDetailPage";
import SupportPage from "../pages/Support/SupportPage";
import TermsPage from "../pages/terms/TermsPage";



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
  ];

  export default publicRoutes