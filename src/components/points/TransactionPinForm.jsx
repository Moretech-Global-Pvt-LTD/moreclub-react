
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { axiosInstance } from '../..';
import { baseURL } from '../../config/config';
import { message } from 'antd';
import PINInput from '../ui/GridPinInput';
import { fetchNewNotifications } from '../../redux/api/notificationApi';
import { useDispatch } from 'react-redux';


function TransactionPinForm({onPinSet}) {
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [pinError, setPinError] = useState('');
    const [confirmPinError, setConfirmPinError] = useState('');
    const [loading, setLoading]= useState(false)
    const dispatch = useDispatch();

  
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
    setPinError(validateConfirmPin(value));
    } else {
      setConfirmPin("Pin required");
    }
  };
  

  
    const handleSubmit = async(e) => {
      e.preventDefault();
      const pinValidationError = validatePin(pin);
      const confirmPinValidationError = validateConfirmPin(confirmPin);

    
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
               dispatch(fetchNewNotifications());
              // dispatch(checkTransactionPin())
              // navigate('/wallet')
            }
        }catch(err){
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
          <PINInput length={4} value={pin} onChange={handlePIn} error={pinError} />
      </Form.Group>
      <Form.Group controlId="confirmPin">
          <Form.Label>Confirm PIN</Form.Label>
          <PINInput length={4} value={pin} onChange={handleConfirmPIn} error={confirmPinError} />
      </Form.Group>
      <Button variant="primary" type="submit" className='mt-4'>
       {loading && <spin className="spinner-border spinner-border-sm text-danger"></spin>}Set PIN
      </Button>
    </Form>
    </div>
  );
}

export default TransactionPinForm;
