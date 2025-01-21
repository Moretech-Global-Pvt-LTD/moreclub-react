import React from "react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { baseURL } from "../../../config/config";
import { axiosInstance } from "../../..";
import { Placeholder } from "react-bootstrap";
import UniversalErrorbox from "../../Layout/UniversalErrorBox";



const TransactionDetailView = ({
  transaction_id
}) => {

  const { data, isLoading, isError } = useQuery({
    queryKey: [`USER transaction detail ${transaction_id}`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${baseURL}wallets/transaction/${parseInt(transaction_id)}/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 10000,
  });

  if (isLoading) {
    return (

      <div className="row gap-2">
        <Placeholder as="p" animation="glow" className="rounded w-50 me-2">
          <Placeholder xs={12} lg={6} style={{ height: "10rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
          <Placeholder xs={12} style={{ height: "10rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded  w-25">
          <Placeholder xs={12} style={{ height: "10rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ height: "10rem" }} />
        </Placeholder>
      </div>

    );
  }

  if (isError) {
    return (
      <UniversalErrorbox message="Something went wrong while fetching the Transaction details" 
    retry={[`USER transaction detail ${transaction_id}`]}
    />
    );
  }






  const handlePrint = (data) => {
    const {
      amount,
      transactionType,
      receiver,
      sender,
      previousBalance,
      transactionDate,
      transactionStatus,
      remarks,
      currencySymbol,
    } = data;

    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.write(`
    <html>
      <head>
        <title>Print Transaction Details</title>
        <style>
          /* General Styles */
          body { font-family: Arial, sans-serif; padding: 20px 40px; color: #333; }
          h3 { font-weight: bold; margin-bottom: 20px; }
          .transaction-detail-content { border-top: 2px solid #000; border-bottom: 2px solid #000; padding-top: 15px; padding-bottom: 15px; }
          .transaction-detail-row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 1em; }
          
          /* Header Styles */
          .transaction-detail-print-header { display: flex; align-items: center; margin-bottom: 20px; }
          .transaction-detail-logo { width: 60px; height: auto; margin-right: 20px; }
          .transaction-detail-company-info {
            text-align: left;
            line-height: 1.4;
          }
          .transaction-detail-company-info h4 {
            font-size: 1.2em;
            margin: 0;
            font-weight: bold;
          }
          .transaction-detail-company-info p {
            margin: 0;
            font-size: 0.9em;
          }
          
          /* Footer Styles */
          .transaction-detail-print-footer {
            text-align: center;
            font-size: 0.85em;
            color: #555;
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
          }
        </style>
      </head>
      <body>
        <div class="transaction-detail-print-header">
          <img src="https://res.cloudinary.com/dcsd8ukzn/image/upload/v1/media/company_logos/Members_Club_2_zfzc9k" alt="Company Logo" class="transaction-detail-logo" />
          <div class="transaction-detail-company-info">
            <h4>More Deals Club</h4>
            <p>info@moredealsclub.com</p>
            <p>Stockholm</p>
            <p>+46 76 327 76 40</p>
          </div>
        </div>
        
        <div class="transaction-detail-content">
          <h3>Transaction Receipt</h3>
          <div class="transaction-detail-row">
            <span>Amount (${currencySymbol}):</span>
            <span>${amount}</span>
          </div>

          <div class="transaction-detail-row">
            <span>Transaction Date:</span>
            <span>${new Date(transactionDate).toLocaleString()}</span>
          </div>
          <div class="transaction-detail-row">
            <span>Receiver:</span>
            <span>${receiver}</span>
          </div>
          <div class="transaction-detail-row">
            <span>Sender:</span>
            <span>${sender}</span>
          </div>
          <div class="transaction-detail-row">
            <span>Transaction Type:</span>
            <span>${transactionType}</span>
          </div>
          <div class="transaction-detail-row">
            <span>Transaction Status:</span>
            <span>${transactionStatus}</span>
          </div>
          <div class="transaction-detail-row">
            <span>Remarks:</span>
            <span>${remarks}</span>
          </div>
        </div>

        <div class="transaction-detail-print-footer">
          <p>Powered By MoreTech Global</p>
          <p>2024 © All rights reserved by MoreTech Global</p>
        </div>
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.print();
    printWindow.close();

  };

  const printData = {

    amount: data.amount,
    transactionType: data.transaction_type,
    receiver: data.transaction_type === "RECEIVE" ? `${data.user.first_name} ${data.user.last_name}` : data.transaction_type === "REFER" ? `${data.user.first_name} ${data.user.last_name}` : `${data.action_user.first_name} ${data.action_user.last_name}`,
    sender: data.transaction_type === "RECEIVE" ? `${data.action_user.first_name} ${data.action_user.last_name}` : data.transaction_type === "REFER" ? `${data.action_user.first_name} ${data.action_user.last_name}` : `${data.user.first_name} ${data.user.last_name}`,
    transactionDate: moment(data.timestamp).format("DD MMM, YY, h:mm A"),
    transactionStatus: data.narration,
    remarks: data.remarks,
    currencySymbol: data.transaction_type === "RECEIVE" ? data.currency_received_symbol : data.transaction_type === "REFER" ? data.currency_received_symbol : data.currency_sent_symbol
  }


  return (
    <div className="transaction-detail-view">
      {/* <div className="transaction-detail-header">
                <h2>Transaction Details</h2>
            </div> */}
      <div className="transaction-detail-content">
        <div className="transaction-detail-row text-dynamic-white ">
          <span>Amount ({data.transaction_type === "RECEIVE" ? data.currency_received_symbol : data.transaction_type === "REFER" ? data.currency_received_symbol : data.currency_sent_symbol}):</span>
          <span>{data.amount}</span>
        </div>
        <div className="transaction-detail-row text-dynamic-white">
          <span>Transaction Type:</span>
          <span>{data.transaction_type}</span>
        </div>
        <div className="transaction-detail-row text-dynamic-white transaction-detail-row-group">
          <div>
            <span>Receiver:</span>
            <span>{data.transaction_type === "RECEIVE" ? `${data.user.first_name} ${data.user.last_name}` : data.transaction_type === "REFER" ? `${data.user.first_name} ${data.user.last_name}` : `${data.action_user.first_name} ${data.action_user.last_name}`}</span>
          </div>
          <div>
            <span>Sender:</span>
            <span>{data.transaction_type === "RECEIVE" ? `${data.action_user.first_name} ${data.action_user.last_name}` : data.transaction_type === "REFER" ? `${data.action_user.first_name} ${data.action_user.last_name}` : `${data.user.first_name} ${data.user.last_name}`}</span>
          </div>
        </div>
        {/* <div className="transaction-detail-row text-dynamic-white">
                    <span>Previous Balance ({currencySymbol}):</span>
                    <span>{previousBalance}</span>
                </div> */}
        <div className="transaction-detail-row text-dynamic-white">
          <span>Transaction Date:</span>
          <span>{moment(data.timestamp).format("DD MMM, YY, h:mm A")}</span>
        </div>
        <div className="transaction-detail-row text-dynamic-white">
          <span>Transaction Status:</span>
          <span>{data.narration}</span>
        </div>
        <div className="transaction-detail-row text-dynamic-white">
          <span>Remarks:</span>
          <span>{data.remarks}</span>
        </div>
      </div>
      <div className="transaction-detail-footer">
        <button className="transaction-detail-print-button" onClick={() => handlePrint(printData)}>Print</button>
      </div>
    </div>
  );
};

export default TransactionDetailView;
