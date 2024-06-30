
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { axiosInstance } from '../..';
import { baseURL } from '../../config/config';
import { message } from 'antd';


function TransactionPinForm({onPinSet}) {
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [pinError, setPinError] = useState('');
    const [confirmPinError, setConfirmPinError] = useState('');
    const [loading, setLoading]= useState(false)

  
    const validatePin = (value) => {
      if (value.length !== 4) {
        return 'PIN must be 4 digits';
      }
      return '';
    };
  
    const validateConfirmPin = (value) => {
      if (value !== pin) {
        return 'PINs do not match';
      }
      return '';
    };
  
    const handleBlurPin = () => {
      setPinError(validatePin(pin));
    };
  
    const handleBlurConfirmPin = () => {
      setConfirmPinError(validateConfirmPin(confirmPin));
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      const pinValidationError = validatePin(pin);
      const confirmPinValidationError = validateConfirmPin(confirmPin);
      console.log(pin, confirmPin)

    
      if (pinValidationError || confirmPinValidationError) {
        setPinError(pinValidationError);
        setConfirmPinError(confirmPinValidationError);

      } else {
        // Submit logic here
        const data = {
            "pin": pin,
            "confirm_pin": confirmPin
        }
        try{
          setLoading(true)
            const res = await axiosInstance.post(`${baseURL}auth/user/pin/`, data);
            
            if(res.status===200){
              message.success("Pin set Sucessfully")
              setLoading(false);
              if (typeof onPinSet === "function") {
                onPinSet(pin);
              }
              // dispatch(checkTransactionPin())
              // navigate('/wallet')
            }
        }catch(err){
            console.log(err)
            message.error("error setting Pin");
            setLoading(false);
            
        }
      }
    };
  

  return (
    <div className='row'>

    <Form onSubmit={handleSubmit} className='col-12 col-md-4'>
      <Form.Group controlId="pin">
        <Form.Label>Set PIN</Form.Label>
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
        <Form.Label>Confirm PIN</Form.Label>
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
      <Button variant="primary" type="submit" className='mt-4'>
       {loading && <spin className="spinner-border spinner-border-sm text-danger"></spin>}Set PIN
      </Button>
    </Form>
    </div>
  );
}

export default TransactionPinForm;
