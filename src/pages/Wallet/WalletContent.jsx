import React, { useEffect, } from "react";


import Wallet from "../../images/wallet/coins.png";
import { useDispatch, useSelector } from "react-redux";
import { getWallet } from "../../redux/api/wallets";

import Walletlinks from "../../components/dashboard/Walletlinks";

import WalletAlertNotification from "../../components/alert_notification/WalletAlerts";
import Websockettest from "../../components/socket/websockettest";

const WalletContent = () => {
  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.walletReducer);
 
  useEffect(() => {
    dispatch(getWallet());
  }, [dispatch]);

  const walletInfo = [
    {
      userName: wallets.wallet?.user?.username,
      balanceCard: wallets.wallet?.balance,
      currency: wallets.wallet?.symbol,
    },
  ];

  return (
    <>
      <WalletAlertNotification />
      <div className="row mt-4">
        <div className=" col-12 col-md-4  card shadow mb-5">
          <div className="card-body text-start p-4 position-relative">
          
            <h6 className="mb-2">username: {walletInfo[0].userName}</h6>
            <h5 className="mb-0 row text-dark d-flex align-items-center justify-content-center">
              <img
                className="me-1 col-4"
                src={Wallet}
                alt=""
                style={{ width: "auto", height: "50px" }}
              />
              <span className="counter col-8 fs-6">
                <span className="fs-6">Balance :</span>&nbsp;
                {walletInfo[0].currency}&nbsp;{walletInfo[0].balanceCard}
              </span>
            </h5>
            <Walletlinks />
          </div>
        </div>
        <div className="col-12 col-md-4">
          {/* <Websockettest/> */}
          {/* <div className="card text-white p-4 "> */}
          {/* <Link to={"/points/send"}>
            <h6 className=" mt-2 mb-2  pb-2 border-bottom ">
              <i class="bi bi-send"></i>&nbsp;&nbsp;Send Points
            </h6>
          </Link> */}
          {/* <Link to={'/points/buy'}><h6 className=' mt-2 mb-2  pb-2 border-bottom '><i class="bi bi-plus-circle"></i>&nbsp;&nbsp;Buy Points</h6></Link> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default WalletContent;
