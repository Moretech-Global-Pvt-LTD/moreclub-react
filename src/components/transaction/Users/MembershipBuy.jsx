import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

const MembershipCouponCard = ({ narration, transactiontime, transactionamount, previousbalance, currency_received,
  currency_send }) => {
  const currency = useSelector((state)=>state.currencyReducer.currencyDetail)
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
            viewBox="0 0 32 32"
          >
            <path
              fill="#fff"
              d="M4 7a1 1 0 0 0 0 2h2.22l2.624 10.5c.223.89 1.02 1.5 1.937 1.5h12.47c.903 0 1.67-.6 1.907-1.47L27.75 10h-2.094l-2.406 9H10.78L8.157 8.5A1.984 1.984 0 0 0 6.22 7zm18 14c-1.645 0-3 1.355-3 3s1.355 3 3 3s3-1.355 3-3s-1.355-3-3-3m-9 0c-1.645 0-3 1.355-3 3s1.355 3 3 3s3-1.355 3-3s-1.355-3-3-3m3-14v5h-3l4 4l4-4h-3V7zm-3 16c.564 0 1 .436 1 1c0 .564-.436 1-1 1c-.564 0-1-.436-1-1c0-.564.436-1 1-1m9 0c.564 0 1 .436 1 1c0 .564-.436 1-1 1c-.564 0-1-.436-1-1c0-.564.436-1 1-1"
            />
          </svg>
        </div>
        <div className="d-grid w-100">
          <span className="fw-medium mb-2 d-flex justify-content-between">
          <span className=""></span>
            <span className="fw-medium">&#8722;&nbsp;{currency_send?? currency.symbol}&nbsp;{transactionamount}</span>
          </span>
          {/* <span>{`Receiver: ${receiver}`}</span> */}
          {/* <span>{`Sender  ${sender}`}</span> */}
          <span style={{fontSize:"16px"}}>{`${narration}`}</span>
          <span>
            <i className="bi bi-calendar"></i>&nbsp;&nbsp;
            {moment.utc(transactiontime).local().format('h:mm a')}
          </span>
          <span className="mt-2">
            Balance&nbsp;{currency.symbol}{previousbalance}
          </span>
        </div>
        
      </div>
      
    </div>
  );
};

export default  MembershipCouponCard;
