import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

const WithDrawCard = ({
  sender,
  narration,
  transactiontime,
  transactionamount,
  previousbalance,
}) => {
  const currency = useSelector((state)=>state.currencyReducer.currencyDetail)
  return (
    <div className="d-flex w-100 justify-content-between border-bottom border-warning ">
      <div className="d-flex align-items-center mb-1 w-100 text-dynamic-white">
        <div
          className="partner-logo-wrapper bg-warning ms-0 me-2 d-flex justify-content-center align-items-center text-uppercase"
          style={{
            width: "35px",
            height: "35px",
            objectFit: "contain",
            padding: "0.5rem",
           
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
          >
            <path
              fill="#fff"
              d="m8 0l2 3H9v2H7V3H6zm7 7v8H1V7zm1-1H0v10h16z"
            />
            <path
              fill="#fff"
              d="M8 8a3 3 0 1 1 0 6h5v-1h1V9h-1V8zm-3 3a3 3 0 0 1 3-3H3v1H2v4h1v1h5a3 3 0 0 1-3-3"
            />
          </svg>
        </div>
        <div className="d-grid w-100">
          <span className="fw-medium mb-2 d-flex justify-content-between">
            <span className=""></span>
            <span className="fw-medium"> &#8722;&nbsp;{currency.symbol}&nbsp;{transactionamount}</span>
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

export default WithDrawCard;
