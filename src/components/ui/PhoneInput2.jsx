import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { baseURL } from '../../config/config';

const PhoneNumberInput = ({ onChange, initialValue = '' }) => {
    const [phoneNumber, setPhoneNumber] = useState(initialValue);
    const [countryList, setCountryList] = useState([]);
    const [country, setCountry] = useState({});
    const [prefix, setPrefix] = useState('');
    const [error, setError] = useState('');

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
        
        if (countryList.length > 0 && phoneNumber === '') {
            const country = countryList[0];
            setCountry(country);
            setPhoneNumber(`${country.prefix_number}`);
        }else if (countryList.length > 0 && phoneNumber !== '') {
            const countryPrefix = getCountryPrefix(phoneNumber, countryList);
            if (countryPrefix === phoneNumber) {
                setPrefix(countryPrefix);
                const country = countryList.find((country) => country.prefix_number === countryPrefix);
                setCountry(country);
            }
        }
 
    }, [countryList]);


    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\+?[1-9]/; // Allow between 8 and 15 digits total  checks for country code and varying lengths of phone numbers
        if (!phoneNumber) return "Phone number is required";
        if (!phoneRegex.test(phoneNumber)) return "Invalid phone number";
        return null;
    };

    const handlePhoneNumberChange = (e) => {
        const phoneNumber = e.target.value;
       
        if (validatePhoneNumber(e.target.value)) {
            setError(validatePhoneNumber(e.target.value));
        } else {
            setError("");
        }
        setPhoneNumber(phoneNumber);
        const countryPrefix = getCountryPrefix(phoneNumber, countryList);
        if (countryPrefix) {
            setPrefix(countryPrefix);
            const country = countryList.find((country) => country.prefix_number === countryPrefix);
            setCountry(country);
            onChange({
                fullNumber: phoneNumber,
                prefix: countryPrefix,
                phone: phoneNumber.replace(`+${countryPrefix}`, ''),
                country: country.name,
                countryCode: country.code,
            });
        } else {
            if (phoneNumber.length > 4) { 
                setError("Invalid country code");
                onChange({
                    fullNumber: phoneNumber,
                    prefix: null,
                    phone: phoneNumber,
                    country: undefined,
                    countryCode: undefined,
                });
            }
            setPrefix('');
            setCountry({});
            onChange({
                fullNumber: phoneNumber,
                prefix: null,
                phone: phoneNumber,
                country: undefined,
                countryCode: undefined,
            });
        }
    };

    const handleCountryChange = (country) => {
        setCountry(country);
        setPrefix(country.prefix_number);
        setPhoneNumber(`${country.prefix_number}`);
    };

    const getCountryPrefix = (phoneNumber, countryList) => {
        for (const country of countryList) {
            if (phoneNumber.startsWith(`${country.prefix_number}`)) {
                return country.prefix_number;
            }
        }
        return null;
    };



    return (
        <>
        <div className='d-flex gap-1 w-100'>
            <Form.Control
                as="select"
                id="phonePrefixSelect"
                value={country.prefix_number}
                onChange={(e) => handleCountryChange(countryList.find((country) => country.prefix_number === e.target.value))}
                style={{ width: '4rem', backgroundColor: 'transparent' }}
                className="text-dynamic-white focus-select"
                required
            >
                {countryList &&
                    countryList.map((country) => (
                        <option key={country.code} value={country.prefix_number}>
                            <span>{country.code}</span>
                        </option>
                    ))}
            </Form.Control>
            <Form.Control
                type="text"
                id="phoneLoginUsername"
                placeholder="Enter phone number with country code"
                className="position-relative"
                required
                style={{  }}
                onChange={handlePhoneNumberChange}
                value={phoneNumber}
            />
            
        </div>

            { error && <p className="text-danger">{error}</p> }
    </>
    );
};

export default PhoneNumberInput;