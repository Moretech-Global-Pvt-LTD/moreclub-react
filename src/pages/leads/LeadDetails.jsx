import React, { useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import LeadTransactions from "../../components/leads/LeadTransaction";
import { useParams } from "react-router-dom";
import MessageHistoryList from "../../components/leads/LeadMessageList";
import { Button, Modal, Placeholder } from "react-bootstrap";
import LeadMessageContent from "./LeadMessage";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";

const LeadDetails = () => {
  const { username } = useParams();
  const [openSendMessage, setOpenSendMessage] = React.useState(false);
  const [activeTab, setActiveTab] = useState("transactions");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "user",
      via: "email",
      senderName: "John Doe",
      timestamp: Date.now(),
      subject: "Order Inquiry",
      body: "Hi there! I wanted to ask about my recent order.",
    },
    {
      id: 2,
      sender: "admin",
      senderName: "Support Team",
      via: "email",
      timestamp: "2025-01-10T12:32:00",
      subject: "Order Inquiry",
      body: "Hello John! Sure, could you provide your order ID?",
    },
    {
      id: 3,
      sender: "user",
      senderName: "John Doe",
      via: "phone_number",
      timestamp: "2025-01-09T12:35:00",
      body: "The order ID is #12345. Can you check if it's shipped?",
    },
    {
      id: 4,
      sender: "admin",
      senderName: "Support Team",
      via: "email",
      timestamp: "2025-01-09T12:40:00",
      body: "Thank you! Let me check that for you. It seems your order has been shipped and is on its way.",
    },
  ]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["lead details", username],
    queryFn: () => {
      const response = axiosInstance.get(
        `${baseURL}leads/user/details/${username}`
      );
      return response;
    },
    keepPreviousData: true,
  });

  const onFinishUpdate = ({ newmessage }) => {
    setMessages((prevMessages) => {
      return [
        {
          id: prevMessages.length + 1,
          ...newmessage,
        },
        ...prevMessages,
      ];
    });
  };

  console.log("messages", data?.data?.data?.username);

  return (
    <DashboardLayout title={"Lead Details"}>
      <div class="leed-detail-page">
        <div className="lead-top-container">
          <div>
            {isLoading && (
              <div class="leed-detail-header">
                <div class="leed-detail-profile-image">
                  <Placeholder
                    as="p"
                    animation="glow"
                    className="rounded my-2 w-100"
                  >
                    <Placeholder
                      xs={12}
                      style={{ height: "4rem", width: "4rem" }}
                    />
                  </Placeholder>
                </div>

                <div class="leed-detail-info">
                  <h1 className="fs-4">
                    <Placeholder
                      as="p"
                      animation="glow"
                      className="rounded my-2 w-100"
                    >
                      <Placeholder xs={12} style={{ height: "0.5rem" }} />
                    </Placeholder>
                  </h1>
                  <p>
                    <a href={`mailto:${data?.data?.data?.email}`}>
                      <Placeholder
                        as="p"
                        animation="glow"
                        className="rounded my-2 w-100"
                      >
                        <Placeholder xs={12} style={{ height: "0.5rem" }} />
                      </Placeholder>
                    </a>
                  </p>
                  <p>
                    <a href={`tel:${data?.data?.data?.phone_number}`}>
                      <Placeholder
                        as="p"
                        animation="glow"
                        className="rounded my-2 w-100"
                      >
                        <Placeholder xs={12} style={{ height: "0.5rem" }} />
                      </Placeholder>
                    </a>
                  </p>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setOpenSendMessage(true)}
                  >
                    <i class="bi bi-send"></i>Send Message
                  </button>
                </div>
              </div>
            )}
            {isError && (
              <div class="leed-detail-header">
                

                <div class="leed-detail-info">
                  <h1 className="fs-4">
                    Oop's error getting details
                  </h1>
                  
                  
                </div>
              </div>
            )}
            {data && (
              <div class="leed-detail-header">
                {data?.data?.data?.display_picture === null ? (
                  <div class="leed-detail-profile-image">
                    <img
                      src={data?.data?.data?.display_picture}
                      alt="Profile-Image"
                    />
                  </div>
                ) : (
                  <div
                    class="leed-detail-profile-image bg-white text-black d-flex align-items-center justify-content-center fw-bold fs-6 rounded-pill"
                    style={{ width: "4rem", height: "4rem" }}
                  >
                    {data?.data?.data?.first_name[0].toUpperCase()}
                    {data?.data?.data?.last_name[0].toUpperCase()}
                  </div>
                )}

                <div class="leed-detail-info">
                  <h1 className="fs-4">
                    {data?.data?.data?.first_name} {data?.data?.data?.last_name}
                  </h1>
                  <p>
                    <i class="bi bi-envelope"></i>{" "}
                    <a href={`mailto:${data?.data?.data?.email}`}>
                      {data?.data?.data?.email}
                    </a>
                  </p>
                  <p>
                    <i class="bi bi-telephone"></i>{" "}
                    <a href={`tel:${data?.data?.data?.phone_number}`}>
                      {data?.data?.data?.phone_number}
                    </a>
                  </p>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setOpenSendMessage(true)}
                  >
                    <i class="bi bi-send"></i>Send Message
                  </button>
                </div>
              </div>
            )}

            <div id="transactions" className="mt-2 display-big-only">
              <h3 className="fs-5 d-flex align-items-center justify-content-between">
                Message History{" "}
              </h3>
              <MessageHistoryList messages={messages} />
            </div>
          </div>

          <div>
            <div id="transactions" class="mt-2 display-big-only">
              <h3 className="fs-5">Transaction History</h3>
              <LeadTransactions username={username} />
            </div>
          </div>
        </div>
        <div className="leads-tabs">
          <button
            className={`tab-leads-button ${
              activeTab === "messages" ? "active" : ""
            }`}
            onClick={() => setActiveTab("messages")}
          >
            <i class="bi bi-chat-left-text"></i> Messages
          </button>
          <button
            className={`tab-leads-button ${
              activeTab === "transactions" ? "active" : ""
            }`}
            onClick={() => setActiveTab("transactions")}
          >
            <i class="bi bi-cash-stack"></i> Transactions
          </button>
        </div>
        <div className="leads-tab-content">
          {activeTab === "messages" ? (
            <MessageHistoryList messages={messages} />
          ) : (
            <LeadTransactions username={username} />
          )}
        </div>
      </div>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
        show={openSendMessage}
        onHide={() => setOpenSendMessage(false)}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter text-center"
            className="text-dynamic-white"
          >
            <h5>Send to John Doe</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LeadMessageContent
            network={{
              email: "navinlamsal11@gmail.com",
              phone: "+9779846983867",
            }}
            onClose={() => {
              setOpenSendMessage(false);
            }}
            onFinish={onFinishUpdate}
          />
        </Modal.Body>
      </Modal>
    </DashboardLayout>
  );
};

export default LeadDetails;
