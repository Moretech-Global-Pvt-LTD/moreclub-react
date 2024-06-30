import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { message } from "antd";

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

  const handleBlurOldPin = () => {
    setoldpinError(validateoldPin(oldPin));
  };

  const handleBlurPin = () => {
    setPinError(validatePin(pin));
  };

  const handleBlurConfirmPin = () => {
    setConfirmPinError(validateConfirmPin(confirmPin));
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
        if(res.status === 200){
          message.success("pin changed successfully")
        }
      } catch (err) {
        console.log(err);
        if(err.response.data.errors.non_field_errors[0]==="Invalid current PIN."){
          setoldpinError(err.response.data.errors.non_field_errors[0]);
        }else{
          setoldpinError(err.response.data.errors.non_field_errors[0]);
        }
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="col-12 col-md-6">
      <Form.Group controlId="pin">
        <Form.Label>Current PIN</Form.Label>
        <Form.Control
          type="number"
          value={oldPin}
          onChange={(e) => setOldPin(e.target.value)}
          onBlur={handleBlurOldPin}
          min={0}
          maxLength={4}
          max={9999}
          required
        />
        {oldpinError && <p className="text-danger">{oldpinError}</p>}
      </Form.Group>
      <Form.Group controlId="pin">
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
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Change PIN
      </Button>
    </Form>
  );
}

export default ChangePinForm;
