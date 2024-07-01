import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { baseURL, imageURL } from "../../config/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Placeholder } from "react-bootstrap";

const PrivacyContent = () => {
  const metaInfo = useSelector((state) => state.metaReducer);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["privacy"],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}meta/privacy/policy/`);
      const data = await response.data.data;
      return data;
    },
    staleTime: 100,
  });

  if (isLoading) {
    return (
      <div className="container">
        <div className="row gap-2">
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: retriving</div>;
  }

  return (
    <div id="privacypolicy" className="container p-4">
      <header className="align-items-center d-flex justify-content-between border-bottom border-secondary py-2">
        <h2>Privacy Policy</h2>
        <div className="admin-logo me-2 me-sm-3">
          <Link className="d-flex align-items-center" to="/dashboard">
            <img
              className="nav-light-logo"
              src={`${metaInfo.meta?.black_logo}`}
              alt="Light"
              style={{ width: "auto", height: "80px" }}
            />
            <img
              className="nav-dark-logo"
              src={`${metaInfo.meta?.white_logo}`}
              alt="Dark"
              style={{ width: "auto", height: "80px" }}
            />
          </Link>
        </div>
      </header>
      <div className="mt-3 text-justify">
        {data &&
          data.map((priv, index) => (
            <div
              className={`row ${
                index % 2 === 0 ? "flex-lg-row-reverse" : ""
              } align-items-center mb-4`}
              key={index}
            >
              <div className={`col-12 ${priv.image ? "col-lg-8" : ""}`}>
                <h4>{priv.title}</h4>
                <p className="text-dynamic-white">{priv.description}</p>
              </div>
              {priv.image ? (
                <div
                  className={`col-12 col-lg-4 d-flex justify-content-center ${
                    index % 2 !== 0
                      ? "justify-content-lg-end"
                      : "justify-content-lg-start"
                  } mb-3 mb-lg-0`}
                >
                  <img
                    src={`${imageURL}${priv.image}`}
                    alt={priv.title}
                    className="img-fluid"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PrivacyContent;
