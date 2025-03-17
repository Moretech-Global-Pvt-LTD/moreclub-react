import React from "react";



import Divider from "../../components/divider/Divider";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { useParams } from "react-router-dom";
import BusinessPartnerContent from "./BusinessPartnerContent";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LandingLayout from "../../components/Layout/LandingLayout";
import { getAccessToken } from "../../utills/token";
import BusinessPartnerHotelContent from "./BusinessPartnerHotelContent";


const BusinessTypesDetail = () => {
    const { partnerId, partnerName } = useParams();
    
    const title= partnerName.replace(/-/g," ");
    
   
    if (!!getAccessToken()) {

        // if (partnerName === "Restaurant") { 

        //     return (
        //         <DashboardLayout title={"cuisine"}>
        //             <RestaurantCusine />
        //             <Divider />
        //         </DashboardLayout>
        //     );
        // } else {
            
            return (
                <DashboardLayout title={title}>
                 
                <BusinessPartnerContent partnerId={partnerId} />

                    <Divider />
                </DashboardLayout>
            );
        // }
   
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
                
                <BusinessPartnerContent partnerId={partnerId} />

                
                {/* <BusinessPartnerContent partnerId={partnerId} /> */}
                    {/* <UnauthenticatedBusinessPartnerContent partnerId={partnerId} /> */}
                    <Divider />
                </div>
            </LandingLayout>
        );
    }
}

export default BusinessTypesDetail;
