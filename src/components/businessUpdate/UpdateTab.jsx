import React, { useState } from "react";
import BusinessDocumentUpdate from "../../pages/Businesspages/BusinessUpdate/BusinessDocumentUpdate";
import BusinessUpdatePage from "../../pages/Businesspages/BusinessUpdate/BusinessUpdatePage";
import PaymentForm from "../../pages/Businesspages/BusinessUpdate/BusinessPaymentUpdate";

const UpdateTab = ({ business }) => {
  const [activeTab, setActiveTab] = useState("Business-Details");

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="featured-nfts-wrap">
      <div className="container">
        <div className="row">
          <div className="tabs">
            <button
              className={`${
                activeTab === "Business-Details"
                  ? "tablinks active"
                  : "tablinks"
              } rounded-pills`}
              onClick={() => openTab("Business-Details")}
            >
              Business Details
            </button>
            {/* <button
              className={`${activeTab === "Business-Logo" ? "tablinks active" : "tablinks"} `}
              onClick={() => openTab("Business-Logo")}
            >
              Logo
            </button> */}
            <button
              className={
                activeTab === "Business-Documents"
                  ? "tablinks active"
                  : "tablinks"
              }
              onClick={() => openTab("Business-Documents")}
            >
              Business Documents
            </button>
            <button
              className={
                activeTab === "Business-Cards" ? "tablinks active" : "tablinks"
              }
              onClick={() => openTab("Business-Cards")}
            >
              Card Details
            </button>
          </div>
          <div className="content-outside-wrapper">
            <div className="nft-card">
              <div
                id="Business-Details"
                className={`
                ${
                  activeTab === "Business-Details"
                    ? "tabcontent active"
                    : "tabcontent"
                } `}
              >
                {business.businessProfile && (
                  <BusinessUpdatePage business={business} />
                )}
              </div>

              {/* <div
              id="Business-Logo"
              className={
                activeTab === "Business-Logo" ? "tabcontent active" : "tabcontent"
              }
            >
                {business.businessProfile && 
            <BussinessLogoUpdate business={business}/>
                }
            </div> */}

              <div
                id="Business-Documents"
                className={
                  activeTab === "Business-Documents"
                    ? "tabcontent active"
                    : "tabcontent"
                }
              >
                {business.businessProfile && (
                  <BusinessDocumentUpdate business={business} />
                )}
              </div>
              <div
                id="Business-Cards"
                className={
                  activeTab === "Business-Cards"
                    ? "tabcontent active"
                    : "tabcontent"
                }
              >
                {
                  business.businessProfile && <PaymentForm />
                  // <BussinessCardaccounts />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTab;
