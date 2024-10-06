import React from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import PartnerDeatilContent from "./PartnerDeatilContent";
import {useParams } from "react-router-dom";


const PartnerDetail = () => {
 
  const { slug } = useParams();
  const name=slug.replace(/-/g,' ')
 
  
    return (
      <DashboardLayout title={name}>
        <PartnerDeatilContent  />
      </DashboardLayout>
    );

};

export default PartnerDetail;
