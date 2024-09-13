import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import PINInput from "../ui/GridPinInput";

function ForgetPinForm() {
  const [pin, setPin] = useState("");
  const [oldpinError, setoldpinError] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [confirmPinError, setConfirmPinError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateoldPin = (value) => {
    if (value.length !== 4) {
      return "PIN must be 4 digits";
    }
    return "";
  };

  const validatePin = (value) => {
    if (value.length !== 4) {
      return "PIN must be 4 digits";
    }
    return "";
  };

  const validateConfirmPin = (value) => {
    if (value !== pin) {
      return "PINs do not match";
    }
    return "";
  };

  const handlePIn = async (newPin) => {
    const value = newPin;
    setPin(value);
    if (value.trim() !== "") {
      setPinError(validatePin(value));
    } else {
      setPinError("Pin required");
    }
  };
  const handleConfirmPIn = async (newPin) => {
    const value = newPin;
    setConfirmPin(value);
    if (value.trim() !== "") {
      setConfirmPinError(validateConfirmPin(value));
    } else {
      setConfirmPinError("Pin required");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const pinValidationError = validatePin(pin);
    const confirmPinValidationError = validateConfirmPin(confirmPin);

    if (pinValidationError || confirmPinValidationError) {
      setPinError(pinValidationError);
      setConfirmPinError(confirmPinValidationError);
    } else {
      // Submit logic here
      const code = localStorage.getItem("pin_otp");
      const data = {
        code: code,
        new_pin: pin,
        confirm_new_pin: confirmPin,
      }
      try {
        const res = await axiosInstance.post(
          `${baseURL}auth/confirm/forget/user/pin/`,
          data
        );

        if (res.data.success) {
          localStorage.removeItem("pin_otp");
          message.success("pin changed successfully");
          navigate("/dashboard");
        }
      } catch (err) {
        message.error(err.response?.data?.message);
        // if (
        //   err.response?.data?.errors?.non_field_errors[0] ===
        //   "Invalid current PIN."
        // ) {
        //   setoldpinError(err.response?.data?.errors?.non_field_errors[0]);
        // } else {
        //   setoldpinError(err?.response?.data?.errors?.non_field_errors[0]);
        // }
      }
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="col-12 col-md-6">
      {oldpinError && (
        <p className="text-denger" style={{ fontSize: "14px" }}>
          {oldpinError}
        </p>
      )}
      {/* <Form.Group controlId="pin">
        <Form.Label>Set New PIN</Form.Label>
        <Form.Control
          type="number"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onBlur={handleBlurPin}
          min={0}
          maxLength={4}
          max={9999}
          required
        />
        {pinError && <p className="text-danger">{pinError}</p>}
      </Form.Group>
      <Form.Group controlId="confirmPin">
        <Form.Label>Confirm New PIN</Form.Label>
        <Form.Control
          type="number"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          onBlur={handleBlurConfirmPin}
          maxLength={4}
          min={0}
          max={9999}
          required
        />
        {confirmPinError && <p className="text-danger">{confirmPinError}</p>}
      </Form.Group> */}
      <Form.Group controlId="pin">
        <Form.Label>Set PIN</Form.Label>
        <PINInput length={4} value={pin} onChange={handlePIn} error={pinError} />

      </Form.Group>
      <Form.Group controlId="confirmPin">
        <Form.Label>Confirm PIN</Form.Label>
        <PINInput length={4} value={pin} onChange={handleConfirmPIn} error={confirmPinError} />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        {loading && (
          <span className="spinner-border spinner-border-sm text-danger"></span>
        )}
        Reset PIN
      </Button>
    </Form>
  );
}

export default ForgetPinForm;
