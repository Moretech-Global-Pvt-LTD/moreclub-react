import React, { useEffect, useState } from "react";

import { get_UserCoupons_transaction } from "../../redux/api/transactionAPI";
import { useDispatch } from "react-redux";
import CouponsTransactionCard from "./CouponsTransactionCard";

const CouponTransactions = ({ couponId }) => {
  //   const transaction = useSelector((state) => state.transactionReducer);
  //   console.log(transaction.transaction);
  const [couponTrans, setCouponsTrans] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const res = dispatch(get_UserCoupons_transaction(couponId));
    console.log(res.data);
    setCouponsTrans(res.data);
  }, [dispatch]);

  return (
    <div className="content-inside-wrapper ">
      {couponTrans ? (
        <>
          {couponTrans.map((trans) => {
            return (
              <CouponsTransactionCard
                icon={"bi-receipt"}
                name={trans.business_profile.business_name}
                date={trans.created_at}
                balance={trans.total_amount}
                amount={trans.paid_amount}
                key={trans.id}
              />
            );
          })}
        </>
      ) : (
        <h6 className="m-auto pb-4 text-center">No transaction Found</h6>
      )}
    </div>
  );
};

export default CouponTransactions;
