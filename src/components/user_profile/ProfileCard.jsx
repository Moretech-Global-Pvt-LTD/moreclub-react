import React from "react";
import { useSelector } from "react-redux";

const ProfileCard = ({ user, membershipType }) => {
  const metainfo = useSelector((state) => state.metaReducer);

  return (
    <>
      <div className="profile-card-container col-12 col-md-12 col-lg-12 col-xl-12">
        <div className="col-12 col-lg-12  ">
          <div className="card shadow-sm Profile-card">
            <div>
              <div className="card-header text-center text-dynamic-white relative ">
                <h5 className="mb-0">Membership card</h5>

                {/* <span className="position-absolute top-0 end-0 text-end fs-6 mt-2 me-4">
                  {"Refer code: "}
                  {user.user.referral_code}
                </span> */}
              </div>
              <span className="text-start text-dynamic-white fs-6 mt-2 ms-4">
                {"Refer code: "}
                {user?.user?.referral_code}
              </span>
            </div>
            <div className="card-body row">
              <div className="col-4 justify-content-center ">
                {!user.user?.user_profile?.display_picture ? (
                  <div
                    className="partner-logo-wrapper ms-0 me-0 d-flex justify-content-center align-items-center text-uppercase"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      backgroundColor: "#fff",
                    }}
                  >
                    {/* {user.user?.last_name[0]} */}
                    NL
                  </div>
                ) : (
                  <img
                    src={`${user.user?.user_profile?.display_picture}`}
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
                    !user.user?.user_profile?.display_picture
                      ? `"https://e7.pngegg.com/pngimages/586/85/png-clipart-suit-formal-wear-costume-free-dress-passport-pull-material-black-and-white-notched-lapel-suit-jacket-miscellaneous-blue.png"`
                      : `${user.user?.user_profile?.display_picture}`
                  }
                  style={{ width: "80px", height: "80px", objectFit: "fill" }}
                  alt="Profile"
                  className="img-fluid rounded-circle mb-3  profile-image"
                /> */}
                <p className="card-text fw-medium text-dynamic-white fs-6 mb-0">
                  {user.user.last_name}, {user.user.first_name}
                </p>
                <p className="card-text text-dynamic-white">
                  @{user.user.username}
                </p>
              </div>
              <div className="col-8 text-dynamic-white text-end">
                <p className="card-text">
                  {membershipType?.member_code?.code}&nbsp;
                  <span className="fw-semibold">Membership Code</span>
                </p>
                <p className="card-text">
                  {user.user.email}&nbsp;
                  <span className="fw-semibold">EMAIL</span>
                </p>
                <p className="card-text">
                  {user.user.user_profile.address}&nbsp;
                  <span className="fw-semibold">ADDRESS</span>
                </p>
                <p className="card-text">
                  {user.user.date_joined.slice(0, 10)}&nbsp;
                  <span className="fw-semibold">ISSUE</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-12 ">
          <div className="nft-card card shadow-sm Profile-card">
            <div className="card-body row">
              <div className="col-4 justify-content-center ">
                {/* <QRCode
                  errorLevel="H"
                  value="https://moretechglobal.com/"
                  icon={BlackBrandLogo}
                  style={{ background: "white" }}
                /> */}
                <img src={`${user.user.qr_code}`} alt="qr" />
              </div>
              <div className="col-8 text-dynamic-white text-end">
                <img
                  src={`{metainfo.meta?.black_logo}`}
                  alt=""
                  className="nav-light-logo ms-auto"
                  style={{ width: "70px" }}
                />
                <img
                  src={`{metainfo.meta?.white_logo}`}
                  alt=""
                  className="nav-dark-logo ms-auto"
                  style={{ width: "70px" }}
                />
                <h4 className="card-subtitle mt-2">{metainfo.meta?.name}</h4>
                <p className="mb-0">{metainfo.meta?.email}</p>
                <p>{metainfo.meta?.phone}</p>
              </div>
              <span
                className="text-warning text-center mt-2"
                style={{ fontSize: "12px" }}
              >
                Please do not share this QR code.
              </span>
              <span className="text-center text-dynamic-white fs-6  ms-4">
                {user.user.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
