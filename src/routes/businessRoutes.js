import EventImageUpload from "../components/event/eventImageUpload";
import BillingPage from "../pages/Businesspages/Billing/Billing";
import BusinessProfilePage from "../pages/Businesspages/BusinessProfile/BusinessProfilePage";
import BusinessTransaction from "../pages/Businesspages/BusinessTransaction/BusinessTransaction";
import Eventcreate from "../pages/event/eventcreate";
import EventUpdate from "../pages/event/eventupdate";
import UserEventDetailPage from "../pages/event/UsereventDetailspage";
import UserEventpage from "../pages/event/userEventpage";
import LeadDetails from "../pages/leads/LeadDetails";
import LeadPage from "../pages/leads/leadpage";

const businessRoutes = [
  {
    path: "/leads",
    page: <LeadPage />,
  },
  {
    path: "/leads/:username",
    page: <LeadDetails />,
  },
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
export default businessRoutes;
