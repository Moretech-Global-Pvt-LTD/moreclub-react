import React from "react";

import { useSelector } from "react-redux";
import QrReader from "../../../components/QR/qrscanner";
import QRcontent from "./QRcontent";

const ScannarContent = (props) => {
  const { title } = props;
  const user = useSelector((state) => state.userReducer);

  return (
    <div>
      <div className="Scanner-wrapper">
        <div className="Scanner-container">
          <h1 className="text-center">{title}</h1>
          <div
            style={{ width: "300px", height: "300px", position: "relative" }}
          >
            <QrReader />
          </div>
        </div>
        <QRcontent />
      </div>
    </div>
  );
};

export default ScannarContent;
