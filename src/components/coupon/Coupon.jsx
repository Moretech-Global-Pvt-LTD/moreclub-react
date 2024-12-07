import axios from "axios";
import React from "react";
import CouponCard from './CouponCard';
import { baseURL } from "../../config/config";
import { Button, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Coupon() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const response = await axios.get(
        `${baseURL}coupons/list/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 60000,
  });


  if (isLoading) {
    return (
      <div className="container">
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

  const oneMonthCoupons = data.filter(coupon => coupon.expiry_date_days === 30);
  const twoMonthsCoupons = data.filter(coupon => coupon.expiry_date_days === 60);
  const sixMonthsCoupons = data.filter(coupon => coupon.expiry_date_days === 180);

  return (
    <section id="coupons" className="top-seller-wrapper">
      
      <div className="container">
      <div className="d-flex justify-content-between align-items-center">
      <div className="section-heading">
              <h2 className="mb-0">{"Coupons"}</h2>
            </div>
        <Link to="/coupon"> <Button variant="link">View All</Button></Link>
      </div>
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
      </div>
    </section>
  );
}
