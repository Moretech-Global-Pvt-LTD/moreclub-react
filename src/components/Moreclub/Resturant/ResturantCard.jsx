import React from 'react'
import { Card, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ResturantCard = ({res, link}) => {
    return (
      <Link
        to={link}
        className="d-flex flex-column"
        key={res.id}
        // style={{ minWidth: "240px" }}
      >
        <Col className="d-flex flex-column rounded-3">
          <Image
            src={res.banner}
            alt={"banner"}
            style={{ height: "12rem", background: "white" }}
          />
          <Card className="p-2 flex-grow-1">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <ul>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={res.banner}
                    style={{
                      width: "25px",
                      height: "25px",
                      objectFit: "cover",
                      backgroundColor: "#fff",
                    }}
                    alt="logo"
                    className="img-fluid rounded-circle mb-3 profile-image"
                  />
                  {/* )} */}
                  <h5 className="text-dynamic-white  text-start">{res.name}</h5>
                </div>
                <li className="d-flex justify-content-between text-start">
                  {/* <h6>Location</h6> */}
                  <p className="my-0" style={{ fontSize: "12px" }}>
                    <i class="bi bi-geo-alt"></i>&nbsp;{res.address}
                  </p>
                </li>
                <li className="d-flex text-start line-clamp-3">
                  {/* <h6>Location</h6> */}
                  <p className="my-0" style={{ fontSize: "12px" }}>
                    {res.description}
                  </p>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Link>
    );
}

export default ResturantCard