import React, { useState } from "react";
import PointsTransactions from "./Users/PointsTransaction";
import CouponsTransaction from "./Users/CouponsTransaction";
import Filtercomponent from "./Users/Filtercomponent";

const CustomTabs = () => {
  const [activeTab, setActiveTab] = useState("Transactions");


  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="featured-nfts-wrap">
      <div className="row">
        <div className="tabs">
          <button
            className={`${
              activeTab === "Transactions" ? "tablinks active" : "tablinks"
            } rounded-pills`}
            onClick={() => openTab("Transactions")}
          >
            Transactions
          </button>
          {/* <button
            className={`${
              activeTab === "Coupons" ? "tablinks active" : "tablinks"
            } `}
            onClick={() => openTab("Coupons")}
          >
            Coupons
          </button> */}
        </div>

        <div className="d-flex flex-column-reverse flex-lg-row w-100">
          <div className="content-outside-wrapper w-lg-75">
            <div
              id="Transactions"
              className={`
                ${
                  activeTab === "Transactions"
                    ? "tabcontent active"
                    : "tabcontent"
                } `}
            >
              <PointsTransactions />
            </div>
            {/* <div
              id="Coupons"
              className={
                activeTab === "Coupons" ? "tabcontent active" : "tabcontent"
              }
            >
              <CouponsTransaction />
            </div> */}
          </div>
          <div className="content-outside-wrapper w-lg-50">
            <div className="tabcontent active">
            <Filtercomponent activeTab={activeTab}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTabs;
