import React, { useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import LeadTransactions from "../../components/leads/LeadTransaction";
import { useParams } from "react-router-dom";
import MessageHistoryList from "../../components/leads/LeadMessageList";
import { Button, Modal } from "react-bootstrap";
import LeadMessageContent from "./LeadMessage";

const LeadDetails = () => {
  const { username } = useParams();
  const [openSendMessage, setOpenSendMessage] = React.useState(false);
  const [activeTab, setActiveTab] = useState("transactions");
  const [messages , setMessages] = useState([
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


  const onFinishUpdate = ({newmessage}) => {
    setMessages((prevMessages) => {
      return [
        {
          id: prevMessages.length + 1,
          ...newmessage
        },
        ...prevMessages,
      ];
    });

  };


  return (
    <DashboardLayout title={"Lead Details"}>
      <div class="leed-detail-page">
        <div className="lead-top-container">
          <div>
            <div class="leed-detail-header">
              <div class="leed-detail-profile-image">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile-Image"
                />
              </div>
              <div class="leed-detail-info">
                <h1 className="fs-4">John Doe</h1>
                <p>
                  <i class="bi bi-envelope"></i>{" "}<a href="mailto:johndoe@example.com">johndoe@example.com</a>
                </p>
                <p>
                <i class="bi bi-telephone"></i>{" "}<a href="tel:+1234567890">+1 234 567 890</a>
                </p>
                <button className="btn btn-primary btn-sm"  onClick={() => setOpenSendMessage(true)}><i class="bi bi-send"></i>Send Message</button>
              </div>
              
            </div>
            
            <div id="transactions" className="mt-2 display-big-only">
              <h3 className="fs-5 d-flex align-items-center justify-content-between">Message History </h3>
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
        <button className={`tab-leads-button ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
         <i class="bi bi-chat-left-text"></i> Messages
        </button>
        <button className={`tab-leads-button ${activeTab === 'transactions' ? 'active' : ''}`} onClick={() => setActiveTab('transactions')}>
         <i class="bi bi-cash-stack"></i> Transactions
        </button>
      </div>
      <div className="leads-tab-content">
        {activeTab === 'messages' ?  <MessageHistoryList messages={messages} /> :  <LeadTransactions username={username} />}
      </div>

      </div>

      <Modal
      aria-labelledby="contained-modal-title-vcenter"
      size="md"
      centered
      show={openSendMessage}
      onHide={()=>setOpenSendMessage(false)}>

      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
          <h5>Send to John Doe</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
  
       <LeadMessageContent  network={{email:"navinlamsal11@gmail.com", phone:"+9779846983867"}} onClose={() => {setOpenSendMessage(false)}} onFinish={onFinishUpdate}/>
      </Modal.Body>

    </Modal>
    </DashboardLayout>
  );
};

export default LeadDetails;
