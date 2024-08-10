import React, {  useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TinySlider from "tiny-slider-react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { baseURL, imageURL } from "../../config/config";
import 'tiny-slider/dist/tiny-slider.css';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Placeholder } from "react-bootstrap";

export default function FeaturedNFT(props) {
  const { heading } = props;

  const pricingSettings = {
    items: 4,
    gutter: 24,
    slideBy: 1,
    autoplay: false,
    autoplayButtonOutput: false,
    autoplayTimeout: 5000,
    speed: 750,
    loop: true,
    nav: false,
    mouseDrag: true,
    controlsText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      320: {
        items: 1,
        gutter: 0,
      },
      480: {
        items: 1.5,
        gutter: 24,
      },
      576: {
        items: 2,
        gutter: 24,
      },
      992: {
        items: 3,
        gutter: 24,
      },
      1200: {
        items: 4,
        gutter: 24,
      },
    },
  };

  const user = useSelector((state) => state.userReducer);

  const [activeTab, setActiveTab] = useState("monthly");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pricing"],
    queryFn: async () => {
      const response = await axios.get(
        `${baseURL}members/all/membership_type/`
      );
      const data = await response.data.data;
      console.log(data)
      return data;
    },
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

 
  const PricingCards = data.map((mst, index) => (
    
   
    <div key={index}>
      <div className="nft-card card featured-card border-0 bg-gray max-width-pricing">
        <div className="img-wrap">
         
          <div className={`badge bg- position-absolute section-`}>
          </div>
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
                  <i className={`bi bi-check position-absolute bg-success `} />
                </div>

                <div className="name-author">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip>{mst.name}</Tooltip>}
                  >
                    <Link
                      className="name d-block hover-primary text-truncate"
                      style={{ fontSize: "20px" }}
                      // to={`${process.env.PUBLIC_URL}/featured-items/`}
                      to={"#"}
                    >
                      <b>{mst.name} Plan</b>
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
                  ${activeTab === "monthly" ? mst.price : mst.yearly_price}
                </h1>
              </div>
            </div>
            <div className="col-12">
              <div className="price text-start" style={{ marginBottom: "5px" }}>
                <span className="fz-12 d-block"></span>
                <h5 className="mb-0 text-warning">Discount In</h5>
              </div>
              {mst.project_discounts.map((pd, index) => (
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
                  to={user.isAuthenticated ? `/buy/plan/${mst.id}/${activeTab}`:`/login`}
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


    
  ));

  

  return (
    <div className="featured-nfts-wrap">
      <div className="container">
        <div style={{ float: "right" }}>
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
        <div className="row">
          <div className="col-12 col-sm-9 col-lg-6">
            <div className="section-heading">
              <h2 className="mb-0">{heading}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Featured NFT's Slide*/}
            <div className="featured-nfts-slide">
              <TinySlider settings={pricingSettings}>{PricingCards}</TinySlider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
