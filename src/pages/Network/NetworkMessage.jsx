import React from "react";
import MessageContent from "./MessageContent";
import DashboardLayout from "../../components/Layout/DashboardLayout";

const NetworkMessage = () => {
  return (
    <DashboardLayout title={"Send Message"}>
      <MessageContent />
    </DashboardLayout>
  );
};

export default NetworkMessage;
