import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import Receive from "../../images/svg/increase.svg";
import Send from "../../images/svg/decrease.svg";
import Refer from "../../images/svg/increase.svg";

const LeadsTransactionCard = ({
  transactionType,
  narration,
  transactiontime,
  transactionamount,
  currency_received,
}) => {
  const currency = useSelector((state) => state.currencyReducer.currencyDetail);

  // Determine icon based on transaction type
  const iconSrc =
    transactionType === "RECEIVE"
      ? Receive
      : transactionType === "REFER"
      ? Refer
      : Send;

  return (
    <>
      <div
        className="d-flex w-100 justify-content-between border-bottom border-warning"
        // onClick={toggleModal}
        style={{ cursor: "pointer" }}
      >
        <div className="d-flex align-items-center mb-1 w-100 text-dynamic-white">
          <div
            className="partner-logo-wrapper bg-white ms-0 me-2 d-flex justify-content-center align-items-center text-uppercase"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "contain",
              padding: "0.5rem",
            }}
          >
            <img
              src={iconSrc}
              alt={
                transactionType === "RECEIVE"
                  ? "R"
                  : transactionType === "REFER"
                  ? "R"
                  : "S"
              }
            />
          </div>
          <div className="d-grid w-100">
            <span className="fw-medium mb-2 d-flex justify-content-between py-2">
              <span className="fw-medium d-flex flex-column justify-content-start">
                <span style={{ fontSize: "16px" }}>{narration[0].toUpperCase() + narration.slice(1)}</span>
                <span>
                  <i className="bi bi-calendar"></i>&nbsp;&nbsp;
                  {moment.utc(transactiontime).local().format("MMM DD, YY h:mm a")}
                </span>
              </span>
              <span className="fw-medium">
                {transactionType === "RECEIVE"
                  ? "+"
                  : transactionType === "REFER"
                  ? "+"
                  : "-"}
                &nbsp;
                {currency_received ?? currency.symbol}&nbsp;
                {transactionamount}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadsTransactionCard;
