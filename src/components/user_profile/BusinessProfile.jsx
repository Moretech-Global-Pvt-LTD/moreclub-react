import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import BusinessProfileCard from "./BusinessProfileCard";
import { useSelector } from "react-redux";
import { hostURL} from "../../config/config";
import QRDownload from "../QR/QRDownload";
import DefaultQr from "../../images/Qr/defaultQR.jpg";
import BusinessInfo from "./BusinessInfo";

const BusinessProfile = ({ businessProfiles }) => {
  // const businessProfiles = useSelector((state) => state.businessReducer);

  const user = useSelector((state) => state.userReducer);
  const permission = useSelector((state) => state.permissionReducer);
  const linkInputRef = useRef(null);

  const copyLink = () => {
    const linkInput = linkInputRef.current;
    if (linkInput) {
      linkInput.select();
      document.execCommand("copy");
      message.success("Link copied to clipboard:");
    }
  };

  return (
    <>
      {businessProfiles ? (
        <div className="row  mt-1">
          <div className="col-12 col-lg-7 col-xl-6 col-xxl-4 mb-4 ">
            <BusinessProfileCard BusinessDetails={businessProfiles} />
            <BusinessInfo/>
          </div>
          <div className="col-12 col-lg-5 col-xl-6 col-xxl-5">
            {/* subscription  */}
            {/* <div className="nft-card card shadow-sm mb-4 p-4">
              <h4 className="linked-heading">
                Subscription{" "}
                <Link className="btn btn-link" to={`/pricing`}>
                  Change Plan
                </Link>
              </h4>
              <div class="name-info d-flex align-items-center mb-3">
                <div className="author-img position-relative">
                  <img
                    className="shadow"
                    src={`${user.membershipType.membership_type?.icon}`}
                    alt=""
                  />
                  <i class="bi bi-check position-absolute bg-success true"></i>
                </div>
                <div class="name-author">
                  <span
                    class="name d-block hover-primary text-truncate text-dynamic-white fw-bold"
                    // href={`/buy/coupon/${coupon.id}`}
                  >
                    {user.membershipType.membership_type?.name}
                  </span>
                  <Link class="author d-block fz-12 hover-primary text-truncate">
                    {user.membershipType.membership_type?.code === "free" ? (
                      <>
                        Expires at: <i className="bi bi-calendar-date" /> No
                        expiry date
                      </>
                    ) : (
                      <>
                        Expires at: <i className="bi bi-calendar-date" />{" "}
                        {user.membershipType?.expiration_date?.slice(0, 10)}
                      </>
                    )}
                  </Link>
                </div>
              </div>
            </div> */}

            {/* coupons  */}
            <div className="nft-card card shadow-sm mb-4 p-4">
              <h4 className="linked-heading">Quick Links </h4>
              {/* <span className="btn btn-link">View All</span> */}
              <ul className="row">
                <Link to="/business-transactions">
                  <p className="fs-6 mt-2 mb-2 border-bottom pb-2 cursor">
                    {" "}
                    Business Transactions
                  </p>
                </Link>
                {/* <Link to="/billing">
                  <p className="fs-6 mt-2 mb-2 border-bottom pb-2"> Billings</p>
                </Link> */}
                <Link to="/transactions">
                  <p className="fs-6 mt-2 mb-2 border-bottom pb-2">
                    Transactions
                  </p>
                </Link>
                {/* <Link to="business-network">
                  <p className="fs-6 mt-2 mb-2 border-bottom pb-2">
                    Business Network
                  </p>
                </Link> */}
                <Link to="/business/update">
                  <p className="fs-6 mt-2 mb-2 border-bottom pb-2">
                    Update Business Profile
                  </p>
                </Link>
                <p className="fs-6 mt-2 mb-2 border-bottom pb-2">
                  Referal{" "}
                  <div className="d-flex align-items-center ">
                    <input
                      type="text"
                      defaultValue={
                        businessProfiles.id
                          ? `${hostURL}/register-membership?bpms=${businessProfiles.id}`
                          : ""
                      }
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        border: "0px",
                        padding: "4px",
                        width: "80%",
                      }}
                      ref={linkInputRef}
                      readOnly
                    />
                    <span
                      className=" p-1 ms-2 ps-2 pe-2  copy-button"
                      onClick={copyLink}
                    >
                      <i class="bi bi-clipboard"></i>
                    </span>
                  </div>{" "}
                  <div className="mt-2 mb-2 d-flex ">
                    {permission.permission.business_qr_code ? (
                      <QRDownload
                        imageUrl={`${businessProfiles.qr_code}`}
                        name={`mdc_${businessProfiles.business_name}}`}
                      />
                    ) : (
                      <QRDownload
                        imageUrl={`${DefaultQr}`}
                        name={`mdc_${businessProfiles.business_name}}`}
                      />
                    )}
                  </div>
                </p>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>Loading</div>
        </>
      )}
    </>
  );
};

export default BusinessProfile;
