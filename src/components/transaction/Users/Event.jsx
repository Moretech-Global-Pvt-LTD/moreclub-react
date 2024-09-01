import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

const EventTransCard = ({
  narration,
  transactiontime,
  transactionamount,
  previousbalance,
  currency_send,

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
              <path d="M4 18V8.5A4.5 4.5 0 0 1 8.5 4h7A4.5 4.5 0 0 1 20 8.5v7a4.5 4.5 0 0 1-4.5 4.5H6a2 2 0 0 1-2-2" />
              <path d="M8 12h3.5a2 2 0 1 1 0 4H8V9a1 1 0 0 1 1-1h1.5a2 2 0 1 1 0 4H9m7 4h.01" />
            </g>
          </svg>
        </div>
        <div className="d-grid w-100">
          <span className="fw-medium mb-2 d-flex justify-content-between">
            <span className=""></span>
            <span className="fw-medium">
              &nbsp;{currency_send ?? currency.symbol}&nbsp;{transactionamount}
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

export default EventTransCard;
