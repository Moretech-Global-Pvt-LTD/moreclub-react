import React from "react";
import { QRCode } from "antd";
import { hostURL } from "../../../config/config";
import Logos from "../../../images/logo/logoblack.png";
import { useSelector } from "react-redux";
import QrReader from "../../../components/QR/qrscanner";

const ScannarContent = (props) => {
  const { title } = props;
  const user = useSelector((state) => state.userReducer);

  return (
    <div>
      <div className="Scanner-wrapper">
        <div className="Scanner-container">
          <h1 className="text-center">{title}</h1>
          <div style={{width:"300px",height:"300px" ,position:"relative"}}>

          <QrReader/>
          </div>
        </div>

        <div className="row">
          <h1 className="text-center mb">Refer your Friends </h1>

          {/* {user && user.isAuthenticated && 
            <div className="qr-container">
              <QRCode
                errorLevel="H"
                value="https://moretechglobal.com/register-membership?bpms="
                icon="https://t3.ftcdn.net/jpg/06/14/84/58/360_F_614845842_pNcPaSxVwBiO6hGaaSXKrQOCs6xqnijX.jpg"
                style={{ background: "white" }}
              />
            </div>
            }
            {!user && !user.isAuthenticated &&  */}
          <div className="qr-container">
            <QRCode
              errorLevel="H"
              value={`${hostURL}/register-membership`}
              icon={Logos}
              style={{ background: "white" }}
            />
          </div>
          {/* } */}
          {/* <div className="row">
            <div className="d-flex align-items-center">
              <div className="row ms-auto me-auto">
              <h3>Log in to Get Referal code</h3>
              <button className="btn btn-primary">Login</button>

              </div>
            </div>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default ScannarContent;
