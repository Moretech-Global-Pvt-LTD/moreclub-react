import React from "react";
import { Button } from "react-bootstrap";

const Receipt = ({ transferData, onDownload }) => {
  return (
    <div>
      <h2>Receipt</h2>
      <pre>{JSON.stringify(transferData, null, 2)}</pre>
      <Button variant="primary" onClick={onDownload}>Download Receipt</Button>
    </div>
  );
};

export default Receipt;
