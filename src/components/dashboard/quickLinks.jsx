import React from "react";
import { Card, Col, Placeholder, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Send from "../../images/svg/send.png";
import Load from "../../images/svg/load_amount.svg";
import Withdraw from "../../images/svg/withdraw_icon.svg";
import Transaction from "../../images/svg/Transaction.svg";
// import Wallet from "../../images/svg/wallet.svg";
// import NetworkWhite from "../../images/svg/NetworkWhite.svg";
import NetworkYellow from "../../images/svg/NetworkYellow.svg";
import Scan from "../../images/svg/ScanWhite.svg";
import ScanBlack from "../../images/svg/ScanBlack.svg";
import Leads from "../../images/svg/leads.svg";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import Lead from "../../images/svg/lead.svg"
import EmailVerify from "../../images/svg/emailverify.svg"
import SetPin from "../../images/svg/setpin.svg"


const QuickLinks = () => {
  const user = useSelector((state) => state.userReducer);
  const permisions = useSelector((state) => state.permissionReducer);
  const business = useSelector((state) => state.businessReducer);
  const fetchWalletPermission = async () => {
    try {
      const [pinalert, phoneAlert] = await Promise.allSettled([
        axiosInstance.get(`${baseURL}notifications/user/pin/alert/`),
        axiosInstance.get(`${baseURL}notifications/alert/`),
      ]);

      // Handle the responses
      let pinAlertdata;
      if (pinalert.status === "fulfilled") {
        pinAlertdata = pinalert.value.data.data;
      } else {
        throw new Error(
          `Failed to fetch business data: ${pinalert.reason.message}`
        );
      }

      if (phoneAlert.status === "fulfilled") {
        const phoneAlertdata = phoneAlert.value.data.data?.email_verified;
        return {
          pinAlertdata,
          phoneAlertdata,
        };
      } else {
        throw new Error(
          `Failed to fetch user data: ${phoneAlert.reason.message}`
        );
      }
    } catch (error) {
      // Handle the error, for example by throwing it so it can be caught by react-query
      throw new Error(`Failed to fetch dashboard data: ${error.message}`);
    }
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactionpin status"],
    queryFn: fetchWalletPermission,
    staleTime: 1000,
  });

  // if (isLoading) {
  //   return (
  //     <Placeholder as="p" animation="glow" className="rounded row gap-1">
  //       <Placeholder xs={12} size="lg" style={{ height: "1rem" }} />
  //       <Placeholder xs={12} size="lg" style={{ height: "1rem" }} />
  //       <Placeholder xs={12} size="lg" style={{ height: "1rem" }} />
  //     </Placeholder>
  //   );
  // }

  // if (isError) {
  //   return <div>error retriving transaction pin status</div>;
  // }

  // if (!data.pinAlertdata?.status || !data.phoneAlertdata) {
  //   return (
  //     <>
  //         <div className="text-dynamic-white text-center">
  //           You need to set {!data.pinAlertdata?.status && "transaction Pin"}{" "}
  //           {!data.pinAlertdata?.status && !data.phoneAlertdata && "and"}{" "}
  //           {!data.phoneAlertdata && "verify your Email"} to access
  //           wallet permissions
  //         </div>
  //         {!data.pinAlertdata?.status && (
  //           <Link
  //             className="btn btn-warning rounded-pill btn-sm w-100 mt-3"
  //             to="/wallet"
  //           >
  //             Set Transaction Pin
  //           </Link>
  //         )}
  //         {!data.phoneAlertdata && (
  //           <Link
  //             className="btn btn-danger rounded-pill btn-sm w-100 mt-3"
  //             to="/otp-email"
  //           >
  //             Verify Email
  //           </Link>
  //         )}
  //       </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <Link
  //         className="btn btn-success rounded-pill btn-sm w-100 mt-3"
  //         to="/points/send"
  //       >
  //         <img src={Send} alt="send" className="small-icon" /> Send Money
  //       </Link>
  //       <Link
  //         className="btn btn-warning rounded-pill btn-sm w-100 mt-3"
  //         to="/points/buy"
  //       >
  //         <img src={Load} alt="send" className="small-icon" /> Load Money
  //       </Link>
  //       <Link
  //         className="btn btn-danger rounded-pill btn-sm w-100 mt-3"
  //         to="/points/withdraw"
  //       >
  //         <img src={Withdraw} alt="send" className="small-icon"  style={{fill:"#fff"}}  />  Withdraw
  //       </Link>
  //     </>
  //   );
  // }
  // };

  return (
    <>
      <h6>Quick links</h6>

      <div className="quicklink-card-container">
        {isLoading &&
          [0, 1, 2].map((index) => (
            <div className="quicklink-card-link" key={index}>
              <div className="quicklink-card ">
                <div className="quicklink-card-icon-container">
                  <Placeholder as="p" animation="wave">
                    <Placeholder xs={8} className="quicklink-card-small-icon" />
                  </Placeholder>
                </div>
                <Placeholder as="p" animation="wave"></Placeholder>
              </div>
            </div>
          ))}

          {!isLoading &&
          <>
          {!data.pinAlertdata?.status || !data.phoneAlertdata ? (
          <>
            {!data.phoneAlertdata && (
              <Link to={`/otp-email`} className="quicklink-card-link">
                <div className="quicklink-card ">
                  <div className="quicklink-card-icon-container">
                    <img
                      src={EmailVerify}
                      alt="email"
                      className="quicklink-card-small-icon"
                    />
                  </div>
                  <h6 className="quicklink-card-title text-white">
                    Verify Email
                  </h6>
                </div>
              </Link>
            )}
            {!data.pinAlertdata?.status && (
              <Link to={`/wallet`} className="quicklink-card-link">
                <div className="quicklink-card">
                  <div className="quicklink-card-icon-container">
                    <img
                      src={SetPin}
                      alt="setpin"
                      className="quicklink-card-small-icon"
                    />
                  </div>
                  <h6 className="quicklink-card-title text-white">Set Pin</h6>
                </div>
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to={`/points/send`} className="quicklink-card-link">
              <div className="quicklink-card bg-success">
                <div className="quicklink-card-icon-container">
                  <img
                    src={Send}
                    alt="send"
                    className="quicklink-card-small-icon"
                  />
                </div>
                <h6 className="quicklink-card-title text-white">Send Money</h6>
              </div>
            </Link>

            <Link to={`/points/buy`} className="quicklink-card-link">
              <div className="quicklink-card bg-warning">
                <div className="quicklink-card-icon-container">
                  <img
                    src={Load}
                    alt="load"
                    className="quicklink-card-small-icon"
                  />
                </div>
                <h6 className="quicklink-card-title text-success">
                  Load Money
                </h6>
              </div>
            </Link>

            <Link to={`/points/withdraw`} className="quicklink-card-link">
              <div className="quicklink-card bg-danger">
                <div className="quicklink-card-icon-container">
                  <img
                    src={Withdraw}
                    alt="withdraw"
                    className="quicklink-card-small-icon"
                  />
                </div>
                <h6 className="quicklink-card-title text-white">Withdraw</h6>
              </div>
            </Link>
          </>
        )}
          </>
          }
        

        <Link to={`/scan`} className="quicklink-card-link">
          <div className="quicklink-card  ">
            <div className="quicklink-card-icon-container">
              <img
                src={Scan}
                alt="network"
                className="quicklink-card-small-icon no-background dark-image-show"
              />
              <img
                src={ScanBlack}
                alt="network"
                className="quicklink-card-small-icon no-background light-image-show"
              />
            </div>
            <h6 className="quicklink-card-title">Scan</h6>
          </div>
        </Link>

        <Link to={`/my-network`} className="quicklink-card-link ">
          <div className="quicklink-card ">
            <div className="quicklink-card-icon-container">
              <img
                src={NetworkYellow}
                alt="network"
                className="quicklink-card-small-icon no-background"
              />
            </div>
            <h6 className="quicklink-card-title">Network</h6>
          </div>
        </Link>
        {user && user.user?.user_type !== "NORMAL" && (
          <Link to={`/leads`} className="quicklink-card-link ">
            <div className="quicklink-card ">
              <div className="quicklink-card-icon-container">
                <img
                  src={Leads}
                  alt="network"
                  className="quicklink-card-small-icon no-background"
                />
              </div>
              <h6 className="quicklink-card-title">Leads</h6>
            </div>
          </Link>
        )}

        <Link to={`/my-network`} className="quicklink-card-link ">
          <div className="quicklink-card ">
            <div className="quicklink-card-icon-container">
              <img
                src={Transaction}
                alt="network"
                className="quicklink-card-small-icon no-background"
              />
            </div>
            <h6 className="quicklink-card-title">Transactions</h6>
          </div>
        </Link>
      </div>
    </>
  );
};

export default QuickLinks;

// <Row xs={3} sm={3} md={4} lg={5} xl={6} xxl={8} xxxl={10} className="mt-4">
// <Link to={`/points/send`} className="d-flex flex-column my-2 ">
//     <Col className="d-flex flex-column  ">
//       <Card className=" flex-grow-1 p-0 bg-success">
//         <div className="d-flex justify-content-center py-2 px-0">
//           <h1 className="my-0 py-0 mx-0">
//           <img src={Send} alt="send" className="small-icon" />
//             {/* <i class="bi bi-qr-code-scan text-dynamic-white"></i> */}
//           </h1>
//         </div>
//         <Card.Title className="text-dynamic-white text-center fs-6">
//           Send Money
//         </Card.Title>
//       </Card>
//     </Col>
//   </Link>
//   <Link to={`/points/buy`} className="d-flex flex-column my-2 ">
//     <Col className="d-flex flex-column  ">
//       <Card className=" flex-grow-1 p-0 bg-warning">
//         <div className="d-flex justify-content-center py-2 px-0">
//           <h1 className="my-0 py-0 mx-0">
//           <img src={Load} alt="send" className="small-icon" />
//             {/* <i class="bi bi-qr-code-scan text-dynamic-white"></i> */}
//           </h1>
//         </div>
//         <Card.Title className="text-dynamic-white text-center fs-6">
//           Load money
//         </Card.Title>
//       </Card>
//     </Col>
//   </Link>
//   <Link to={`/points/withdraw`} className="d-flex flex-column my-2 ">
//     <Col className="d-flex flex-column  ">
//       <Card className=" flex-grow-1 p-0 bg-danger">
//         <div className="d-flex justify-content-center py-2 px-0">
//           <h1 className="my-0 py-0 mx-0">
//           <img src={Withdraw} alt="send" className="small-icon" />
//             {/* <i class="bi bi-qr-code-scan text-dynamic-white"></i> */}
//           </h1>
//         </div>
//         <Card.Title className="text-dynamic-white text-center fs-6">
//           Withdraw
//         </Card.Title>
//       </Card>
//     </Col>
//   </Link>
//   <Link to={`/scan`} className="d-flex flex-column my-2 ">
//     <Col className="d-flex flex-column  ">
//       <Card className=" flex-grow-1 p-0">
//         <div className="d-flex justify-content-center py-2 px-0">
//           <h1 className="my-0 py-0 mx-0"><i class="bi bi-qr-code-scan text-dynamic-white"></i></h1>
//         </div>
//         <Card.Title className="text-dynamic-white text-center fs-6">
//           Scan
//         </Card.Title>
//       </Card>
//     </Col>
//   </Link>
{
  /* <Link to={`/coupon`} className="d-flex flex-column my-2 ">
    <Col className="d-flex flex-column  ">
      <Card className=" flex-grow-1 p-0">
        <div className="d-flex justify-content-center py-2 px-0">
          <h1 className="my-0 py-0 mx-0"><i class="bi bi-cash text-dynamic-white"></i></h1>
        </div>
        <Card.Title className="text-dynamic-white text-center fs-6">
          Buy Coupons
        </Card.Title>
      </Card>
    </Col>
  </Link> */
}
{
  /* <Link to={`/pricing`} className="d-flex flex-column my-2 ">
    <Col className="d-flex flex-column  ">
      <Card className=" flex-grow-1 p-0">
        <div className="d-flex justify-content-center py-2 px-0">
          <h1 className="my-0 py-0 mx-0"><i class="bi bi-ticket-detailed-fill text-dynamic-white"></i></h1>
        </div>
        <Card.Title className="text-dynamic-white text-center fs-6">
          Upgrade
        </Card.Title>
      </Card>
    </Col>
  </Link> */
}
{
  /* <Link to={`/my-network`} className="d-flex flex-column my-2 ">
    <Col className="d-flex flex-column  ">
      <Card className=" flex-grow-1 p-0">
        <div className="d-flex justify-content-center py-2 px-0">
          <h1 className="my-0 py-0 mx-0"><i class="bi bi-diagram-3-fill text-dynamic-white"></i></h1>
        </div>
        <Card.Title className="text-dynamic-white text-center fs-6">
          Network
        </Card.Title>
      </Card>
    </Col>
  </Link>
  {user && user.user?.user_type !== "NORMAL" && (
    <>
      {business && business.businessProfile.is_verified &&
        <>
          {permisions.permission &&
            permisions.permission.billing &&
          <>
          {/* <Link to={`/billing`} className="d-flex flex-column my-2 ">
            <Col className="d-flex flex-column  ">
              <Card className=" flex-grow-1 p-0">
                <div className="d-flex justify-content-center py-2 px-0">
                  <h1 className="my-0 py-0 mx-0"><i class="bi bi-receipt text-dynamic-white"></i></h1>
                </div>
                <Card.Title className="text-dynamic-white text-center fs-6">
                  Billing
                </Card.Title>
              </Card>
            </Col>
          </Link> */
}
//           <Link to={`/business-transactions`} className="d-flex flex-column my-2 ">
//             <Col className="d-flex flex-column  ">
//               <Card className=" flex-grow-1 p-0">
//                 <div className="d-flex justify-content-center py-2 px-0">
//                   <h4 className="my-0 py-0 mx-0"><i class="bi bi-journal text-dynamic-white"></i></h4>
//                 </div>
//                 <Card.Title className="text-dynamic-white text-center fs-6">
//                   Business Transaction
//                 </Card.Title>
//               </Card>
//             </Col>
//           </Link>
//             </>
//           }
//         </>

//       }
//     </>

//   )}

// </Row> */}
