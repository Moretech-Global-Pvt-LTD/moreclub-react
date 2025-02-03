import Errorpage from "../components/Layout/Errorpage";
import BookingDetailPage from "../pages/moreclub/moresaloon/Bookings/BookingDetailPage";
import BookingPage from "../pages/moreclub/moresaloon/Bookings/BookingPage";
import CouponsPage from "../pages/moreclub/moresaloon/Coupons/CouponsPage";
import SaloonPhotoUploadGallery from "../pages/moreclub/moresaloon/Gallery/SaloonPhotoUploadGallery";
import MoreSaloon from "../pages/moreclub/moresaloon/saloon/moreSaloon";
import SaloonCreate from "../pages/moreclub/moresaloon/saloon/SaloonCreate";
import SaloonUpdate from "../pages/moreclub/moresaloon/saloon/SaloonUpdate";
import ServicePage from "../pages/moreclub/moresaloon/Services/ServicePage";
import ServiceVariationPage from "../pages/moreclub/moresaloon/Services/ServiceVariationPage";
import SaloonDetail from "../pages/moreclub/moresaloon/setup/SaloonDetail";
import SaloonPage from "../pages/moreclub/moresaloon/setup/SaloonPage";
import StaffDetailPage from "../pages/moreclub/moresaloon/Staff/StaffDetailPage";
import StaffPage from "../pages/moreclub/moresaloon/Staff/StaffPage";
import WorkinghourPage from "../pages/moreclub/moresaloon/Workingshours/WorkinghourPage";


const salonRoutes = [
    {
      path: "/salons",
      page: <SaloonPage />,
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
      path: `/saloon/:id/coupon/:slug`,
      page: <CouponsPage />,
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
      path: `/saloon/:id/booking/:slug/:book_id/:appoit_id`,
      page: <BookingDetailPage />,
    },
    {
      path: `/saloon/:id/gallery/:slug`,
      page: <SaloonPhotoUploadGallery />,
    },
  
    {
      path: `/saloon/:id/opening-duration/:slug`,
      page: <WorkinghourPage />,
    },
    {
      path:'/error',
      page: <Errorpage/>
    }
  ];

  export default salonRoutes;