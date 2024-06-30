import React from "react";
import Divider from "../../../components/divider/Divider";

import PurchaseForm from "../../../components/points/purchase/purchasePointsform";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

const BuyPoints = () => {
  return (
    <DashboardLayout title={"Load Money"}>
      <div className="row">
        <div className="col-12 col-md-6">
          <PurchaseForm />
        </div>
      </div>
      <Divider />
    </DashboardLayout>
  );
};

export default BuyPoints;
