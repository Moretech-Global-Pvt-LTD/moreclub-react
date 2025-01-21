import React, { useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import LeadTransactions from "../../components/leads/LeadTransaction";
import { useParams } from "react-router-dom";
import MessageHistoryList from "../../components/leads/LeadMessageList";
import { Modal, Placeholder } from "react-bootstrap";
import LeadMessageContent from "./LeadMessage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";

const LeadDetails = () => {
  const { username } = useParams();
  const [openSendMessage, setOpenSendMessage] = React.useState(false);
  const [activeTab, setActiveTab] = useState("transactions");
 
  const queryClient = useQueryClient();


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
    queryClient.invalidateQueries(["lead message", username]); 
  };

  

  return (
    <DashboardLayout title={"Details"}>
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
                {data?.data?.data?.display_picture !== null ? (
                  <div class="leed-detail-profile-image">
                    <img
                      src={data?.data?.data?.display_picture}
                      alt="Profile-Image"
                    />
                  </div>
                ) : (
                  <div
                    class="leed-detail-profile-image  text-black d-flex align-items-center justify-content-center fw-bold fs-6 rounded-pill "
                    style={{ width: "4rem", height: "4rem", background: "#ffffff" }}
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
              <p>hello</p>
              <MessageHistoryList username={username} />
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
            <MessageHistoryList username={username} />
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
              username: data?.data?.data?.username,
              email: data?.data?.data?.email,
              phone: data?.data?.data?.phone_number,
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
