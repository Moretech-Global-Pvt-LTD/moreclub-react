import React from "react";
import { Placeholder } from "react-bootstrap";

const SkeletonPayment = () => {
  return (
    <div className="d-flex g-4">
      <div className="me-4" style={{ width: "75%" }}>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "4rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "4rem" }} />
        </Placeholder>
      </div>
      <div className="" style={{ width: "25%" }}>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} size="lg" style={{ height: "15rem" }} />
        </Placeholder>
      </div>
    </div>
  );
};

export default SkeletonPayment;
