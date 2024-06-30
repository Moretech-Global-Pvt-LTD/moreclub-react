import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
const CouponTrnsactionCard = ({
  Coupon,
  business,
  transactiontime,
  transactionamount,
  remainingbalance,
  totalamount,
  usedBalance,
  currencyCode,
  converted,
 paid_amount
}) => {

  const used_balance = parseFloat(totalamount-paid_amount).toFixed(2);
  const currency = useSelector((state)=>state.currencyReducer.currencyDetail)
  return (
    <div className="d-flex w-100 justify-content-between border-bottom border-warning ">
      <div className="d-flex align-items-center mb-1 w-100 text-dynamic-white">
        <div
          className="partner-logo-wrapper ms-0 me-2  d-flex justify-content-center align-items-center text-uppercase"
          style={{
            width: "40px",
            height: "40px",
            objectFit: "contain",
            padding: "0.5rem",
            backgroundColor:"red"
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 14 14"
          >
            <path
              fill="#fff"
              fill-rule="evenodd"
              d="M0 11c0 .828.67 1.5 1.498 1.5h11.004C13.33 12.5 14 11.828 14 11V8.966a.5.5 0 0 0-.369-.483a1.537 1.537 0 0 1 0-2.966a.5.5 0 0 0 .369-.483V3c0-.828-.67-1.5-1.498-1.5H1.498C.67 1.5 0 2.172 0 3v2.03a.5.5 0 0 0 .373.483a1.537 1.537 0 0 1 0 2.974A.5.5 0 0 0 0 8.97zm4.962-1.058l5-5a.625.625 0 0 0-.883-.884l-5 5a.625.625 0 1 0 .883.884M4.021 5a1 1 0 1 1 2 0a1 1 0 0 1-2 0m4 4a1 1 0 1 1 2 0a1 1 0 0 1-2 0"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div className="d-grid w-100">
          <span className="fw-medium mb-0 d-flex justify-content-between">
          <span >{`${business}`}</span>
          <span className="row">
            <span className="fw-medium text-end">&#8722;&nbsp;{currencyCode}&nbsp;{used_balance}</span>
            <span className="fw-normal text-end">{"("}&euro;&nbsp;{converted}{")"}</span>
          </span>
          </span>          
          <span className="" style={{ fontSize: "16px" }}>{Coupon}</span>
          <span>
            <i className="bi bi-calendar"></i>&nbsp;&nbsp;
            {moment.utc(transactiontime).local().format("h:mm a")}
          </span>
          <span className="mt-2">Bill total&nbsp;{currencyCode}&nbsp;{totalamount}</span>
          <span className="mt-2">Balance&nbsp;{currency.symbol}&nbsp;{remainingbalance}</span>
        </div>
      </div>
    </div>
  );
};

export default CouponTrnsactionCard;
