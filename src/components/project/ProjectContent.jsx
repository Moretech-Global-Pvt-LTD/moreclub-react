import React from "react";

import { Link } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { Placeholder } from "react-bootstrap";
import { baseURL } from "../../config/config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import UniversalErrorbox from "../Layout/UniversalErrorBox";

export default function ProjectContent(props) {
  const { heading } = props;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project"],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}projects/list/`);
      const data = await response.data.data;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container">
        <div className="d-flex  g-2">
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "15rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
            <Placeholder xs={12} style={{ height: "15rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25">
            <Placeholder xs={12} style={{ height: "15rem" }} />
          </Placeholder>
        </div>
      </div>
    );
  }

  if (isError) {
    return <UniversalErrorbox message="Something went wrong while fetching the Projects details" 
    retry={["project"]}
    />
  }

  const ProjectCards = data.map((proj, index) => (
    <div
      key={index}
      className="nft-card border-0 bg-gray pt-2 product-card-containers"
    >
      <div className="img-wrap bg-white">
        <img
          src={`${proj.image}`}
          alt={proj.project_name}
          style={{ height: "15rem", width: "100%", objectFit: "cover" }}
        />

        <div className={`badge bg-primary position-absolute`}>
          {proj.project_name}
        </div>
      </div>

      <div className="card-body">
        {/* Meta Info */}
        <div className="row gx-2 align-items-center mt-0">
          <div className="col-12">
            <div className="d-flex align-items-center">
              <div className="name-author">
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id={`featuredNFT${proj.id}`}>
                      {proj.project_name}
                    </Tooltip>
                  }
                >
                  <Link
                    className="name d-block hover-primary"
                    to={`/projects/${proj.id}`}
                  >
                    <b className="text-truncate" style={{ fontSize: "20px" }}>
                      {proj.project_name}
                    </b>
                    <p className="truncateText3">{proj.description}</p>
                  </Link>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="row gx-2 align-items-center mt-3">
          <div className="col-12 text-end">
            <Link
              className={`btn btn-danger btn-sm hover-primary`}
              to={`/projects/${proj.id}`}
            >
              View Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="featured-nfts-wrap">
      {/* <div className="container"> */}
      <div className="row">
        <div className="col-12 col-sm-9 col-lg-6">
          <div className="section-heading">
            <h2 className="mb-0">{heading}</h2>
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* <div className="container"> */}

      <div className="row mt-4">
        <div className="col-12">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 gap-2">
            {ProjectCards}
          </div>
        </div>
      </div>
    </div>
  );
}
