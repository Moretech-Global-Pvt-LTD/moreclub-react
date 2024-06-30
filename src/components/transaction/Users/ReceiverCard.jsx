import React from "react";
import moment from "moment";

const ReceiveCard = ({
  receiver,
  sender,
  narration,
  transactiontime,
  transactionamount,
  previousbalance,
}) => {
  return (
    <div className="d-flex w-100 justify-content-between border-bottom border-warning ">
      <div className="d-flex align-items-center mb-1 w-100 text-dynamic-white">
        <div
          className="partner-logo-wrapper bg-success ms-0 me-2  d-flex justify-content-center align-items-center text-uppercase"
          style={{
            width: "40px",
            height: "40px",
            objectFit: "contain",
            padding: "0.5rem",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              color="#fff"
            >
              <path d="M18 5.442s2-1.003 3.241.013c.202.163.454.487.565.724C22 6.596 22 7 22 7.81v11.009c0 1.006-1.04 1.697-2 1.473a13.2 13.2 0 0 0-3-.335c-1.917 0-3.668.386-5 1.022S8.917 22 7 22c-1.066 0-2.08-.12-3-.334c-.591-.139-.887-.208-1.241-.494a2.4 2.4 0 0 1-.565-.725C2 20.03 2 19.626 2 18.817V7.81c0-1.008 1.04-1.7 2-1.474c.775.181 1.617.294 2.5.325" />
              <path d="M14.5 13.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-9 1v.009m13-2.017v.01M9.5 5.5C9.992 6.006 11.3 8 12 8m2.5-2.5C14.008 6.006 12.7 8 12 8m0 0V2" />
            </g>
          </svg>
        </div>
        <div className="d-grid w-100">
          <span className="fw-medium mb-2 d-flex justify-content-between">
            <span className=""></span>
            <span className="fw-medium">&#43;&nbsp;${transactionamount}</span>
          </span>
          {/* <span>{`Receiver: ${receiver}`}</span> */}
          {/* <span>{`Sender  ${sender}`}</span> */}
          <span style={{ fontSize: "16px" }}>{`${narration}`}</span>
          <span>
            <i className="bi bi-calendar"></i>&nbsp;&nbsp;
            {moment.utc(transactiontime).local().format("h:mm a")}
          </span>
          <span className="mt-2">Balance&nbsp;{previousbalance}</span>
        </div>
      </div>
    </div>
  );
};

export default ReceiveCard;
