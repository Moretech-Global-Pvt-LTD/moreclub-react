import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

const SendCard = ({
  receiver,
  sender,
  narration,
  transactiontime,
  transactionamount,
  previousbalance,
  currency_received,
  currency_send
}) => {
  const currency = useSelector((state)=>state.currencyReducer.currencyDetail)
  return (
    <div className="d-flex w-100 justify-content-between border-bottom border-warning ">
      <div className="d-flex align-items-center mb-1 w-100 text-dynamic-white">
        <div
          className="partner-logo-wrapper bg-danger ms-0 me-2 d-flex justify-content-center align-items-center text-uppercase"
          style={{
            width: "35px",
            height: "35px",
            objectFit: "contain",
            padding:"0.5rem"
          
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
              <path d="M7 6.67c-1.066 0-2.08-.12-3-.334c-.96-.225-2 .466-2 1.473v11.009c0 .808 0 1.212.194 1.629c.11.238.363.561.565.724c.354.287.65.356 1.241.494c.92.216 1.934.335 3 .335c1.917 0 3.668-.386 5-1.022s3.083-1.022 5-1.022c1.066 0 2.08.12 3 .335c.96.224 2-.467 2-1.474V7.81c0-.809 0-1.213-.194-1.63a2.4 2.4 0 0 0-.565-.724C20 4.439 18 5.442 18 5.442" />
              <path d="M14.5 13.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-9 1v.009m13-2.017v.01M9.5 4.5C9.992 3.994 11.3 2 12 2m2.5 2.5C14.008 3.994 12.7 2 12 2m0 0v6" />
            </g>
          </svg>
        </div>
        <div className="d-grid w-100">
          <span className="fw-medium mb-2 d-flex justify-content-between">
            <span className=""></span>
            <span className="fw-medium"> &#8722;&nbsp;{currency_send ?? currency.symbol}&nbsp;{transactionamount}</span>
          </span>
          {/* <span>{`Receiver: ${receiver}`}</span> */}
          {/* <span>{`Sender  ${sender}`}</span> */}
          <span style={{ fontSize: "16px" }}>{`${narration}`}</span>
          <span>
            <i className="bi bi-calendar"></i>&nbsp;&nbsp;
            {moment.utc(transactiontime).local().format("h:mm a")}
          </span>
          <span className="mt-2">Balance&nbsp;{currency.symbol}&nbsp;{previousbalance}</span>
        </div>
      </div>
    </div>
  );
};

export default SendCard;
