import React from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import LeadTransactions from "../../components/leads/LeadTransaction";
import { useParams } from "react-router-dom";
import MessageHistoryList from "../../components/leads/LeadMessageList";
import MessageContent from "../Network/MessageContent";

const LeadDetails = () => {
  const { username } = useParams();

  const sampleMessages = [
    {
      id: 1,
      via: "email",
      subject: "Order Confirmation",
      body: "Your order #12345 has been confirmed. Thank you for shopping with us.",
      response: "Thank you for the update.",
    },
    {
      id: 2,
      via: "phone",
      body: "We tried reaching you regarding your recent inquiry. Please call us back.",
      response: "I’ll call back later.",
    },
    {
      id: 3,
      via: "email",
      subject: "Account Verification",
      body: "Please verify your email by clicking the link provided.",
      response: null,
    },
  ];

  return (
    <DashboardLayout title={"Lead Details"}>
      <div class="leed-detail-page">
        <div className="lead-top-container">
          <div>
            <div class="leed-detail-header">
              <div class="leed-detail-profile-image">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile Image"
                />
              </div>
              <div class="leed-detail-info">
                <h1 className="fs-4">John Doe</h1>
                <p>
                  <a href="mailto:johndoe@example.com">johndoe@example.com</a>
                </p>
                <p>
                  <a href="tel:+1234567890">+1 234 567 890</a>
                </p>
              </div>
            </div>
            <div id="transactions" class="leed-detail-tab-pane active ">
              <h3 className="fs-5">Transaction History</h3>
              <LeadTransactions username={username} />
            </div>
          </div>

          <div>
            <div className="leed-detail-message">
              <MessageContent />
            </div>
            <div id="transactions" class="leed-detail-tab-pane active ">
              <h3 className="fs-5">Message History</h3>
              <MessageHistoryList messages={sampleMessages} />
            </div>
          </div>
        </div>
        <div className="lead-top-container"></div>
      </div>
    </DashboardLayout>
  );
};

export default LeadDetails;
