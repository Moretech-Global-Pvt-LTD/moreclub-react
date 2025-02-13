import Morefood from "../pages/moreclub/morefood/morefood";
import AllOrdersPage from "../pages/moreclub/Resturant/Allorders/AllOrdersPage";
import AllResturantsStationOrderPage from "../pages/moreclub/Resturant/Allorders/AllResturantsStationOrderPage";
import StationOrderList from "../pages/moreclub/Resturant/Allorders/StationOrderList";
import FoodItemCreate from "../pages/moreclub/Resturant/FoodItem/FoodItemCreate";
import FoodItemDetail from "../pages/moreclub/Resturant/FoodItem/FoodItemDetail";
import FoodItemPage from "../pages/moreclub/Resturant/FoodItem/FoodItemPage";
import GalleryPage from "../pages/moreclub/Resturant/Gallery/GalleryPage";
import RestaurantPage from "../pages/moreclub/Resturant/Gallery/RestaurantGalleryPage";
import UserPage from "../pages/moreclub/Resturant/Gallery/UserGalleryPage";
import RestroInfo from "../pages/moreclub/Resturant/Info/info";
import RestroUpdateInfo from "../pages/moreclub/Resturant/Info/Update";
import NearbyStationDetail from "../pages/moreclub/Resturant/nearbyStation/NearbyStationDetail";
import NearbyStationMenuPage from "../pages/moreclub/Resturant/nearbyStation/NearbyStationMenuPage";
import NearbyStationMyMenuPage from "../pages/moreclub/Resturant/nearbyStation/NearbyStationMyMenuPage";
import NearbyStationPage from "../pages/moreclub/Resturant/nearbyStation/NearbyStationPage";
import RestroOfferCreate from "../pages/moreclub/Resturant/Offers/CreateOffer";
import RestroOffer from "../pages/moreclub/Resturant/Offers/offer";
import UpdateOffer from "../pages/moreclub/Resturant/Offers/UpdateOffer";
import OpeninghoursPage from "../pages/moreclub/Resturant/openinghours/OpeninghoursPage";
import OrderDetails from "../pages/moreclub/Resturant/Orders/orderDetail";
import ResturantOrder from "../pages/moreclub/Resturant/Orders/ResturantOrder";
import StationOrderDetailPage from "../pages/moreclub/Resturant/Orders/StationOrderDetailPage";
import Resturant from "../pages/moreclub/Resturant/resturant";
import Setup from "../pages/moreclub/Resturant/setup";
import OrderDetailsPage from "../pages/moreclub/Resturant/station/OrderDetailPage";
import StationMenu from "../pages/moreclub/Resturant/station/StationMenu";
import StationOrder from "../pages/moreclub/Resturant/station/StationOrders";
import Tableadmin from "../pages/moreclub/Resturant/tablemanagement/tableadmin";
import Tablemanagement from "../pages/moreclub/Resturant/tablemanagement/tablemanagement";
import Tableorder from "../pages/moreclub/Resturant/tablemanagement/TableOrder";
import SetupStationPage from "../pages/moreclub/Station/SetupStationPage";
import StationDetailPage from "../pages/moreclub/Station/StationDetailPage";
import StationMenuItems from "../pages/moreclub/Station/StationMenuItem";
import StationPage from "../pages/moreclub/Station/StationPage";
import StationUpdatePage from "../pages/moreclub/Station/StationUpdatePage";


const restaurantRoutes = [
    
    {
      path: "/restaurant",

      page: <Resturant />,
    },
    {
      path: "/restaurant/create/",

      page: <RestroInfo />,
    },
    {
      path: "/restaurant/:id/:slug",

      page: <Setup />,
    },
    {
      path: "/resturant/update/:id/:slug",

      page: <RestroUpdateInfo />,
    },

    //menu
    // {
    //   path: "/resturant/:res_id/menu/:cat_id/:slug/:menu_name",

    //   page: <RestroMenuItem />,
    // },

    {
      path: "/resturant/:res_id/menu/:slug",

      page: <FoodItemPage />,
    },
    {
      path: "/resturant/:res_id/fooditem/:slug/create",

      page: <FoodItemCreate />,
    },
    {
      path: "/resturant/:res_id/fooditem/:food_id/:slug/detail",

      page: <FoodItemDetail />,
    },



    // cuisines
    // {
    //   path: "/resturant/:res_id/cuisine/:slug",
    //   page: <Cuisine />,
    // },
    // {
    //   path: "/resturant/:res_id/cuisine/:cuisine_id/:slug/:name",
    //   page: <UpdateCuisine />,
    // },

    //offer

    {
      path: "/resturant/:res_id/offer/:slug",

      page: <RestroOffer />,
    },
    {
      path: "/restaurant/:res_id/offer/create/:slug",

      page: <RestroOfferCreate />,
    },
    {
      path: "/restaurant/:res_id/offer/update/:offer_id/:slug",

      page: <UpdateOffer />,
    },

    //orders
    {
      path: "/resturant/:res_id/orders/:slug",
      page: <ResturantOrder />,
    },
    {
      path: "/resturant/:res_id/orders/:slug/:ord_id",
      page: <OrderDetails />,
    },

    //gallery
    {
      path: "/resturant/:res_id/gallery/:slug",

      page: <GalleryPage />,
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
      path: "/resturant/:res_id/opening-duration/:slug",
      page: <OpeninghoursPage />,
    },
    {
      path: "/restaurant/:res_id/table/manage/:slug",
      page: <Tablemanagement />,
    },
    {
      path: "/restaurant/:res_id/table/order/:slug",
      page: <Tableorder />,
    },
    {
      path: "/restaurant/:res_id/table/:slug",
      page: <Tableadmin />,
    },

    //nearby station

    {
      path: "/station/:resid/nearby/",
      page: <NearbyStationPage />,
    },
    {
      path: "/restaurant/:resid/station/:stationid/:name",
      page: <NearbyStationDetail />,
    },
    {
      path: "/restaurant/:resid/station/:stationid/:name/menu",
      page: <NearbyStationMenuPage />,
    },
    {
      path: "/restaurant/:resid/station/:stationid/:name/my-menu",
      page: <NearbyStationMyMenuPage />,
    },

    //station orders
    {
      path: "/station/:id/stationorders/:name",
      page: <StationOrderList />,
    },
    
    {
      path: "/station/:id/stationorders/:ord_id/:name/details",
      page: <StationOrderDetailPage />,
    },


    //station all orders
    {
      path: "/resturant/:res_id/station/allOrders/:name",

      page: <AllResturantsStationOrderPage />,
    },


   //station
    {
      path: "/station/",
      page: <StationPage />,
    },
    {
      path: "/station/setup",
      page: <SetupStationPage/>,
    },
    {
      path: "/station/:id/:name",
      page: <StationDetailPage />,
    },
    {
      path: "/station/:id/:name/update",
      page: <StationUpdatePage />,
    },
    {
      path: "/station/:id/menu/:name",
      page: <StationMenu />,
    },
    {
      path: "/station/:id/menu/:name/:menu_id/:menu_name",
      page: <StationMenuItems />,
    },
    {
      path: "/station/:id/orders/:name",
      page: <StationOrder />,
    },
    {
      path: "/station/:id/orders/:ord_id/:name",
      page: <OrderDetailsPage />,
    },
    {
      path: "/station/:id/allorders/:name",
      page: <AllOrdersPage />,
    },
  ];

  export default restaurantRoutes;