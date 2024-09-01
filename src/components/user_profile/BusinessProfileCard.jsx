import React from "react";
import { useSelector } from "react-redux";
import DefaultQr from "../../images/Qr/defaultQR.jpg";

const BusinessProfileCard = ({ BusinessDetails }) => {
  const permission = useSelector((state) => state.permissionReducer);
  const metainfo = useSelector((state) => state.metaReducer);

  return (
    <>
      <div className="profile-card-container col-12 col-md-12 col-lg-12 col-xl-12">
        <div className="col-12 col-lg-12  ">
          <div className="card shadow-sm Profile-card">
            <div>
              <div className="card-header text-center text-dynamic-white relative ">
                <h5 className="mb-0">Business Memebership Card</h5>
              </div>
              <span className="text-start text-dynamic-white fs-6 mt-2 ms-4">
                {/* {"Refer code: "} */}
              </span>
            </div>
            <div className="card-body row">
              <div className="col-4 justify-content-center ">
                {!BusinessDetails?.business_logo ? (
                  <div
                    className="partner-logo-wrapper ms-0 me-0 d-flex justify-content-center align-items-center text-uppercase"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      backgroundColor: "#fff",
                    }}
                  >
                    {BusinessDetails?.business_name[0]}
                  </div>
                ) : (
                  <img
                    src={`${BusinessDetails?.business_logo}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      backgroundColor: "#fff",
                    }}
                    alt="Profile"
                    className="img-fluid rounded-circle mb-3 profile-image border "
                  />
                )}
                {/* <img
                  src={
                    !BusinessDetails?.business_logo
                      ? <div className='partner-logo-wrapper'>{BusinessDetails?.business_name[0]}</div>
                      : `${BusinessDetails?.business_logo}`
                  }
                  style={{width: "80px", height:"80px", objectFit:"contain" , backgroundColor:"#fff" }}
                  alt="Profile"
                  className="img-fluid rounded-circle mb-3 profile-image"
                /> */}
                <p className="card-text fw-medium text-dynamic-white fs-6 mb-0">
                  {BusinessDetails.business_name}
                </p>
              </div>
              <div className="col-8 text-dynamic-white text-end">
                <p className="card-text">
                  {BusinessDetails.business_phone}&nbsp;
                  <span className="fw-semibold">PHONE</span>
                </p>
                <p className="card-text">
                  {BusinessDetails.business_email}&nbsp;
                  <span className="fw-semibold">EMAIL</span>
                </p>
                <p className="card-text">
                  {BusinessDetails.business_address}&nbsp;
                  <span className="fw-semibold">ADDRESS</span>
                </p>
                <p className="card-text">
                  {BusinessDetails.business_registration_number}&nbsp;
                  <span className="fw-semibold">REG No.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-12  ">
          <div className="nft-card card shadow-sm Profile-card">
            <div className="card-body row">
              <div className="col-4 justify-content-center ">
                <p className="text-warning text-center" style={{ fontSize: "11px" }}>Your Business Referal Qr</p>

                {permission.permission.business_qr_code ? (
                  <img src={BusinessDetails.qr_code} alt="qr" />
                ) : (
                  <img src={DefaultQr} alt="qr" />
                )}
              </div>
              <div className="col-8 text-dynamic-white text-end">
                <img
                  src={`${metainfo.meta?.black_logo}`}
                  alt=""
                  className="nav-light-logo ms-auto"
                  style={{ width: "70px" }}
                />
                <img
                  src={`${metainfo.meta?.white_logo}`}
                  alt=""
                  className="nav-dark-logo ms-auto"
                  style={{ width: "70px" }}
                />
                <h4 className="card-subtitle mt-2">{metainfo.meta?.name}</h4>
                <p className="mb-0">{metainfo.meta?.email}</p>
                <p>{metainfo.meta?.phone}</p>
              </div>
              <span className="text-center text-dynamic-white fs-6 mt-2 ms-4">
                {BusinessDetails.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessProfileCard;
