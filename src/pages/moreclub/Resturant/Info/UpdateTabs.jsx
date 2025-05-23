import React, { useState } from "react";
import { Col, Placeholder } from "react-bootstrap";
import Banner from "../../../../components/Moreclub/Resturant/Setup/Banner";
import Logo from "../../../../components/Moreclub/Resturant/Setup/Logo";
import UpdateInfoForm from "../../../../components/Moreclub/Resturant/Setup/updateinfo";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";
import UniversalErrorbox from "../../../../components/Layout/UniversalErrorBox";

const InfoUpdateTabs = () => {
  const [activeTab, setActiveTab] = useState("Information");
    const { id } = useParams();
      const { data, isLoading, isError } = useQuery({
        queryKey: [`Restaurant ${id}`],
        queryFn: async () => {
          const response = await morefoodAuthenticatedAxios.get(
            `moreclub/user/restaurants/${id}/`
          );
          const data = await response.data.data;
          return data;
        },
        staleTime: 300000,
      });

      if (isLoading) {
        return (
          
            <div className="row gap-2">
              <Placeholder as="p" animation="glow" className="rounded w-75 me-2">
              <Placeholder xs={12} style={{ height: "10rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
              <Placeholder xs={12} style={{ height: "10rem" }} />
            </Placeholder>
            </div>
        
        );
      }

      if (isError) {
        return  <UniversalErrorbox 
        message='Something went wrong while fetching the Restaurant data'
        retry={[`Restaurant ${id}`]}
        />
      }
  
  
  
    
    

  const openTab = (tabName) => {
      setActiveTab(tabName);
  };




  return (
    <div className="featured-nfts-wrap">
      <div className="row">
        <div className="tabs">
          <button
            className={`${
              activeTab === "Information" ? "tablinks active" : "tablinks"
            } rounded-pills`}
            onClick={() => openTab("Information")}
          >
            Resturant Information
          </button>
          <button
            className={`${
              activeTab === "Images" ? "tablinks active" : "tablinks"
            } `}
            onClick={() => openTab("Images")}
          >
            Images
          </button>
        </div>

        <div className="d-flex flex-column-reverse flex-lg-row w-100">
          <div className="content-outside-wrapper w-100">

            <div
              id="Information"
              className={`
                ${
                  activeTab === "Information"
                    ? "tabcontent active"
                    : "tabcontent"
                } `}
            >
              <UpdateInfoForm data={data} />
            </div>
            <div
              id="Images"
              className={
                activeTab === "Images" ? "tabcontent active" : "tabcontent"
              }
            > 
              <Col className="gap-4">
                <Banner data={data.banner} />
                <Logo data={data.logo} />
              </Col>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoUpdateTabs;
