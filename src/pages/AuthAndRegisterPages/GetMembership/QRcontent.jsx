import React from "react";
import { useSelector } from "react-redux";
import { QRCode } from "antd";
import { hostURL } from "../../../config/config";
import Logos from "../../../images/logo/logoblack.png";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const QRcontent = () => {
  const user = useSelector((state) => state.userReducer);
  const [switchvalue, setSwitchValue] = React.useState(true);

  // const { data, isLoading, isError, refetch } = useQuery({
  //   queryKey: ["user profile"],
  //   queryFn: async () => {
  //     const response = await axiosInstance.get(
  //       `${baseURL}auth/user/all/details/`
  //     );
  //     const data = await response.data.data;

  //     return data;
  //   },
  // });

  // if (isLoading) {
  //   return (
  //     <Placeholder as="p" animation="glow" className="rounded">
  //       <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
  //     </Placeholder>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className="row">
  //       <h1 className="text-center mb">Refer your Friends </h1>
  //       <div className="qr-container">
  //         <QRCode
  //           errorLevel="H"
  //           value={`${hostURL}/register-membership`}
  //           icon={Logos}
  //           style={{ background: "white" }}
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="row mt-0 mt-lg-5">
      <div className="d-flex gap-2 ">
       <label className={`fs-6 fw-bold ${switchvalue ? "text-success" : "text-secondary"}`}>Referal Qr </label>
      <Form.Check 
        type="switch"
        id="custom-switch"
          value={switchvalue}
          onChange={() => setSwitchValue(!switchvalue)}
        className="text-primary mb-3 "
        bsPrefix="h-6 bg-success"
        />
        <label className={`fs-6 fw-bold ${!switchvalue ? "text-success" : "text-secondary"}`}>Profile Qr </label>
      </div>
      <>
        {switchvalue && (
          <>
            <h1 className="text-center mb text-primary">Refer your Friends </h1>
            {user && user.isAuthenticated && (
              <div className="qr-container">
                <img
                  src={`${user.user.user_refer_qr}`}
                  alt="qr"
                  style={{ width: "10rem", height: "auto" }}
                />
              </div>
            )}

            {!user && !user.isAuthenticated && (
              <div className="qr-container">
                <QRCode
                  errorLevel="H"
                  value={`${hostURL}/register-membership`}
                  icon={Logos}
                  style={{ background: "white" }}
                />
                <div className="mt-3 d-flex align-items-center">
                  <p>Login to get Your Rerefal QR</p>
                  <Link to={"/login"}>
                    <button className="btn btn-warning btn-sm">Login</button>
                  </Link>
                </div>
              </div>
            )}
            <p className="text-center text-danger"> Use this Qr to build your network and refer your friends</p>
          </>
        )}
        {!switchvalue && (

          <>
            <h1 className="text-center mb text-primary">Membership </h1>
            {user && user.isAuthenticated && (
              <div className="qr-container">
                <img
                  src={`${user.user.qr_code}`}
                  alt="qr"
                  style={{ width: "10rem", height: "auto" }}
                />
              </div>
            )}
            <p className="text-center text-danger">Use this Qr to get Discounts while Paying with Membership</p>
          </>

        )}
      
     
      
      </>
    </div>
  );
};

export default QRcontent;
