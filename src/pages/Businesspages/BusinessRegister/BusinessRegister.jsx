import Footer from "../../../components/footer/Footer";
import HeaderDashboard from "../../../components/header/HeaderDashboard";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import Divider from "../../../components/divider/Divider";
import BusinessRegisterCreate from "../../../components/business_register/BusinessRegisterCreate";
import { useEffect, useState } from "react";
import { alertNotification } from "../../../redux/api/notification";
import { Navigate } from "react-router-dom";

const BusinessRegister = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    alertNotification()
      .then((response) => {
        setNotifications(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);
  if (notifications.business) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <HeaderDashboard />
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <div className="admin-wrapper">
            <Breadcrumb
              breadcrumbTitle="Create New"
              breadcrumbNav={[
                {
                  navText: "Home",
                  path: "/",
                },
              ]}
            />

            <BusinessRegisterCreate />

            <Divider />
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default BusinessRegister;
