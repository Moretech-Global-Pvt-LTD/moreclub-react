import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { baseURL, imageURL } from "../../config/config";
import "tiny-slider/dist/tiny-slider.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Placeholder } from "react-bootstrap";
import { currencyConvertor } from "../../redux/api/CurrencyConvertorAPI";

export default function PricingPlans({ title }) {
  const user = useSelector((state) => state.userReducer);
  const [activeTab, setActiveTab] = useState("monthly");
  const currency = useSelector((state) => state.currencyReducer.currencyDetail);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const fetchRate = async () => {
      const usercode = currency.currencyCode;
      const convertedRate = await currencyConvertor("EUR", usercode);
      setRate(convertedRate);
    };

    fetchRate();
  }, [currency.currencyCode]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pricing"],
    queryFn: async () => {
      const response = await axios.get(
        `${baseURL}members/all/membership_type/`
      );
      const data = await response.data.data;
      return data;
    },
  });

  if (isLoading) {
    return (
      <>
        <div className="d-flex  g-2">
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "10rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
            <Placeholder xs={12} style={{ height: "10rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25">
            <Placeholder xs={12} style={{ height: "10rem" }} />
          </Placeholder>
        </div>
      </>
    );
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: reteriving</div>;
  }

  const PricingsCard = ({ mst }) => {
    const monthlyRate = mst.price * rate;
    const yearlyRate = mst.yearly_price * rate;

    return (
      <div className="col my-2 pricing-width mx-auto mx-sm-0">
        <div
          className="nft-card card featured-card border-0 bg-gray "
          // style={{ maxWidth: "250px" }}
        >
          <div className="img-wrap">
            {/* Badge */}
            <div className={`badge bg- position-absolute section-`}></div>
          </div>

          <div className="card-body">
            {/* Meta Info */}
            <div className="row gx-2 align-items-center mt-2">
              <div className="col-12">
                <div className="name-info d-flex align-items-center">
                  <div className="author-img position-relative">
                    <img
                      className="shadow"
                      src={`${imageURL}${mst.icon}`}
                      alt=""
                    />
                    <i
                      className={`bi bi-check position-absolute bg-success `}
                    />
                  </div>

                  <div className="name-author">
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip>{mst?.name}</Tooltip>}
                    >
                      <Link
                        className="name d-block hover-primary text-truncate"
                        style={{ fontSize: "20px" }}
                        to={`${process.env.PUBLIC_URL}/featured-items/`}
                      >
                        <b>{mst?.name} Plan</b>
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
                  <h1 className="mb-0 text-danger">
                    {currency.symbol}&nbsp;
                    {activeTab === "monthly"
                      ? monthlyRate.toFixed(0)
                      : yearlyRate.toFixed(0)}
                    <br />
                  </h1>
                  <span
                    className="text-dynamic-white mt-0 mb-0"
                    style={{ fontSize: "14px" }}
                  >
                    /&nbsp;{activeTab}
                  </span>
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
                {mst?.project_discounts?.map((pd, index) => (
                  <div className="price text-start">
                    <span className="fz-12 d-block"></span>
                    <h6 className="mb-0">
                      <i class="bi bi-patch-check-fill ms-2 text-success"></i>{" "}
                      {pd.project.project_name} {parseInt(pd.discount)}%
                    </h6>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="row gx-2 align-items-center mt-3">
              <div className="col-6">
                <Link className={`btn btn- rounded-pill btn-sm`} to="">
                  <i className={`bi `}></i>
                </Link>
              </div>

              <div className="col-6 text-end">
                {mst.id !== user?.membershipType?.membership_type?.id ? (
                  <Link
                    className={`btn btn-danger btn-sm hover-primary`}
                    to={`/buy/plan/${mst.id}/${activeTab}`}
                  >
                    <i className={`bi bi-cart me-1`}></i>
                    Buy
                  </Link>
                ) : (
                  <span className="btn-success btn btn-sm">Subscribed</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const normalPricingCards = data
    .filter((item) => item.type === "NORMAL")
    .map((mst, index) => (
      <>
        <PricingsCard mst={mst} key={index} />
      </>
    ));

  const BusinessPricingCards = data
    ?.filter((item) => item.type === "BUSINESS")
    .map((mst, index) => (
      <>
        <PricingsCard mst={mst} key={index} />
      </>
    ));

  return (
    <div className="featured-nfts-wrap">
      <div className="mt-4">
        <h2>{title}</h2>
        <div className="d-flex justify-content-end gap-1">
          <button
            className={`btn btn-${
              activeTab === "monthly" ? "success" : "danger"
            } rounded-pill btn-sm`}
            onClick={() => handleTabChange("monthly")}
          >
            Monthly
          </button>
          &nbsp;
          <button
            className={`btn btn-${
              activeTab === "yearly" ? "success" : "danger"
            } rounded-pill btn-sm`}
            onClick={() => handleTabChange("yearly")}
          >
            Yearly
          </button>
        </div>
      </div>

      {!user.isAuthenticated && (
        <>
          <div className="row mt-4">
            <div className="col-12">
              <h6>Normal Plans</h6>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                {normalPricingCards}
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <h6>Business Plans</h6>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                {BusinessPricingCards}
              </div>
            </div>
          </div>
        </>
      )}

      {user.isAuthenticated && user.user.user_type === "NORMAL" && (
        <div className="row mt-4">
          <div className="col-12">
            <h6>Normal Plans</h6>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {normalPricingCards}
            </div>
          </div>
        </div>
      )}
      {user.isAuthenticated && user.user.user_type === "BUSINESS" && (
        <div className="row mt-4">
          <div className="col-12">
            <h6>Business Plans</h6>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {BusinessPricingCards}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
