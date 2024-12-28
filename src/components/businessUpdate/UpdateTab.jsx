import React, { useState } from "react";
import PaymentForm from "./BusinessPaymentUpdate";
import BusinessUpdateForm from "./BusinessUpdateForm";
import BusinessDocumentUpdate from "./BusinessDocumentUpdate";

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
                  <BusinessUpdateForm business={business} />
                )}
              </div>

              

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
