import React, { useState } from 'react'
import Saloonlayout from '../setup/Saloonlayout'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../..';
import { moresaloonURL } from '../../../../config/config';
import { Col, Placeholder } from 'react-bootstrap';
import SaloonUpdateInfoForm from '../../../../components/Moreclub/Saloon/SaloonUpdateFrom';
import SaloonBanner from '../../../../components/Moreclub/Saloon/SaloonBanner';
import SaloonLogo from '../../../../components/Moreclub/Saloon/SaloonLogo';

const SaloonUpdate = () => {

  const [activeTab, setActiveTab] = useState("Information");
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: [`saloon detail ${id}`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${moresaloonURL}moreclub/users/saloon/${id}/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 100,
  });

  if (isLoading) {
    return (
      <Saloonlayout>
        <div className="row gap-2">
          <Placeholder as="p" animation="glow" className="rounded w-75 me-2">
            <Placeholder xs={12} style={{ height: "10rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
            <Placeholder xs={12} style={{ height: "10rem" }} />
          </Placeholder>
        </div>
      </Saloonlayout>
    );
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: retriving</div>;
  }






  const openTab = (tabName) => {
    setActiveTab(tabName);
  };




  return (
    <Saloonlayout>
      <div className="featured-nfts-wrap">
        <div className="row">
          <div className="tabs">
            <button
              className={`${activeTab === "Information" ? "tablinks active" : "tablinks"
                } rounded-pills`}
              onClick={() => openTab("Information")}
            >
              Saloon Information
            </button>
            <button
              className={`${activeTab === "Images" ? "tablinks active" : "tablinks"
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
                ${activeTab === "Information"
                    ? "tabcontent active"
                    : "tabcontent"
                  } `}
              >
                <SaloonUpdateInfoForm data={data} />
              </div>
              <div
                id="Images"
                className={
                  activeTab === "Images" ? "tabcontent active" : "tabcontent"
                }
              >
                <Col className="gap-4">
                  <SaloonBanner data={data.banner}  />
                  <SaloonLogo data={data.logo} />
                </Col>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Saloonlayout>
  );
};





export default SaloonUpdate;