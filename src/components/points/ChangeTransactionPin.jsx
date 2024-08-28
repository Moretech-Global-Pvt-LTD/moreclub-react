import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { message } from "antd";
import { Link } from "react-router-dom";
import PINInput from "../ui/GridPinInput";

function ChangePinForm() {
  const [pin, setPin] = useState("");
  const [oldPin, setOldPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [oldpinError, setoldpinError] = useState("");
  const [confirmPinError, setConfirmPinError] = useState("");

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

  const handleConfirmPin = async (newPin) => {
    const value = newPin;
    
    setConfirmPin(value);
    if (value.trim() !== "") {
      setConfirmPinError(validateConfirmPin(value));
    } else {
      setConfirmPin("Pin required");
    }
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

  const handleCurrentPIn = async (newPin) => {
    const value = newPin;
    setOldPin(value);
    
    setoldpinError(validatePin(value));

    if (value.trim() !== "") {
      setoldpinError(validatePin(value));

    } else {
      setoldpinError("Pin required");
    }

  };


 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const oldPinvalidationError = validateoldPin(oldPin);
    const pinValidationError = validatePin(pin);
    const confirmPinValidationError = validateConfirmPin(confirmPin);

    if (
      pinValidationError ||
      confirmPinValidationError ||
      oldPinvalidationError
    ) {
      setoldpinError(oldPinvalidationError);
      setPinError(pinValidationError);
      setConfirmPinError(confirmPinValidationError);
    } else {
      // Submit logic here
      const data = {
        current_pin: oldPin,
        new_pin: pin,
        confirm_new_pin: confirmPin,
      };
      try {
        const res = await axiosInstance.patch(
          `${baseURL}auth/change/user/pin/`,
          data
        );
        console.log("res", res);
        if (res.status === 200) {
          message.success("pin changed successfully");
        }
      } catch (err) {
        console.log(err);
        if (
          err.response.data.errors.non_field_errors[0] ===
          "Invalid current PIN."
        ) {
          setoldpinError(err.response.data.errors.non_field_errors[0]);
        } else {
          setoldpinError(err.response.data.errors.non_field_errors[0]);
        }
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="col-12 col-md-6">
      <Form.Group controlId="pin">
        <Form.Label>Current PIN</Form.Label>
        <PINInput length={4} value={pin} onChange={handleCurrentPIn} error={oldpinError} />
      </Form.Group>
      <Form.Group controlId="pin">
        <Form.Label>Set New PIN</Form.Label>
        <PINInput length={4} value={pin} onChange={handlePIn} error={pinError} />
      </Form.Group>
      <Form.Group controlId="confirmPin">
        <Form.Label>Confirm New PIN</Form.Label>
        <PINInput length={4} value={confirmPin} onChange={handleConfirmPin} error={confirmPinError} />
      </Form.Group>
      <div className="d-flex gap-2 align-items-center">
        <Button variant="primary" type="submit" className="mt-3">
          Change PIN
        </Button>
        <Link to="/forget/pin" className="mt-3 t">
          <Button variant="ghost" className="text-primary">
            {"forget your Pin ?"}
          </Button>
        </Link>
      </div>
    </Form>
  );
}

export default ChangePinForm;
