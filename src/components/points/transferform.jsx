import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getWallet } from "../../redux/api/wallets";
import CurrencyInput from "../ui/CurrencyInput";
import PINInput from "../ui/GridPinInput";
import moment from "moment";
import { fetchNewNotifications } from "../../redux/api/notificationApi";

function TransferForm() {
  const [step, setStep] = useState(1);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferError, setTransferError] = useState("");
  const [recipient, setRecipient] = useState("");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(" ");
  const [ConfirmationData, setConfirmationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transferdata, setTransferdata] = useState(null);
  const [remark, setRemark] = useState("")
  const [remarkField, setRemarkField] = useState(false);
  const [remarks, setRemarks] = useState("");
  const metainfo = useSelector((state) => state.metaReducer);


  const [convertedRate, setCovertedRate] = useState();

  const [currency, setCurrency] = useState("");

  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyDetail
  );

  const dispatch = useDispatch();

  const currentUrl = window.location.href;

  const url = new URL(currentUrl);
  const user_name = url.searchParams.get("user_name");
  const amount = url.searchParams.get("amount");

  useEffect(() => {
    setRecipient(user_name);
    setTransferAmount(amount);
  }, []);

  const handleMethodchange = async (event) => {
    const value = event.target.value;
    if (value === "Others") {
      setRemark(value);
      setRemarkField(true)
    } else {
      setRemark(value);
      setRemarks("");
      setRemarkField(false);
    }
  };

  const handleOtherRemarks = async (event) => {
    const value = event.target.value;
    setRemarks(value);

  }




  const handleTransferSubmit = async (event) => {
    event.preventDefault();

    const bpms = sessionStorage.getItem("bpms");

    const data = {
      currency_code: currency,
      amount: transferAmount,
      username: recipient,
      bpms,
      pin,
      remarks: remark === "Others" ? remarks : remark
    };
    try {
      setIsLoading(true);
      const bpms = sessionStorage.getItem("bpms");
      if (bpms) { }
      const res = await axiosInstance.post(`${baseURL}wallets/wallet/`, data);
      setTransferdata(res.data.data);
      setIsLoading(false);
      setStep(3);
      dispatch(getWallet());
      sessionStorage.removeItem("bpms");
      
      message.success("Funds Transferred Successfully");
    } catch (err) {
      setIsLoading(false);
      const errors = err.response?.data?.errors?.non_field_errors;
      message.error(errors[0]);
      dispatch(getWallet());
      // console.log(errors[0]);
    }
  };


  const handleConfirmation = async () => {

    if (transferAmount <= 0) {
      setTransferError("Amount should be greater than 0");
      return;
    }

    const bpms = sessionStorage.getItem("bpms");

    const data = {
      currency_code: currency,
      amount: transferAmount,
      username: recipient,
      bpms
    };

    // Reset form fields
    try {
      setIsLoading(true);
      const res = await axiosInstance.post(
        `${baseURL}wallets/check/user/`,
        data
      );
      setConfirmationData(res.data.data);
      setIsLoading(false);
      setStep(2);
    } catch (err) {
      const errors = err.response.data.errors.non_field_errors;
      // message.error(errors);
      message.error(errors);
      setIsLoading(false);
    }
  };

  const handlePInChange = async (newPin) => {
    const value = newPin;
    setPin(value);
    let timeOut;
    setTimeout(() => {
      if (value.trim() !== "") {
        setPinError("");
      } else {
        setPinError("Pin required");
      }
    }, 2000);

    clearTimeout(timeOut);
  };

  const handlePrint = () => {
    const content = document.getElementById("coin-receipt").innerHTML;
    const printFrame = document.createElement("iframe");

    printFrame.style.position = "absolute";
    printFrame.style.top = "-10000px";
    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentWindow || printFrame.contentDocument;
    const frameDocument = frameDoc.document ? frameDoc.document : frameDoc;

    frameDocument.open();
    frameDocument.write("<html><head><title>Print</title>");

    // Clone the styles from the original document
    Array.from(document.styleSheets).forEach((styleSheet) => {
      try {
        if (styleSheet.cssRules) {
          // for <style> and <link> elements
          const newStyleEl = document.createElement("style");

          Array.from(styleSheet.cssRules).forEach((cssRule) => {
            newStyleEl.appendChild(document.createTextNode(cssRule.cssText));
          });

          frameDocument.head.appendChild(newStyleEl);
        }
      } catch (e) {
        console.error(e);
      }
    });

    frameDocument.write("</head><body>");
    frameDocument.write(content);
    frameDocument.write("</body></html>");
    frameDocument.close();

    frameDoc.focus();
    frameDoc.print();

    document.body.removeChild(printFrame);
  };

  const ResetForm = async () => {
    dispatch(fetchNewNotifications())
  };

  const HandleBack = async () => {
    setStep(1);
  };

  return (
    <>
      <Form onSubmit={handleTransferSubmit}>
        {step === 1 && (
          <>
            <Form.Group controlId="transferAmount" className="col-12 col-md-10 pe-md-4 mb-2 ms-1 me-1 mx-auto mx-md-0">
              <Form.Label>Amount to Transfer</Form.Label>
              <CurrencyInput
                amount={transferAmount}
                setAmount={setTransferAmount}
                convertedRate={convertedRate}
                setConvertedRate={setCovertedRate}
                currency={currency}
                setCurrency={setCurrency}
                error={transferError}
                setError={setTransferError}
              />
            </Form.Group>
            <Form.Group controlId="recipient" className=" col-12 col-md-8 mb-2 ms-1 me-1 mx-auto mx-md-0">
              <Form.Label>Recipient</Form.Label>
              <Form.Control
                type="text"
                value={recipient}
                placeholder="Username/ Email /Phone Number"
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary mt-4" onClick={handleConfirmation}>
              {isLoading && (
                <span className="spinner-border spinner-border-sm text-danger"></span>
              )}
              &nbsp;Send
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="nft-card card p-2 col-12 col-md-8 mb-2 ms-1 me-1 mx-auto mx-md-0">
              <div className="bg-dynamic-black mb-1">
                <p
                  className=" mb-0 mt-0 text-center text-success"
                  style={{ fontSize: "12px" }}
                >
                  You are paying
                </p>
                <h1 className="text-center mb-0 mt-0">
                  <span style={{ fontSize: "12px" }}>{currency}&nbsp;</span>
                  {ConfirmationData?.amount}
                </h1>
                <p
                  className=" mb-0 mt-0 text-center text-success"
                  style={{ fontSize: "12px" }}
                >
                  Send Money {"="}&nbsp;{currencyData.symbol}&nbsp;
                  {convertedRate}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                {" "}
                <p className="mb-0 fw-bold">Username:</p>
                <p className="mb-0">{ConfirmationData?.username}</p>
              </div>
              <div className="d-flex justify-content-between">
                {" "}
                <p className="mb-0 fw-bold">Receiver:</p>
                <p className="mb-0">
                  {ConfirmationData?.first_name}&nbsp;
                  {ConfirmationData?.last_name}
                </p>{" "}

              </div>
              {ConfirmationData?.discount_amount > 0 &&
                <div className="d-flex justify-content-between">
                  {" "}
                  <p className="mb-0 fw-bold">Discount:</p>
                  <p className="mb-0 text-dynamic-white">
                    {ConfirmationData?.discount_amount}

                  </p>{" "}

                </div>
              }
            </div>
            <div className="nft-card card p-2 col-12 col-md-8 ms-1 me-1 mx-auto mx-md-0">
              <div className="d-flex justify-content-between">
                {" "}
                <p className="mb-0 fw-bold">Total Paying Money:</p>
                {ConfirmationData?.discount_amount > 0 &&
                  <p className="mb-0 text-dynamic-white">
                    {currency}&nbsp;{ConfirmationData?.paid_amount}
                  </p>
                }
                {ConfirmationData?.discount_amount === 0 &&
                  <p className="mb-0 text-dynamic-white">
                    {currency}&nbsp;{ConfirmationData?.amount}
                  </p>
                }
              </div>
            </div>
            <Form.Group controlId="pin" className="p-2 col-12 col-md-8 mb-2 ms-1 me-1 mx-auto mx-md-0">
              <Form.Label>Remark (optional)</Form.Label>
              <Form.Control
                as="select"
                value={remark}
                onChange={handleMethodchange}
                required
              >
                <option value="" disabled>Select Remark</option>
                <option value={"Bill Sharing"} >
                  Bill Sharing
                </option><option value={"Family Expenses"} >
                  Family Expenses
                </option><option value={"Lend/Borrow"} >
                  Lend/Borrow
                </option><option value={"Personal Use"} >
                  Personal Use
                </option>
                <option value={"Others"} >
                  Others
                </option>
              </Form.Control>
              {remarkField &&
                <Form.Control
                  type="text"
                  value={remarks}
                  name="remarks"
                  placeholder="Remark"
                  onChange={handleOtherRemarks}
                required
                className="my-2"
                />
              }


            </Form.Group>
            <Form.Group controlId="pin" className="mt-3">
              <Form.Label>Enter PIN</Form.Label>
              <PINInput length={4} value={pin} onChange={handlePInChange} error={pinError} />

            </Form.Group>
            <div className="d-flex justify-content-start gap-2 my-5">

              <Button
                variant="Secondary"
                onClick={HandleBack}
                disabled={isLoading}
              >
                Back
              </Button>
              <Button variant="primary" type="submit">
                {isLoading && (
                  <span className="spinner-border spinner-border-sm text-danger"></span>
                )}
                &nbsp;Confirm Send
              </Button>
            </div>
          </>
        )}
      </Form>
      {step === 3 && (
        <>
          <div
            id="coin-receipt"
            className="nft-card card bg-white p-2 col-12 col-md-8 mx-auto"
          >
            <div className="admin-logo me-2 me-sm-3">
              <Link className="d-flex align-items-center" to="/dashboard">
                <img
                  className="nav-light-logo dashboard-header-logo "
                  src={`${metainfo.meta?.black_logo}`}
                  alt="Light"
                  style={{ width: "70px", margin: "auto" }}
                />
                <img
                  className="nav-dark-logo dashboard-header-logo "
                  src={`${metainfo.meta?.white_logo}`}
                  alt="Dark"
                  style={{ width: "70px", margin: "auto" }}
                />
              </Link>
            </div>
            <h5 className="text-center">Transactions Receipt</h5>
            <div className=" border p-2">
              <div className="d-flex justify-content-between">
                {" "}
                <p className="mb-0">Transaction Date:</p>
                <p className="mb-0">{moment.utc(transferdata.transaction_date).local().format("MMM DD YYYY")}</p>{" "}
              </div>
              <div className="d-flex justify-content-between">
                {" "}
                <p className="mb-0">Sender:</p>
                <p className="mb-0">
                  {transferdata.sender_name}
                </p>{" "}
              </div>
              <div className="d-flex justify-content-between">
                {" "}
                <p className="mb-0">Receiver:</p>
                <p className="mb-0">
                  {transferdata.recipient_name}
                </p>{" "}
              </div>
              <div className="d-flex justify-content-between">
                {" "}
                <p className="mb-0">Amount:</p>
                <p className="mb-0">
                  {transferdata.currency_code}&nbsp;{transferdata?.total_amount}
                </p>{" "}
              </div>
              <div className="d-flex justify-content-between">
                {" "}
                <p className="mb-0">Discount:</p>
                <p className="mb-0">
                  {transferdata.currency_code}&nbsp;{transferdata?.discount_amount}
                </p>{" "}
              </div>
              <div className="d-flex justify-content-between">
                {" "}
                <p className="mb-0">Sent Money:</p>
                <p className="mb-0">
                  {transferdata.currency_code}&nbsp;{transferdata?.paid_amount}
                </p>{" "}
              </div>
              <div className="d-flex flex-column gap-2">
                {" "}
                <p className="mb-0">Remark</p>
                <p className="mb-0">
                  {transferdata?.remarks}
                </p>{" "}
              </div>
            </div>
          </div>
          <div className="mx-auto col-12 col-md-8 ">
            <button
              className="btn btn-primary btn-sm mx-auto col-12  mt-2 "
              onClick={() => handlePrint()}
            >
              Download Receipt
            </button>
            <Link to="/wallet">
              <button
                className="btn btn-primary btn-sm mx-auto col-12  mt-2 "
                onClick={ResetForm}
              >
                Done
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default TransferForm;
