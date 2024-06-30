import React, { useState, useEffect } from "react";
import PaymentCollection from "../../components/payments/PaymentCollection";
import DashboardLayout from "../../components/Layout/DashboardLayout";

const PaymentPage = () => {
  const [amount, setAmount] = useState("");
  const url = window.location.href;
  const queryParams = new URLSearchParams(window.location.search);
  const type = queryParams.get("type");

  useEffect(() => {
    if (type === "load") {
      const pathParts = url.split("/");
      const extractedId = pathParts[pathParts.length - 1].split("?")[0];
      const rate = extractedId.slice(5, -5);
      const amounts = parseFloat(rate);
      setAmount(amounts);
      setAmount(100);
    }
  }, [type, url]);

  return (
    <DashboardLayout>
      {amount ? <PaymentCollection amount={amount} /> : <p>Loading...</p>}
    </DashboardLayout>
  );
};
export default PaymentPage;
