import React, {useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useDebounce } from '../../Hooks/useDebounce';


// const validatePIN = async (pin) => {
//   try {
//     const response = await axios.post('/api/validate-pin', { pin });
//     return response.data.valid ? '' : 'Invalid PIN';
//   } catch (error) {
//     return 'Error validating PIN';
//   }
// };

const PINInput = ({ pin, setPin, pinError, setPinError }) => {
  const debouncedPIN = useDebounce(pin, 2000);

  const handlePINChange = (e) => {
    const { value } = e.target;
    if (value.length <= 4) {
      setPin(value);
    }
  };

  useEffect(() => {
    const validate = async () => {
      if (debouncedPIN.length === 4) {
        // const error = await validatePIN(debouncedPIN);
        // setPinError(error);
      }
    };

    validate();
  }, [debouncedPIN, setPinError]);

  return (
    <Form.Group controlId="pin" style={{maxWidth:"300px"}}>
      <Form.Label>Enter PIN</Form.Label>
      <Form.Control
        type="password"
        value={pin}
        onChange={handlePINChange}
        
        required
      />
      {pinError && <p className="text-danger">{pinError}</p>}
    </Form.Group>
  );
};

export default PINInput;
