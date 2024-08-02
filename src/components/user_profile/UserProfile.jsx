import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import ProfileCard from "./ProfileCard";
import { useDispatch } from "react-redux";
import { get_user_coupon_list } from "../../redux/api/couponAPI";
import { useSelector } from "react-redux";

import QRDownload from "../QR/QRDownload";

const UserProfile = ({ users }) => {
  const dispatch = useDispatch();
  const [userCoupons, setUserCoupons] = useState([]);
  const user = useSelector((state) => state.userReducer);
  const currency = useSelector((state) => state.currencyReducer.currencyDetail);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await dispatch(get_user_coupon_list());
        if (res.data.data) {
          setUserCoupons(res.data.data);
        } else {
          setUserCoupons([]);
        }
      } catch (err) {
        console.log("error getting coupons", err);
        setUserCoupons([]);
      }
    };
    fetchCoupons();
  }, [dispatch]);

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
      {users ? (
        <>
          <div className="notification-content-wrap d-block d-md-none">
            <ul className="notification-list ps-0 mb-2 mt-1 row justify-content-end ">
              <li className="col-12 col-lg-6 col-xl-6 ">
                <Link to="/KYC">
                  <i class="me-2 bg- bi bi-ui-checks"></i>
                  <span style={{ fontSize: "12px" }}>Update your KYC.</span>
                  <span class="badge bg-warning text-dark fz-12 rounded-pill ms-auto">
                    Click Here
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="row  mt-1 g-2">
            <div className="col-12 col-md-8 col-xl-6">
              <ProfileCard user={user} membershipType={user.membershipType} />
            </div>

            <div className="col-12 col-md-4 col-xl-6 ">
              <div className="notification-content-wrap d-none d-md-block">
                <ul className="notification-list ps-0 mb-2 mt-1 row justify-content-end ">
                  <li className="col-12">
                    <Link to="/KYC">
                      <i class="me-2 bg- bi bi-ui-checks"></i>
                      <span style={{ fontSize: "12px" }}>Update your KYC.</span>
                      <span class="badge bg-warning text-dark fz-12 rounded-pill ms-auto">
                        Click Here
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="nft-card card shadow-sm mb-4 p-4">
                <h4 className="linked-heading">
                  Get Referals{" "}
                  {/* <a className="btn btn-link" href={`/pricing`}>
                    Change Plan
                  </a> */}
                </h4>
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    // defaultValue= {`${hostURL}/register-membership?referral=${user.user.referral_code}`}
                    defaultValue={user.user.link}
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
                </div>
                <div className="mt-2 mb-2 d-flex ">
                  <QRDownload
                    imageUrl={`${user.user.qr_code}`}
                    name={`mdc_${user.user.first_name}_${user.user.last_name}`}
                  />
                </div>
              </div>
              {/* subscription  */}
              <div className="nft-card card shadow-sm mb-4 p-4">
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
                    <Link className="author d-block fz-12 hover-primary text-truncate">
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
              </div>

              {/* coupons  */}
              <div className="nft-card card shadow-sm mb-4 p-4">
                <h4 className="linked-heading">
                  Your Coupons{" "}
                  <Link className="btn btn-link" to={`/my-coupons`}>
                    View All
                  </Link>
                </h4>
                {/* <span className="btn btn-link">View All</span> */}
                {userCoupons.length > 0 ? (
                  <>
                    {userCoupons?.slice(0, 4).map((coupon) => (
                      <div className="inline">
                        <div class="name-info d-flex align-items-center mb-3">
                          <div class="author-img position-relative">
                            <img
                              class="shadow"
                              src="https://static.vecteezy.com/system/resources/previews/009/342/078/non_2x/discount-coupon-icon-sign-design-free-png.png"
                              alt="designing_world"
                            />
                            <i
                              class={`bi ${
                                coupon.is_expired
                                  ? "bi-x bg-danger"
                                  : "bi-check "
                              }}  ${
                                coupon.is_expired ? " bg-danger" : "bg-success "
                              }} position-absolute  true`}
                            ></i>
                          </div>
                          <div class="name-author">
                            <span
                              class={`name d-block hover-primary text-truncate text-dynamic-white fw-bold ${
                                coupon.is_expired &&
                                "text-decoration-line-through"
                              }`}
                            >
                              {coupon.code}: {currency.symbol}
                              {coupon.balance}
                            </span>
                            <a
                              class="author d-block fz-12 hover-primary text-truncate"
                              href="/author/designing_world"
                            >
                              Expired at: <i className="bi bi-calendar-date" />{" "}
                              {coupon.expiry_date?.slice(0, 10)} at{" "}
                              {coupon.expiry_date?.slice(11, 16)}
                            </a>
                          </div>
                        </div>
                      </div>

                      // <CouponCards key={coupon.id} coupon={coupon} />
                    ))}
                  </>
                ) : (
                  <>
                    <Link to="/coupon">
                      <p>Buy coupons</p>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>Loading</div>
        </>
      )}
    </>
  );
};

export default UserProfile;
