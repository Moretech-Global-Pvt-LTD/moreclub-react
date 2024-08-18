import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

const ReferCard = ({
  narration,
  transactiontime,
  transactionamount,
  previousbalance,
  currency_received,
  currency_send
}) => {
  const currency = useSelector((state) => state.currencyReducer.currencyDetail);
  return (
    <div className="d-flex w-100 justify-content-between border-bottom border-warning ">
      <div className="d-flex align-items-center mb-1 w-100 text-dynamic-white">
        <div
          className="partner-logo-wrapper bg-primary ms-0 me-2 d-flex justify-content-center align-items-center text-uppercase"
          style={{
            width: "35px",
            height: "35px",
            objectFit: "contain",
            // backgroundColor: "#fff",
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
              stroke-width="2"
            >
              <rect width="6" height="6" x="16" y="16" rx="1" />
              <rect width="6" height="6" x="2" y="16" rx="1" />
              <rect width="6" height="6" x="9" y="2" rx="1" />
              <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3m-7-4V8" />
            </g>
          </svg>
        </div>
        <div className="d-grid w-100">
          <span className="fw-medium mb-2 d-flex justify-content-between">
            <span className=""></span>
            <span className="fw-medium">
              &#43;&nbsp;{currency_received?? currency.symbol}&nbsp;{transactionamount}
            </span>
          </span>
          {/* <span>{`Receiver: ${receiver}`}</span> */}
          {/* <span>{`Sender  ${sender}`}</span> */}
          <span style={{ fontSize: "16px" }}>{`${narration}`}</span>
          <span>
            <i className="bi bi-calendar"></i>&nbsp;&nbsp;
            {moment.utc(transactiontime).local().format("h:mm a")}
          </span>
          <span className="mt-2">
            Balance&nbsp;{currency.symbol}
            {previousbalance}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReferCard;
