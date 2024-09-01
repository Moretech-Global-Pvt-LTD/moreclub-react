import React from "react";



import Divider from "../../components/divider/Divider";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { useParams } from "react-router-dom";
import BusinessPartnerContent from "./BusinessPartnerContent";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LandingLayout from "../../components/Layout/LandingLayout";
import UnauthenticatedBusinessPartnerContent from "./UnauthenticatedPartnerContent";


const BusinessTypesDetail = () => {
    const { partnerId, partnerName } = useParams();
    
    const title= partnerName.replace("-"," ")
    
   
    if (!!sessionStorage.getItem("moretechglobal_access")) {
        return (
            <DashboardLayout title={title}>
                <BusinessPartnerContent partnerId={partnerId} />
                <Divider />
            </DashboardLayout>
        );
   
    } else {
        return (
            <LandingLayout>
                <Breadcrumb
                    breadcrumbTitle={title}
                    breadcrumbNav={[
                        {
                            navText: "Home",
                            path: "/",
                        },
                    ]}
                />
                <div className="container">
                    <UnauthenticatedBusinessPartnerContent partnerId={partnerId} />
                    <Divider />
                </div>
            </LandingLayout>
        );
    }
}

export default BusinessTypesDetail;
