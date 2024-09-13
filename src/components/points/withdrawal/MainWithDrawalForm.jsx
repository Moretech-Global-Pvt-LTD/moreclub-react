import React from "react";

import WithdrawalAmountForm from "./BasicForm";
import MethodCredentialForm from "./PaymentCredential";
import ConfirmationForm from "./Confirmation";
import Receipt from "./Receipt";
import { useSelector } from "react-redux";

const MainWithDrawalForm = () => {

  const withdrawaldata = useSelector((state) => state.withdrawalReducer);
  return (
    <div  >
      
      {withdrawaldata.withdrawalStep === 1 && <WithdrawalAmountForm  />}
      {withdrawaldata.withdrawalStep === 2 && <MethodCredentialForm />}
      {withdrawaldata.withdrawalStep === 3 && <ConfirmationForm  />}
      {withdrawaldata.withdrawalStep === 4 && <Receipt  />}
     
    </div>
  );
};

export default MainWithDrawalForm;
