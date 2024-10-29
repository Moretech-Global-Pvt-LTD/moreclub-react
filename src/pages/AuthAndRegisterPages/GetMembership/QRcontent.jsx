import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { message, QRCode } from "antd";
import { hostURL } from "../../../config/config";
import Logos from "../../../images/logo/logoblack.png";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const QRcontent = () => {
  const user = useSelector((state) => state.userReducer);
  const [switchvalue, setSwitchValue] = React.useState(true);
  const linkInputRef = useRef(null);

  const copyLink = () => {
    const linkInput = linkInputRef.current;
    if (linkInput) {
      linkInput.select();
      document.execCommand("copy");
      message.success("Link copied to clipboard:");
    }
  };

  return (
    <div className="row mt-0 mt-lg-5">
      <div className="d-flex gap-2 ">
       <label className={`fs-6 fw-bold ${switchvalue ? "text-success" : "text-secondary"}`}>Referal Qr </label>
      <Form.Check 
        type="switch"
        id="custom-switch"
        value={switchvalue}
        onChange={() => setSwitchValue(!switchvalue)}
        className=" mb-3 "
        bsPrefix="h-6 bg-success"
        />
        <label className={`fs-6 fw-bold ${!switchvalue ? "text-success" : "text-secondary"}`}>Profile Qr </label>
      </div>
      <>
        {switchvalue && (
          <>
            <h1 className="text-center mb text-primary">Refer your Friends </h1>
            {user && user.isAuthenticated && (
              <div className="qr-container">
                <img
                  src={`${user.user.user_refer_qr}`}
                  alt="qr"
                  style={{ width: "12rem", height: "auto" }}
                />
              </div>
            )}

            {!user && !user.isAuthenticated && (
              <div className="qr-container">
                <QRCode
                  errorLevel="H"
                  value={`${hostURL}/register-membership`}
                  icon={Logos}
                  style={{ background: "white" }}
                />
                <div className="mt-3 d-flex align-items-center">
                  <p>Login to get Your Rerefal QR</p>
                  <Link to={"/login"}>
                    <button className="btn btn-warning btn-sm">Login</button>
                  </Link>
                </div>
              </div>
            )}
            <p className="text-center text-danger"> Use this Qr to build your network and refer your friends else use the link below</p>
            <div className="d-flex align-items-center">
              <input
                type="text"
                // defaultValue= {`${hostURL}/register-membership?referral=${user.user.referral_code}`}
                defaultValue={user.user.link}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "0px",
                  padding: "4px",
                  width: "80%",
                }}
                ref={linkInputRef}
                readOnly
              />
              <span
                className=" p-1 ms-2 ps-2 pe-2  copy-button"
                onClick={copyLink}
              >
                <i class="bi bi-clipboard"></i>
              </span>
            </div>
          </>
        )}
        {!switchvalue && (

          <>
            <h1 className="text-center mb text-primary">Membership </h1>
            {user && user.isAuthenticated && (
              <div className="qr-container">
                <img
                  src={`${user.user.qr_code}`}
                  alt="qr"
                  style={{ width: "14rem", height: "auto" }}
                />
              </div>
            )}
            <p className="text-center text-danger">Use this Qr to get Discounts while Paying with Membership or Sending Or Receving Money in your wallet</p>
          </>

        )}
      
     
      
      </>
    </div>
  );
};

export default QRcontent;
