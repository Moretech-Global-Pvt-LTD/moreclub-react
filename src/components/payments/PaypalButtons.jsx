import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess }) => {
    return (
        <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: amount // Dynamic price
                        }
                    }]
                });
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then(details => {
                    onSuccess(details);
                });
            }}
            style={{
                layout: 'vertical',
                shape: 'rect',
                color: 'blue',
                height: 40,
                
            }}
        />
    );
};

export default PayPalButton;
