import React, { useEffect, useMemo, useState } from "react";
import {
  Form,
  Button,
  Accordion,
  AccordionBody,
  AccordionButton,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setCard,
  setMethodCredentials,
  setPaypal,
  setSwiss,
  setWithdrawalStep,
} from "../../../redux/slices/WithDrawalSlice";

import AddPaypalaccounts from "../Accounts/paypalaccounts";
import AddSwishaccounts from "../Accounts/Swish";
import AddCardaccounts from "../Accounts/Card";
import { fetchMethodCredentials } from "../../../redux/api/userAccountAPI";

const MethodCredentialForm = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const withdrawaldata = useSelector((state) => state.withdrawalReducer);

  const [selectedId, setSelectedId] = useState("");
  const [selectedCard, setSelectedCard] = useState();

  useEffect(() => {
    if (withdrawaldata?.method) {
      dispatch(fetchMethodCredentials());
    }
  }, [withdrawaldata.method, dispatch]);

  // const handleCredentialsChange = (e) => {
  //   dispatch(
  //     setMethodCredentials({
  //       ...withdrawaldata?.methodCredentials,
  //       value: e.target.value,
  //     })
  //   );
  // };

  const handleRadioChange = async (accvalue) => {
    if (withdrawaldata.method === "paypal") {
      setSelectedId(accvalue);
      await dispatch(setPaypal(accvalue));
    } else if (withdrawaldata.method === "swish") {
      setSelectedId(accvalue);
      await dispatch(setSwiss(accvalue));
    } else if (withdrawaldata.method === "card") {
      setSelectedCard(accvalue);
      await dispatch(setCard(accvalue));
    } else {
      console.log("error setting");
    }
  };

  const isButtonDisabled = useMemo(() => {
    if (withdrawaldata.method === "card") {
      return selectedCard === null || selectedCard === undefined;
    } else {
      return selectedId === "";
    }
  }, [withdrawaldata.method, selectedCard, selectedId]);

  const handleBacknavigation = async (e) => {
    e.preventDefault();
    if (withdrawaldata.method === "paypal") {
      setSelectedId("");
      await dispatch(setPaypal(""));
    } else if (withdrawaldata.method === "swish") {
      setSelectedId("");
      await dispatch(setSwiss(""));
    } else if (withdrawaldata.method === "card") {
      setSelectedCard(null);
      await dispatch(setCard(null));
    } else {
      console.log("error setting");
    }
    handleStep(1);
  };
  const handleStep = (value) => {
    dispatch(setWithdrawalStep(value));
  };

  return (
    <div className="  row row-cols-1">
      <Form className="mx-auto mx-md-0 col">
        <div className="radio-body mb-3">
          <h6 className="my-3">
            {" "}
            Your existing {withdrawaldata.method} Accounts
          </h6>
          
          <div style={{ maxWidth: "1200px" }}>
          <Row xs={2} sm={2} md={2} lg={3} xl={4} xxl={4}>
          {withdrawaldata.paypalAccount &&
            withdrawaldata.method === "paypal" &&
            withdrawaldata.paypalAccount?.map((acc, index) => (
              <Col>
              
              <div 
                class={`cols custom-radio-card card text-dynamic-white p-4 m-2 ${
                  acc.email === selectedId ? "bg-warning text-black" : ""
                } ${
                  withdrawaldata.paypal === acc.email
                    ? "bg-warning text-black"
                    : ""
                }`}
                style={{ maxWidth: "16rem" }}
                key={index}
                onClick={() => handleRadioChange(acc.email)}
              >
                {/* <div>
                  <img
                  src={Paypal}
                  alt="paypal"
                  className="position-absolute"
                  style={{width:"1.5rem", height:"1.5rem", top:"0px", left:"0px"}}
                  
                  />
                </div> */}

                <div class="custom-radio">
                  <input
                    type="radio"
                    name="pricing"
                    checked={acc.email === selectedId}
                    onChange={() => handleRadioChange(acc.email)}
                    id={acc.id}
                    class="custom-radio-input "
                  />
                  <label className="radio-label" for={`${acc.id}`}>
                    <h5
                      className={`radio-h5 ${
                        acc.email === selectedId
                          ? " text-black"
                          : "text-dynamic-white"
                      } ${
                        withdrawaldata.paypal === acc.email
                          ? " text-black"
                          : "text-dynamic-white"
                      }`}
                    >
                      {acc.email}
                    </h5>
                    {/* <h2 className="radio-h2">
        
                    </h2> */}
                  </label>
                </div>
              </div>
              </Col>
            ))}
           

          {withdrawaldata.swishAccount &&
            withdrawaldata.method === "swish" &&
            withdrawaldata.swishAccount?.map((acc, index) => (
              <Col>
              <div
                class={`custom-radio-card card text-dynamic-white p-4 m-2 ${
                  acc.phone_number === selectedId ? "bg-warning text-black" : ""
                } ${
                  withdrawaldata.paypal === acc.email
                    ? "bg-warning text-black"
                    : ""
                }`}
                style={{ maxWidth: "16rem" }}
                key={index}
                onClick={() => handleRadioChange(acc.phone_number)}
              >
                <div class="custom-radio">
                  <input
                    type="radio"
                    name="pricing"
                    checked={acc.phone_number === selectedId}
                    onChange={() => handleRadioChange(acc.phone_number)}
                    id={acc.id}
                    class="custom-radio-input "
                  />
                  <label className="radio-label" for={`${acc.id}`}>
                    <h5
                      className={`radio-h5 ${
                        acc.phone_number === selectedId
                          ? " text-black"
                          : "text-dynamic-white"
                      } ${
                        withdrawaldata.swiss === acc.phone_number
                          ? " text-black"
                          : "text-dynamic-white"
                      }`}
                    >
                      {acc.phone_number}
                    </h5>
                    {/* <h2 className="radio-h2">
        
                    </h2> */}
                  </label>
                </div>
                </div>
              </Col>
            ))}

          {withdrawaldata.CardAccount &&
            withdrawaldata.method === "card" &&
            withdrawaldata.CardAccount?.map((acc, index) => (
              <Col>
              <div
                class={`custom-radio-card card text-dynamic-white p-4 m-2 ${
                  acc === selectedCard ? "bg-warning text-black" : ""
                } ${
                  withdrawaldata.paypal === acc.email
                    ? "bg-warning text-black"
                    : ""
                }`}
                style={{ maxWidth: "16rem" }}
                key={index}
                onClick={() => handleRadioChange(acc)}
              >
                <div class="custom-radio">
                  <input
                    type="radio"
                    name="pricing"
                    checked={acc === selectedCard}
                    onChange={() => handleRadioChange(acc)}
                    id={acc.id}
                    class="custom-radio-input "
                  />
                  <label className="radio-label" for={`${acc.id}`}>
                    <h5
                      className={`radio-h5 mb-0 ${
                        acc === selectedCard
                          ? " text-black"
                          : "text-dynamic-white"
                      } ${
                        withdrawaldata.card === acc
                          ? " text-black"
                          : "text-dynamic-white"
                      }`}
                    >
                      {acc.account_holder}
                    </h5>
                    <p
                      className={`radio-h5 mb-0 ${
                        acc === selectedCard
                          ? " text-black"
                          : "text-dynamic-white"
                      } ${
                        withdrawaldata.card === acc
                          ? " text-black"
                          : "text-dynamic-white"
                      }`}
                    >
                      {acc.card_no}
                    </p>
                    <p
                      className={`radio-h5 mb-0 ${
                        acc === selectedCard
                          ? " text-black"
                          : "text-dynamic-white"
                      } ${
                        withdrawaldata === acc
                          ? " text-black"
                          : "text-dynamic-white"
                      }`}
                    >
                      {acc.expiry_month}/{acc.expiry_year}
                    </p>
                  </label>
                </div>
                </div>
              </Col>
            ))}
            </Row>
          </div>
          <div className="ms-2" style={{ maxWidth: "18rem" }}></div>
        </div>
      </Form>
      <div
        style={{ maxWidth: "300px", marginBottom: "1rem", marginTop: "1rem" }}
      >
        {withdrawaldata.method === "paypal" && (
          <Accordion id="paypal">
            <AccordionButton>Add Paypal Account</AccordionButton>
            <AccordionBody className="px-0 mx-0">
              <AddPaypalaccounts />
            </AccordionBody>
          </Accordion>
        )}
        {withdrawaldata.method === "swish" && (
          <Accordion id="swish">
            <AccordionButton>Add Swish</AccordionButton>
            <AccordionBody className="px-0 mx-0">
              <AddSwishaccounts />
            </AccordionBody>
          </Accordion>
        )}
        {withdrawaldata.method === "card" && (
          <Accordion id="card">
            <AccordionButton>Add Card</AccordionButton>
            <AccordionBody className="px-0 mx-0">
              <AddCardaccounts />
            </AccordionBody>
          </Accordion>
        )}
      </div>
      <div>
        <Button
          variant="secondary"
          className="me-2"
          onClick={(e) => {
            handleBacknavigation(e);
          }}
          type="button"
        >
          Back
        </Button>
        <Button
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            handleStep(3);
          }}
          type="button"
          disabled={isButtonDisabled}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MethodCredentialForm;
