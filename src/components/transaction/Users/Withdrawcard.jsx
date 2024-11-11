import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

const WithDrawCard = ({
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
          className="partner-logo-wrapper bg-white ms-0 me-2  d-flex justify-content-center align-items-center text-uppercase"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "contain",
            padding: "0.5rem",
          }}
        >
          <img src={'./images/moredeals/decrease.svg'} alt="R" />
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

export default WithDrawCard;
