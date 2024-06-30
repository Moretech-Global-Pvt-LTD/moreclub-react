import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

const BillingCard = ({receiver, sender, transactiontime, Paid , BillTotal, currencyCode}) => {
  // const currency = useSelector((state)=>state.currencyReducer.currencyDetail)
  return (
    <div className="d-flex w-100 justify-content-between border-bottom border-warning ">
      <div className="d-flex align-items-center my-3  text-dynamic-white">
        <div
          className="partner-logo-wrapper ms-0 me-2 d-flex justify-content-center align-items-center text-uppercase"
          style={{
            width: "35px",
            height: "35px",
            objectFit: "contain",
            backgroundColor: "#fff",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <g transform="rotate(90 12 12)">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M17 20V4m0 0l3 3m-3-3l-3 3M7 4v16m0 0l3-3m-3 3l-3-3"
              />
            </g>
          </svg>
        </div>
        <div className="d-grid ">
          <span className="fw-medium mb-2">
            <span className="bg-warning  text-dynamic-white px-2 py-1 rounded-pill ">Bill Create</span>
          </span>
          {/* <span>
            {`Receiver: ${receiver}`}
          </span> */}
          {/* <span>{`Sender  ${sender}`}</span> */}
          <span>{`SELL`}</span>

          <span>
            <i className="bi bi-calendar"></i>&nbsp;&nbsp;
            {moment(transactiontime).format('MMM DD YYYY')}{" "}
          </span>
        </div>
      </div>
      <div
        className="d-flex flex-column justify-content-between my-3 py-3 text-dynamic-white"
        style={{ width: "3rem" }}
      >
        <span className="align-self-end">Total&nbsp;{}&nbsp;{BillTotal}</span>
        <span className="align-self-start">Paid&nbsp;{}&nbsp;{Paid}</span>
      </div>
    </div>
  );
};

export default BillingCard;
