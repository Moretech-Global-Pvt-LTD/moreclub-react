import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { baseURL } from "../../config/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card } from "react-bootstrap";
import { currencyConvertor } from "../../redux/api/CurrencyConvertorAPI";
import PricingSkeleton from "../../components/Skeleton/PricingSkeleton";

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
    staleTime:60*1000,
    fallback: (lastData) => lastData || [],
  });

  if (isLoading) {
    return (
      <>
        
        <PricingSkeleton/>
      </>
    );
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: retriving</div>;
  }


  const planConfig = {
    1: {
      cardClass: "pricingcard-starter",
      textColorClass: "pricing-text-color",
      bgColorClass: "pricingcard-premium text-white",
      priceColorClass: "text-white",
      discountsColorClass: "pricing-text-color",
    },
    2: {
      cardClass: "pricingcard-premium",
      textColorClass: "text-white",
      bgColorClass: "bg-warning text-white",
      priceColorClass: "pricing-text-color",
      discountsColorClass: "text-warning",
    },
    3: {
      cardClass: "pricingcard-starter",
      textColorClass: "pricing-text-color",
      bgColorClass: "bg-gray text-warning",
      priceColorClass: "text-dynamic-white",
      discountsColorClass: "text-primary",
    },
    4: {
      cardClass: "pricingcard-premium",
      textColorClass: "text-white",
      bgColorClass: "bg-warning text-white",
      priceColorClass: "pricing-text-color",
      discountsColorClass: "text-warning",
    },
  
  };

  const PricingsCard = ({ mst ,index}) => {
    const monthlyRate = mst.price * rate;
    const yearlyRate = mst.yearly_price * rate;

    const item = {
      plan: mst.name,
      price: activeTab === "monthly" ? monthlyRate.toFixed(0) : yearlyRate.toFixed(0),
      period: `/${activeTab}`,
      features: mst.project_discounts?.map(pd => `${pd.project.project_name} ${parseInt(pd.discount)}%`) || [],
    };

    const config = planConfig[index] || planConfig["1"];

    const isSubscribedToNonFreePlan = user?.membershipType?.membership_type?.code !== "free";
    const isSubscribedToNonFreeBusinessPlan = user?.membershipType?.membership_type?.code !== "free_business";
    // Hide the free plan if the user is subscribed to any other plan
    const shouldHideFreePlan = mst.code === "free" && isSubscribedToNonFreePlan;
    const shouldHideFreeBusinessPlan =
      mst.code === "free_business" && isSubscribedToNonFreeBusinessPlan;
    return (
      <div
        className={`col my-2 pricing-width mx-auto mx-sm-0 ${
          shouldHideFreePlan ? "d-none" : ""
        } ${shouldHideFreeBusinessPlan ? "d-none":""}`}
      >
        <Card className={`pricingcard ${config.cardClass} px-0 pb-0`}>
          <Card.Body>
            <Card.Title>
              <h4 className={config.textColorClass}>{item.plan}</h4>
            </Card.Title>
            <div className={`${config.bgColorClass} mb-1`}>
              <h1 className={`${config.priceColorClass} text-center mb-0 mt-0`}>
                {currency.symbol} {item.price}
              </h1>
              <small>{item.period}</small>
            </div>
            <ul className="pricingcard-features">
              {item.features.map((feature, index) => (
                <li key={index} className={`${config.discountsColorClass} fw-bold`}>
                  {feature}
                </li>
              ))}
            </ul>
          </Card.Body>
          <div className="">
            {mst.id !== user?.membershipType?.membership_type?.id ? (
              <Link to={`/buy/plan/${mst.id}/${activeTab}`}>
                <div className={`bg-danger px-1 py-2 `}>
                  <h5 className="text-white text-center">
                    <i className={`bi bi-cart me-1`}></i>
                    Buy
                  </h5>
                  <p className="fw-thin text-white text-center my-0">
                    TAKE YOUR BUSINESS TO NEXT LEVEL
                  </p>
                </div>
              </Link>
            ) : (
              <div className={`bg-success px-1 py-2 `}>
                <h5 className="text-white text-center">Subscribed</h5>
                <p className="fw-thin text-white text-center my-0">
                  MAKE YOUR BUSINESS NEXT LEVEL
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }
  const normalPricingCards = data
    .filter((item) => item.type === "NORMAL")
    .sort((a, b) => a.price - b.price)
    .map((mst, index) => (
      <>
        <PricingsCard mst={mst} index={index + 1} key={index} />
      </>
    ));

  const BusinessPricingCards = data
    .filter((item) => item.type !== "NORMAL")
    .sort((a, b) => a.price - b.price)
    .map((mst, index) => (
      <>
        <PricingsCard mst={mst} index={index + 1} key={index} />
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
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4">
                {normalPricingCards}
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <h6>Business Plans</h6>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4">
                {BusinessPricingCards}
              </div>
            </div>
          </div>
        </>
      )}

      {user.isAuthenticated && user.user.user_type === "NORMAL" && (
        <div className="row mt-4">
          <div className="col-12">
            {/* <h6>Normal Plans</h6> */}

            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4">
              {normalPricingCards}
            </div>
          </div>
        </div>
      )}
      {user.isAuthenticated && user.user.user_type === "BUSINESS" && (
        <div className="row mt-4">
          <div className="col-12">
            {/* <h6>Business Plans</h6> */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4">
              {BusinessPricingCards}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
