import React, { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import TransactionDetailView from "./transactionDetail";

const TransactionCard = ({
    transaction_id,
    transactionType,
    narration,
    transactiontime,
    transactionamount,
    previousbalance,
    currency_received,
}) => {
    const currency = useSelector((state) => state.currencyReducer.currencyDetail);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    };


    // Determine icon based on transaction type
    const iconSrc =
        transactionType === "RECEIVE"
            ? "./images/moredeals/increase.svg"
            : transactionType === "REFER" ? "./images/moredeals/increase.svg" : "./images/moredeals/decrease.svg";

    return (
        <>
        <div className="d-flex w-100 justify-content-between border-bottom border-warning" onClick={toggleModal} style={{cursor:"pointer"}}>
            <div className="d-flex align-items-center mb-1 w-100 text-dynamic-white">
                <div
                    className="partner-logo-wrapper bg-white ms-0 me-2 d-flex justify-content-center align-items-center text-uppercase"
                    style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                        padding: "0.5rem",
                    }}
                >
                    <img src={iconSrc} alt={transactionType === "RECEIVE" ? "R" : transactionType === "REFER" ? "R" : "S"} />
                </div>
                <div className="d-grid w-100">
                    <span className="fw-medium mb-2 d-flex justify-content-between">
                        <span className="fw-medium">
                            
                        </span>
                        <span className="fw-medium">
                            {transactionType === "RECEIVE" ? "+" : transactionType === "REFER" ? "+" : "-"}&nbsp;
                            {currency_received ?? currency.symbol}&nbsp;
                            {transactionamount}
                        </span>
                    </span>
                    <span style={{ fontSize: "16px" }}>{narration}</span>
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
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                size="md"
                centered
                show={isModalOpen}
                onHide={toggleModal}

            >

                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
                        <h5>Transaction Details</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TransactionDetailView transaction_id={transaction_id}/>
                </Modal.Body>

            </Modal>
        </>
        
    );
};

export default TransactionCard;
