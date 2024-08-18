import React from "react";



import Divider from "../../components/divider/Divider";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { useParams } from "react-router-dom";
import BusinessPartnerContent from "./BusinessPartnerContent";


const BusinessTypesDetail = () => {
    const { partnerId, partnerName } = useParams();
    
    const title= partnerName.replace("-"," ")
    
   
        return (
            <DashboardLayout title={title}>
                <BusinessPartnerContent partnerId={partnerId} />
                {/* </div> */}
                <Divider />
            </DashboardLayout>
        );
   
};

export default BusinessTypesDetail;
