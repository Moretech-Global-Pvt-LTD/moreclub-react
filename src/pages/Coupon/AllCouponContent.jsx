import axios from "axios";
import React from "react";

import { baseURL } from "../../config/config";
import CouponCard from "../../components/coupon/CouponCard";
import { useQuery } from "@tanstack/react-query";
import { Placeholder } from "react-bootstrap";

export default function AllCouponContent() {
 
  const { data, isLoading, isError } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const response = await axios.get(
        `${baseURL}coupons/list/`
      );
      const data = await response.data.data;
      return data;
    },
  });


  if (isLoading) {
    return (
      <div className="">
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
      </div>
    );
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: reteriving</div>;
  }

  const oneMonthCoupons = data.filter(
    (coupon) => coupon.expiry_date_days === 30
  );
  const twoMonthsCoupons = data.filter(
    (coupon) => coupon.expiry_date_days === 60
  );
  const sixMonthsCoupons = data.filter(
    (coupon) => coupon.expiry_date_days === 180
  );

  return (
    <section id="coupons" className="top-seller-wrapper">
      <div className="row g-2 g-lg-5 ">
        <div className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-4">
          <div className="section-heading text-center mb-4">
            <h4 className="mb-0">1 month Expiry</h4>
          </div>
          {oneMonthCoupons.map((coupon, index) => (
            <CouponCard key={index} coupon={coupon} />
          ))}
        </div>
        <div className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-4">
          <div className="section-heading text-center mb-4">
            <h4 className="mb-0">2 months Expiry</h4>
          </div>
          {twoMonthsCoupons.map((coupon, index) => (
            <CouponCard key={index} coupon={coupon} />
          ))}
        </div>
        <div className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-4">
          <div className="section-heading text-center mb-4">
            <h4 className="mb-0">6 months Expiry</h4>
          </div>
          {sixMonthsCoupons.map((coupon, index) => (
            <CouponCard key={index} coupon={coupon} />
          ))}
        </div>
      </div>
    </section>
  );
}
