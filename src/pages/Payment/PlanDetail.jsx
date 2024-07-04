import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { Link } from "react-router-dom";

const PlanDetail = ({ plan, currency, price, planTime }) => {
  return (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanDetail;
