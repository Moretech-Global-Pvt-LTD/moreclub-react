import React, {useState, useEffect} from 'react';
import {useStripe} from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { register_membership } from '../../redux/api/membershipTypeAPI';

const PaymentStatus = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({paymentIntent}) => {
        if(paymentIntent.status==='succeeded'){
            dispatch(register_membership())
        }
      });
  }, [stripe]);


  return (
    <div>{message}</div>
    
    );
};

export default PaymentStatus;