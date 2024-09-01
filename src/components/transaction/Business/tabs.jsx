import React, { useState } from "react";
import BillingTransactions from "./BillingTransaction";
import BusinessCouponsTransactions from "./BusinessCouponsTransaction";
import BusinessMembershipTransactions from "./BusinessMembershipTransaction";
import Filtercomponent from "../Users/Filtercomponent";

const BusinessTabs = () => {
  const [activeTab, setActiveTab] = useState("alltransaction");

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="featured-nfts-wrap">
      <div className="row">
        <div className="tabs">
          <button
            className={`${
              activeTab === "alltransaction" ? "tablinks active" : "tablinks"
            } rounded-pills`}
            onClick={() => openTab("alltransaction")}
          >
            All transaction
          </button>
          {/* <button
            className={activeTab === "Coupons" ? "tablinks active" : "tablinks"}
            onClick={() => openTab("Coupons")}
          >
            Coupons
          </button> */}
          <button
            className={
              activeTab === "Membership" ? "tablinks active" : "tablinks"
            }
            onClick={() => openTab("Membership")}
          >
            Memberships
          </button>
        </div>
        <div className="d-flex flex-column-reverse flex-lg-row w-100">
          <div className="content-outside-wrapper w-lg-75">
            <div className="nft-card " style={{ maxWidth: "640px" }}>
              <div
                id="alltransaction"
                className={`
                ${
                  activeTab === "alltransaction"
                    ? "tabcontent active"
                    : "tabcontent"
                } `}
              >
                <BillingTransactions />
              </div>

              {/* <div
                id="Coupons"
                className={
                  activeTab === "Coupons" ? "tabcontent active" : "tabcontent"
                }
              >
                <BusinessCouponsTransactions />
              </div> */}

              <div
                id="Membership"
                className={
                  activeTab === "Membership"
                    ? "tabcontent active"
                    : "tabcontent"
                }
              >
                <BusinessMembershipTransactions />
              </div>
            </div>
          </div>
          <div className="content-outside-wrapper w-lg-50">
            <div className="tabcontent active">
              <Filtercomponent activeTab={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessTabs;
