import React, { useState } from 'react';
import PayPalButton from './PaypalButtons';
import Swish from '../../images/Payments/swish.png'
import Paypal from '../../images/Payments/Paypal.png'
import Card from '../../images/Payments/cards.png'
import { useNavigate } from 'react-router-dom';


const PaymentCollection = ({ amount }) => {
    const [selectedMethod, setSelectedMethod] = useState('paypal'); 
    const url = window.location.href;
    const queryParams = new URLSearchParams(window.location.search);
    const type = queryParams.get("type");


    const navigate = useNavigate();

    const handleTabClick = (value) => {
        setSelectedMethod(value);
    };

    const handleSuccess = (details) => {
        console.log(`Payment successful with ${selectedMethod}:`, details);
        if(type=== "load"){
            navigate(`/payment/success?type=${type}`)
        }
        if(type==="buycoupon"){
            navigate(`/payment/success?type=${type}`)
        }
    };

    return (
        <div className="payment-tabs card py-2 px-1">
            <div className="payment-tab-list">
            <PayPalButton amount={amount} onSuccess={handleSuccess} className={`payment-tab`} style={{height:"4rem" }}/>
                {/* <div className={`payment-tab ${selectedMethod === 'paypal' ? 'active' : ''}`} onClick={() => handleTabClick('paypal')}>
                    <img src={Paypal} alt="PayPal" />
                    <span>PayPal</span>
                </div> */}
                <div className={`payment-tab ${selectedMethod === 'card' ? 'active' : ''}`} onClick={() => handleTabClick('card')}>
                    <img src={Card} alt="Card" />
                    <span>Card</span>
                </div>
                <div className={`payment-tab ${selectedMethod === 'swish' ? 'active' : ''}`} onClick={() => handleTabClick('swish')}>
                    <img src={Swish} alt="Swish" />
                    <span>Swish</span>
                </div>
            </div>

            <div className="payment-method">
                {selectedMethod === 'card' && <p>card</p>}
                {selectedMethod === 'swish' && <p>swish</p>}
            </div>
        </div>

    );
};

export default PaymentCollection;
