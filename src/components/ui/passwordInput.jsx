import React, { useState, useEffect, useCallback } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

const PasswordInput = ({
  label,
  id,
  value,
  onChange,
  validatePassword,
  errorMessage,
}) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const togglePassword = () => setPasswordShow(!passwordShow);

  const debouncedValidation = useCallback(
    debounce((val) => {
      if (validatePassword) {
        const error = validatePassword(val);
        setPasswordError(error);
      }
    }, 300),
    [validatePassword]
  );

  useEffect(() => {
    debouncedValidation(value);
    return () => {
      debouncedValidation.cancel();
    };
  }, [value, debouncedValidation]);

  return (
    <Form.Group className="register-form-container">
      <Form.Label>{label}</Form.Label>
      <Form.Group className="password-container form-group w-100">
        <label className="label-psswd" onClick={togglePassword} htmlFor={id}>
          {passwordShow ? "Hide" : "Show"}
        </label>
        <Form.Control
          type={passwordShow ? "text" : "password"}
          id={id}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />
      </Form.Group>
      {passwordError && <p className="text-danger">{passwordError}</p>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </Form.Group>
  );
};

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validatePassword: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default PasswordInput;
