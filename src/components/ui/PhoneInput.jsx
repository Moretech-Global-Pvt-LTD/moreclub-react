import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useDebounce } from "../../Hooks/useDebounce";
import { baseURL } from "../../config/config";

const PhoneNumberInput = ({
  label,
  formDatas,
  phoneNumber,
  prefixs,
  setPhoneError,
  phoneError,
  handlePhoneNumberChange,
  setFormData,
  onPhoneNumberChange,
}) => {
  const [countryList, setCountryList] = useState([]);
  const [prefix, setPrefix] = useState(prefixs);
  const [phoneNumb, setPhoneNumb] = useState(phoneNumber);

  const [debouncedPhone, debouncedPrefix] = useDebounce(
    [phoneNumb, prefix],
    1000
  );

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get(`${baseURL}country/list/`);
        setCountryList(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCountry();
  }, []);

  useEffect(() => {
    if (formDatas.phone_prefix) {
      setPrefix(formDatas.phone_prefix);
    }
    if (formDatas.phone_number) {
      setPhoneNumb(formDatas.phone_number);
    }
  }, [formDatas]);

  const validatePhoneNumber = async (prefix, phone) => {
    if (!phone) return "Phone number is required.";
    if (!prefix) return "Choose the country.";
    if (!/^\d+$/.test(phone)) return "Phone number must contain only digits.";
    return ""; // No error
  };

  useEffect(() => {
    const validateAndCheckPhone = async () => {
      if (debouncedPhone && debouncedPrefix) {
        const error = await validatePhoneNumber(
          debouncedPrefix,
          debouncedPhone
        );
        setPhoneError(error);
        if (error === "") {
          onPhoneNumberChange({
            fullNumber: `${debouncedPrefix}${debouncedPhone}`,
            prefix: debouncedPrefix,
            phone: debouncedPhone,
            country: countryList.find(
              (country) => country.prefix_number === debouncedPrefix
            )?.name,
            countryCode: countryList.find(
              (country) => country.prefix_number === debouncedPrefix
            )?.code,
          });
        }
      } else {
        setPhoneError("");
      }
    };
    validateAndCheckPhone();
  }, [debouncedPhone, debouncedPrefix]);

  const handleCountryChange = async (event) => {
    const selectedCountry = countryList.find(
      (country) => country.prefix_number === event.target.value
    );
    setPrefix(selectedCountry.prefix_number);
    setFormData((prevData) => ({
      ...prevData,
      phone: phoneNumb,
      country: selectedCountry.name,
      phone_prefix: selectedCountry.prefix_number,
      country_code: selectedCountry.code,
    }));

    const error = await validatePhoneNumber(
      selectedCountry.prefix_number,
      phoneNumb
    );
    setPhoneError(error);
    if (error === "") {
      onPhoneNumberChange({
        fullNumber: `${selectedCountry.prefix_number}${phoneNumb || ""}`,
        prefix: selectedCountry.prefix_number,
        phone: phoneNumb || "",
        country: selectedCountry.name,
        countryCode: selectedCountry.code,
      });
    }
  };

  return (
    <Form.Group className="register-form-container px-1">
      <Form.Label>{label}</Form.Label>
      <div className="d-flex gap-1" style={{ width: "100%" }}>
        <Form.Control
          as="select"
          id="phonePrefixSelect"
          value={formDatas.phone_prefix}
          onChange={handleCountryChange}
          style={{ width: "4rem", backgroundColor: "transparent" }}
          className="text-dynamic-white focus-select"
          required
        >
          {countryList &&
            countryList.map((cou) => (
              <option key={cou.code} value={cou.prefix_number}>
                <span>{cou.code}</span>
              </option>
            ))}
        </Form.Control>
        <div className="position-relative w-100">
          <Form.Control
            type="text"
            id="phoneLoginUsername"
            placeholder="Enter phone number"
            className="position-relative"
            required
            style={{ paddingLeft: "3.5rem" }}
            onChange={(e) => {
              handlePhoneNumberChange(e);
              setPhoneNumb(e.target.value);
              onPhoneNumberChange({
                fullNumber: `${prefix}${e.target.value}`,
                prefix: prefix,
                phone: e.target.value,
                country: countryList.find(
                  (country) => country.prefix_number === prefix
                )?.name,
                countryCode: countryList.find(
                  (country) => country.prefix_number === prefix
                )?.code,
              });
            }}
            value={phoneNumber}
          />
          <Form.Control
            type="text"
            readOnly
            name="prefix"
            value={formDatas.phone_prefix}
            className="text-dynamic-white position-absolute top-0 bottom-0 left-0 prefix-control"
            style={{
              width: "3rem",
              paddingBottom: "6px",
              paddingTop: "6px",
              borderColor: "transparent",
              borderRight: "0px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              paddingRight: "0px",
              marginRight: "0px",
              backgroundColor: "transparent",
            }}
          />
        </div>
      </div>
      {phoneError && <p className="text-danger">{phoneError}</p>}
    </Form.Group>
  );
};

export default PhoneNumberInput;
