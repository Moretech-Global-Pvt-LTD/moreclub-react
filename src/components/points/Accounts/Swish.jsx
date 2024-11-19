import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosInstance } from "../../..";
import { baseURL } from "../../../config/config";
import Swish from "../../../images/Payments/swish.png";
import { validatePhoneNumber } from "../../../validation/addaccountvalidation";
import { useDebounce } from "../../../Hooks/useDebounce";
import { useDispatch } from "react-redux";
import { fetchMethodCredentials } from "../../../redux/api/userAccountAPI";
import { message } from "antd";
import { set } from "lodash";

const AddSwishaccounts = ({ onfinish }) => {
  const [phonenumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [phoneNumberError, setPhoneNumberError] = useState("");

  const debouncedPhoneNumber = useDebounce(phonenumber, 500);
  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedPhoneNumber) {
      setPhoneNumberError(validatePhoneNumber(debouncedPhoneNumber));
    } else {
      setPhoneNumberError("");
    }
  }, [debouncedPhoneNumber, phonenumber]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      payment_method: "swish",
      phone_number: phonenumber,
    };
    try {
      const res = await axiosInstance.post(
        `${baseURL}withdrawal/user/method/`,
        data
      );
      dispatch(fetchMethodCredentials());
      setPhoneNumber("");
      setPhoneNumberError("");
      onfinish();
      message.success("Swish account added Successfully");
    } catch (error) {
      message.error(error.response?.data?.errors?.non_field_errors[0] || "Error adding account")
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label>Swish Id</Form.Label>
      <Form.Control
        type="text"
        value={phonenumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phonenumber with country code"
        required
      />
      {phoneNumberError && (
        <p className="text-danger" style={{ fontSize: "10px" }}>
          {phoneNumberError}{" "}
        </p>
      )}

      <div className="d-flex justify-content-end gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => {
            onfinish();
          }}
          className="mt-3"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="mt-3"
          size="sm"
          disabled={phonenumber === "" || phoneNumberError !== ""}
        >
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}{" "}
          Add account
        </Button>
      </div>
    </Form>
  );
};

export default AddSwishaccounts;
