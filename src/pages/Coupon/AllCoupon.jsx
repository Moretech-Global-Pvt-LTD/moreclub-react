import React from 'react'
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Divider from "../../components/divider/Divider";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import LandingLayout from "../../components/Layout/LandingLayout";
import AllCouponContent from './AllCouponContent';

const AllCoupon = () => {
    const user = useSelector((state) => state.userReducer);
    if (user.isAuthenticated) {
      return (
        <DashboardLayout title={"Coupons"}>
          <AllCouponContent />
          <Divider />
        </DashboardLayout>
      );
    } else {
      return (
        <LandingLayout>
          <Breadcrumb
            breadcrumbTitle="Coupons"
            breadcrumbNav={[
              {
                navText: "Home",
                path: "/",
              },
            ]}
          />
          <div className="container">
          <AllCouponContent />
          <Divider/>
          </div>
        </LandingLayout>
      );
    }
}

export default AllCoupon
