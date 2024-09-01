import React, { useState, useRef } from 'react';
import { Form } from 'react-bootstrap';

const PINInput = ({ length = 4, onChange, error }) => {
    const [pin, setPin] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (/^\d?$/.test(value)) {  // Only allow a single digit (0-9)
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);
            onChange(newPin.join(''));

            // Move focus to the next input field if the current one is filled
            if (value && index < length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (pin[index] === '' && index > 0) {
                inputRefs.current[index - 1].focus();
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
           
            const prevInput = inputRefs.current[index - 1];
            prevInput.focus();
            prevInput.setSelectionRange(prevInput.value.length, prevInput.value.length);
        } else if (e.key === 'ArrowRight' && index < pin.length - 1) {
            const nextInput = inputRefs.current[index + 1];
            nextInput.focus();
            nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
        }
    };

    return (
        <div className='mb-3'>
            <div className="d-flex gap-1 justify-content-start">
                {pin.map((digit, index) => (
                    <Form.Control
                        key={index}
                        type="password"
                        maxLength={1}
                        value={digit}
                        placeholder='*'
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => inputRefs.current[index] = el}
                        className="text-center mx-1 fs-3 fw-bold"
                        style={{ width: '3.5rem' , height: '3.5rem' }}                    />
                ))}
            </div>
            {error && <p className="text-danger text-start mt-3">{error}</p>}
        </div>
    );
};

export default PINInput;
