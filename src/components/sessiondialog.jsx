import React from "react";
import { Modal } from "antd";

const SessionExpiredModal = ({ visible, onLogout }) => {
  return (
    <Modal
      title="Session Expired"
      centered
      visible={visible}
      onOk={onLogout}
      onCancel={onLogout}
      cancelButtonProps={{ style: { display: "none" } }}
      style={{ backdropFilter: "blur(15px)", zIndex: 1200 }} // Apply blur effect
      maskStyle={{ backdropFilter: "blur(15px)" }}
    >
      <p className="text-black">
        Your session has been expired. Please log in again.
      </p>
    </Modal>
  );
};

export default SessionExpiredModal;
