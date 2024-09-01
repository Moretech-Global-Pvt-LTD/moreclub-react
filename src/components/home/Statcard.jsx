import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { baseURL } from "../../config/config";

const Statcard = () => {
  const [stat, setStat] = useState()
  const [isloading, setIsloading] = useState(false)

  useEffect(() => {
    setIsloading(true)
    axios.get(`${baseURL}meta/home/data/`)
      .then((res) => {
        setStat(res.data.data)
      })
      .catch((error) => {
        setStat({
          business: 0,
          customer: 0,
          lead: 0,
          verified_business: 0
        })
        console.log(error);
      }).finally(() => {
        setIsloading(false)
      });
  }, [])


  return (
    <div className="stats">
      <Row>
        <Col xs={6} md={3} className="mb-2">
          <div className="stat-box">
            <h4 className="text-white">{stat?.customer}+</h4>
            <p>Customers</p>
          </div>
        </Col>
        <Col xs={6} md={3} className="mb-2">
          <div className="stat-box">
            <h4 className="text-white">{stat?.business}+</h4>
            <p>Business</p>
          </div>
        </Col>
        <Col xs={6} md={3} className="mb-2">
          <div className="stat-box">
            <h4 className="text-white">{stat?.lead}+</h4>
            <p>Leads</p>
          </div>
        </Col>
        <Col xs={6} md={3} className="mb-2">
          <div className="stat-box">
            <h4 className="text-white">{stat?.verified_business}+</h4>
            <p style={{ whiteSpace: "nowrap" }}>Verified Business</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Statcard;
