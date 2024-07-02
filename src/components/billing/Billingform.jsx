import React, { useEffect, useState, createContext } from "react";
import { Form, Button } from "react-bootstrap";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import Bill from "./Bill";
import { QRCode } from "antd";
import { message, Modal, Space } from "antd";
import { useDebounce } from "../../Hooks/useDebounce";
import MembershipCodeReader from "../QR/membershipcodeScanner";
import { getWallet } from "../../redux/api/wallets";

const BillingForm = (hasPermission) => {
  const [isProceed, setIsProceed] = useState(false);
  const [currency, setCurrency] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalError, setTotalError] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const [businessType, setBusinessType] = useState("");
  const [businessTypeError, setBusinessTypeError] = useState("");
  const [membership, setMembership] = useState("");
  const [membershipError, setMembershipError] = useState("");

  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [validated, setValidated] = useState(false);

  const [couponSelection, setCouponSelection] = useState(false);
  const [membershipSelection, setmembershipSelection] = useState(false);
  const [membershipShow, setMembershipShow] = useState(false);

  const [Business_types, setBusiness_types] = useState([]);

  const [qrData, setqrdata] = useState();
  const user = useSelector((state) => state.userReducer);

  const [modal, contextHolder] = Modal.useModal();

  const [currencyList, setCurrencyList] = useState(null);

  const dispatch = useDispatch();

  const debouncedCoupon = useDebounce(couponCode, 500);

  const debouncedMembership = useDebounce(membership, 500);
  const debouncedBusinessType = useDebounce(businessType, 500);

  useEffect(() => {
    if (debouncedCoupon) {
      handleApplyCoupon(debouncedCoupon);
    } else {
      setCouponError("");
    }
  }, [debouncedCoupon, couponCode, totalAmount]);

  useEffect(() => {
    if (debouncedBusinessType) {
      handleBusinessTypeValidation(debouncedBusinessType);
    } else {
      setBusinessTypeError("");
    }
  }, [debouncedBusinessType]);

  useEffect(() => {
    if (debouncedMembership) {
      handleApplyMembership(debouncedMembership);
    } else {
      setMembershipError("");
    }
  }, [debouncedMembership]);

  useEffect(() => {
    const getBusinessTypes = async () => {
      try {
        const res = await axiosInstance.get(
          `${baseURL}business/business/types/`
        );
        setBusiness_types(res.data.data);
        if (res.data.data.length > 0) {
          setBusinessType(res.data.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching business types", error);
      }
    };
    const fetchCountry = async () => {
      try {
        const res = await axiosInstance.get(`${baseURL}user/currency`);
        setCurrencyList(res.data.data.currency);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCountry();
    getBusinessTypes();
  }, []);

  useEffect(() => {
    const fetchUserCurrency = async () => {
      try {
        if (currencyList && currencyList.length > 0) {
          const matchedCurrency = currencyList.find(
            (bt) => bt.default === true
          );

          if (matchedCurrency) {
            setCurrency(matchedCurrency.code);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserCurrency();
  }, [currencyList]);

  useEffect(() => {
    const gtotal = totalAmount - discountedAmount;
    setGrandTotal(gtotal);
  }, [discountedAmount, totalAmount]);

  //handling the total field on blur
  const handleTotalChange = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value.trim() === "") {
      setTotalError("Please Enter the Total Amount");
    } else {
      setTotalAmount(value);
      setTotalError("");
    }
  };

  //handling the coupon apply
  const handleApplyCoupon = async (coupon) => {
    if (coupon.trim() === "") {
      setCouponError("Please Enter the Coupon Code");
    } else {
      setCouponError("");
      if (totalAmount !== 0) {
        if (coupon.length >= 8) {
          const data = {
            amount: totalAmount,
            code: coupon,
          };
          try {
            const res = await axiosInstance.post(
              `${baseURL}coupons/apply/`,
              data
            );
            const couponDiscount = res.data.data.remaining_balance;
            if (couponDiscount > totalAmount) {
              setDiscountedAmount(parseFloat(totalAmount));
              message.success("Coupon Applied");
            } else {
              setDiscountedAmount(parseFloat(couponDiscount));
              message.success("Coupon Applied");
            }
          } catch (err) {
            setCouponError(err.response.data.data?.non_field_errors[0]);
            message.error(err.response.data.data?.non_field_errors[0]);
          }
        }
      } else {
        setTotalError("Please Enter the Total Amount");
      }
    }
  };

  //handling the coupon field on change

  const handleBusinessTypeValidation = async (businessTypes) => {
    // console.log(businessTypes);
    if (businessTypes.trim() === "") {
      setBusinessTypeError("Please select business type");
    } else {
      setBusinessTypeError("");
      if (membership.trim() !== "") {
        setMembership(membership);
      }
    }
  };

  const handleApplyMembership = async (membership) => {
    if (membership.trim() === "") {
      setMembershipError("Please enter the Membership Code");
    } else {
      setMembershipError("");
      if (businessType.trim() !== "") {
        if (membership.length >= 12) {
          const data = {
            business_type: businessType,
            code: membership,
          };
          try {
            const res = await axiosInstance.post(
              `${baseURL}members/apply/`,
              data
            );
            console.log("discounts", res.data.data.business_discounts);
            const discount = parseFloat(
              (parseFloat(totalAmount) * res.data.data.business_discounts) / 100
            );
            setDiscountedAmount(discount);
            message.success("Membership Applied");
          } catch (err) {
            // console.log(err.response.data.data.code[0])
            setMembershipError(err.response.data.data.code[0]);
            setDiscountedAmount(0);
            message.error(err.response.data.data.code[0]);
          }
        }
      } else {
        console.log("businesstype not set ");
        setBusinessTypeError("Please select the Business Type");
      }
    }
  };

  // radio buton controller
  const handleRadioClick = (value) => {
    if (totalAmount !== 0) {
      if (value === "Coupon") {
        setCouponSelection(!couponSelection);
        setmembershipSelection(false);
        setDiscountedAmount(0);
        setCouponError("");
        setCouponCode("");
        setGrandTotal(totalAmount);
      } else if (value === "Membership") {
        setmembershipSelection(!membershipSelection);
        setCouponSelection(false);
        setDiscountedAmount(0);
        setMembership("");
        setGrandTotal(totalAmount);
      }
    } else {
      setTotalError("Please provide the Total Amount");
    }
  };

  // form proceeding
  const appplyProceed = async (formData) => {
    try {
      const res = await axiosInstance.post(
        `${baseURL}billings/create/`,
        formData
      );
      setIsProceed(true);
      message.success("Bill created Sucessfully");
      setqrdata({
        billing: {
          total_amount: res.data.data.total_amount,
          grand_total: grandTotal,
          user_name: user.user.username,
        },
      });
    } catch (err) {
      message.error("something went wrong");
    }
  };

  // handling submitting
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (totalAmount !== 0) {
      if (couponSelection) {
        if (couponCode !== "") {
          const formData = new FormData();
          formData.append("currency_code", currency);
          formData.append("coupon_code", couponCode);
          formData.append("total_amount", totalAmount);
          appplyProceed(formData);
        } else {
          setCouponError("Coupon code required");
        }
      } else if (membershipSelection) {
        if (membership !== "") {
          const formData = new FormData();
          formData.append("currency_code", currency);
          formData.append("total_amount", totalAmount);
          formData.append("membership_code", membership);
          formData.append("business_type", businessType);
          appplyProceed(formData);
        } else {
          setMembershipError("Memebership code required");
        }
      } else {
        const formData = new FormData();
        formData.append("currency_code", currency);
        formData.append("total_amount", totalAmount);
        appplyProceed(formData);
      }
    } else {
      setTotalError("Please provide the Total Amount");
    }
  };

  // resetng the form
  const handleReset = async (event) => {
    event.preventDefault();
    setTotalAmount(0);
    setMembership("");
    setCouponCode("");
    setDiscountedAmount(0);
    setGrandTotal(0);
    setqrdata();
    setCouponSelection(false);
    setmembershipSelection(false);
    setIsProceed(false);
    await dispatch(getWallet());
  };

  const toggleMembership = async () => {
    setMembershipShow(!membershipShow);
  };

  // membership scanner
  const ScannerResult = async (result) => {
    const resultObject = JSON.parse(result.data);
    if (resultObject.membership_code) {
      const membershipCode = resultObject.membership_code;
      setMembership(membershipCode);
    } else {
      setMembership("");
    }
  };

  const ReachableContext = createContext(null);
  const UnreachableContext = createContext(null);

  const config = {
    title: "Scan the MemberCode",
    content: (
      <div style={{ width: "300px", height: "300px", position: "relative" }}>
        <MembershipCodeReader onScansSuccess={ScannerResult} />
      </div>
    ),
  };

  return (
    <div className="row">
      <div className="col-12 col-md-6 ">
        <div className="row">
          <div className="margin-setter">
            <div className="col-11 col-lg-11 col-md-11">
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                style={{ maxWidth: "340px" }}
                autoComplete="off"
              >
                <Form.Group
                  controlId="totalAmount"
                  style={{ maxWidth: "340px" }}
                >
                  <Form.Label>Total Amount</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Control
                      as="select"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      style={{ width: "4rem" }}
                      disabled={isProceed}
                      autoComplete="off"
                      required
                    >
                      {currencyList &&
                        currencyList.map((bt) => (
                          <option value={bt.code} key={bt.id}>
                            {bt.code}
                          </option>
                        ))}

                      {businessTypeError && (
                        <p className="text-danger">{businessTypeError}</p>
                      )}
                    </Form.Control>
                    <Form.Control
                      className={`${
                        totalError ? "border-danger " : "border-black"
                      }`}
                      type="number"
                      id="total"
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(e.target.value)}
                      onBlur={handleTotalChange}
                      disabled={isProceed}
                      required
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    Please enter the total amount.
                  </Form.Control.Feedback>
                  {totalError && <p className="text-danger">{totalError}</p>}
                </Form.Group>

                <Form.Group className="my-4" style={{ maxWidth: "340px" }}>
                  <div className="row ps-3 pe-3 gap-2">
                    <div
                      className={`col custom-radio-container text-center ${
                        couponSelection
                          ? "bg-success text-white"
                          : "bg-danger text-white"
                      } `}
                      onClick={() => handleRadioClick("Coupon")}
                      // style={{width:"100%"}}
                    >
                      <i className={`bi bi-cash`} />
                      &nbsp; Coupon
                    </div>
                    <div
                      className={`col custom-radio-container text-center ${
                        membershipSelection
                          ? "bg-success text-white"
                          : "bg-danger text-white"
                      } `}
                      onClick={() => handleRadioClick("Membership")}
                    >
                      <i class="bi bi-people"></i>&nbsp;Membership
                    </div>
                  </div>
                </Form.Group>

                {couponSelection && (
                  <div>
                    <div className="d-flex align-items-center mt-4 mb-4">
                      <Form.Group controlId="couponCode" className="me-2">
                        <Form.Control
                          className={`${
                            couponError ? "border-danger" : "border-black"
                          }`}
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    {couponError && (
                      <p className="text-danger">{couponError}</p>
                    )}
                  </div>
                )}
                <>
                  {membershipSelection && (
                    <div className="row g-4 mt-4 mb-4">
                      <Form.Group controlId="couponCode" className="me-2">
                        <Form.Control
                          as="select"
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          autoComplete="off"
                          disabled={isProceed}
                          required
                        >
                          {Business_types.map((bt) => (
                            <option value={bt.id} key={bt.id}>
                              {bt.name}
                            </option>
                          ))}

                          {businessTypeError && (
                            <p className="text-danger">{businessTypeError}</p>
                          )}
                        </Form.Control>
                      </Form.Group>

                      <div className="row mt-4 me-2">
                        <Form.Group
                          controlId="MembershipCode"
                          className="me-2 col-10 register-form-container password-container form-group "
                        >
                          <label
                            className="label-psswd"
                            onClick={toggleMembership}
                            htmlFor="membershipCode"
                          >
                            {" "}
                            {membershipShow ? "Hide" : "Show"}
                          </label>

                          <Form.Control
                            className={`${
                              membershipError ? "border-danger" : "border-black"
                            }`}
                            type={membershipShow ? "text" : "password"}
                            value={membership}
                            onChange={(e) => setMembership(e.target.value)}
                            autoComplete="off"
                            placeholder="Membership Code"
                            disabled={isProceed}
                          />
                          {membershipError && (
                            <p className="text-danger">{membershipError}</p>
                          )}
                        </Form.Group>
                        <div className="col-1">
                          <ReachableContext.Provider value="Light">
                            <Space>
                              <Button
                                onClick={async () => {
                                  modal.info(config);
                                }}
                              >
                                <i class="bi bi-qr-code-scan"></i>
                              </Button>
                            </Space>
                            {/* `contextHolder` should always be placed under the context you want to access */}
                            {contextHolder}

                            {/* Can not access this context since `contextHolder` is not in it */}
                            <UnreachableContext.Provider value="Bamboo" />
                          </ReachableContext.Provider>
                        </div>
                      </div>
                    </div>
                  )}
                </>

                {couponSelection || membershipSelection ? (
                  <p>
                    Discounted Amount: {currency}&nbsp;{discountedAmount}
                  </p>
                ) : (
                  <></>
                )}

                {/* <p>Membership Discount: ${membershipDiscount}</p> */}
                <p>
                  Grand Total: {currency}&nbsp;{grandTotal}
                </p>
                {!isProceed && (
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Proceed
                  </Button>
                )}
                {isProceed && (
                  <Button variant="warning" onClick={handleReset}>
                    Create New
                  </Button>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="row">
          <div className="col-11">
            <Bill
              totalamount={totalAmount}
              discount={discountedAmount}
              grandTotal={grandTotal}
              currency={currency}
            />
            <div className="d-flex justify-content-center">
              <QRCode
                style={{ backgroundColor: "white", marginTop: "4rem" }}
                errorLevel="L"
                value={JSON.stringify(qrData)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingForm;
