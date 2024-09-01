import React from "react";

import { Button } from "react-bootstrap";
import Notifications from "./Notifications";
import { Link } from "react-router-dom";

const DropNotificationContent = () => {
  return (
    <div className="w-100" style={{ overflowX: "hidden" }}>
      <div
        className="d-flex align-items-center justify-content-between mb-4"
        style={{ width: "100%" }}
      >
        <div className="text-dynamic-white ps-2">Notifications</div>
        <Link to={"/notification"} className="align-self-end">
          <Button variant="link">See all</Button>
        </Link>
      </div>
      <Notifications />
    </div>
  );
};

export default DropNotificationContent;
