import React from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PaypalClientKey } from '../../config/config';

const initialOptions = {
    "client-id": PaypalClientKey,
    currency: "USD",
  
    intent: "capture",
};

const PayPalProvider = ({ children }) => {
    return (
        <PayPalScriptProvider options={initialOptions}>
            {children}
        </PayPalScriptProvider>
    );
};

export default PayPalProvider;
