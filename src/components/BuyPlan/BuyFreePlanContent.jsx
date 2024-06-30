import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { OverlayTrigger, Tooltip } from "react-bootstrap";


import { register_membership } from "../../redux/api/membershipTypeAPI";
import { message } from "antd";
import { userMembership } from "../../redux/api/userMembershipAPI";

const BuyFreePlanContent = ({ planId, planTime, price }) => {
  
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.membershipTypeReducer);
  const currency = useSelector((state)=>state.currencyReducer.currencyDetail)
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlefreeplan = async (e) => {
  
    setIsLoading(true);

    try {
        const reg_member = await dispatch(register_membership(planId, "free", planTime));
      if (reg_member.success) {
        message.success("Membership purchased successfully");
        await dispatch(userMembership());
        
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="about-area mb-2">
        <div class="cta-text bg-gradient p-2 bg-primary d-block d-xxl-none d-xl-none d-lg-none">
          <div class="row justify-content-center">
            <div class="col-12 col-md-12 col-lg-12">
              <div
                class="animated fadeInUp"
                style={{ animationDuration: "1s" }}
              >
                <h2 class="mb-3 fw-bold mb-md-0">
                  <center>
                    <img
                      src={`${plan.planDetail.icon}`}
                      alt="icons"
                      style={{ width: "40px" }}
                    />{" "}
                    {plan.planDetail.name}
                  </center>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div class="col-12 col-xxl-8 col-xl-8 col-lg-8 mb-2">
          <div class="animated fadeInUp" style={{ animationDuration: "1s" }}>
            <div class="card border-0 shadow-sm dashboard-activity-tab">
              <div class="card-body">
                <h5>Buy Plan</h5>
                <h5 className="ps-4">
                  It&apos;s a free plan
                  <br /> Please confirm to apply Free Plan{" "}
                </h5>
                :
                <button
                  disabled={isLoading}
                  id="submit"
                  className="btn btn-danger btn-sm mt-2"
                  style={{ float: "right" }}
                  onClick={() => handlefreeplan()}
                >
                  {isLoading ? (
                    <div
                      class="spinner-border spinner-border-sm text-primary"
                      role="status"
                    >
                      {/* <span class="sr-only">Loading...</span> */}
                    </div>
                  ) : (
                    <span id="button-text">
                      {isLoading ? (
                        <div className="spinner" id="spinner"></div>
                      ) : (
                        "Confirm"
                      )}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-xxl-4 col-xl-4 col-lg-4">
          <div class="animated fadeInUp" style={{ animationDuration: "1s" }}>
            <div class="card border-0 shadow-sm dashboard-activity-tab">
              <div class="card-body">
                {plan.planDetail.project_discounts && (
                  <>
                    <div className="col-12">
                      <div className="name-info d-flex align-items-center">
                        <div className="author-img position-relative">
                          <img
                            className="shadow"
                            src={`${plan.planDetail.icon}`}
                            alt=""
                            style={{ height: "30px" }}
                          />
                        </div>

                        <div className="name-author">
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip>{plan.planDetail.name}</Tooltip>}
                          >
                            <Link
                              className="name d-block hover-primary text-truncate"
                              style={{ fontSize: "20px" }}
                              to={`${process.env.PUBLIC_URL}/featured-items/`}
                            >
                              <b>&nbsp;{plan.planDetail.name} Plan</b>
                            </Link>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-12"
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                      <div className="price text-center">
                        <span className="fz-12 d-block"></span>
                        <span
                          className="mb-0 text-danger"
                          style={{ fontSize: "36px", fontWeight: "bold" }}
                        >
                          {currency.symbol}&nbsp;{price}
                        </span>
                        <span className="Label">/{planTime}</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div
                        className="price text-start"
                        style={{ marginBottom: "5px" }}
                      >
                        <span className="fz-12 d-block"></span>
                        <h5 className="mb-0 text-warning">Discount In</h5>
                      </div>
                      {plan.planDetail.project_discounts.map((pd, index) => (
                        <div className="price text-start">
                          <span className="fz-12 d-block"></span>
                          <h6 className="mb-0">
                            <i class="bi bi-patch-check-fill ms-2 text-success"></i>{" "}
                            {pd.project.project_name} {parseInt(pd.discount)}%
                          </h6>
                        </div>
                      ))}
                      <div className="row gx-2 align-items-center mt-3">
                        <div className="col-6">
                          <Link
                            className={`btn btn- rounded-pill btn-sm`}
                            to=""
                          >
                            <i className={`bi `}></i>
                          </Link>
                        </div>
                        <div className="col-6 text-end">
                          <Link
                            className={`btn btn-danger btn-sm`}
                            to={`/buy/plan/${plan.planDetail.id}`}
                          >
                            <i className={`bi bi-eye me-1`}></i>
                            More Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyFreePlanContent;
