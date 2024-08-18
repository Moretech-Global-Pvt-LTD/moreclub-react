import React from 'react'
import { Card, Col, Image } from 'react-bootstrap';
import { morefoodimageURL } from '../../../config/config';

const ResturantCard = ({ res, link }) => {
    return (

            <a
                href={link}
                target="_blank"
                rel='noreferrer'
                className="d-flex flex-column mx-0 px-1"
                key={res.id}
            // style={{ minWidth: "240px" }}
            >
        <Col className="d-flex flex-column flex-grow-1 rounded-3 restaurantCard position-relative mx-0">
                <Image
                    src={`${morefoodimageURL}${res.banner}`}
                    alt={"banner"}
                    className="restaurantCard-image"
                />
                <Card className="flex-grow-1 p-0">
                    <Card.Body className="d-flex align-items-center justify-content-between p-2">
                        <ul>
                            <div className="d-flex align-items-center gap-2 ">
                                <img
                                    src={`${morefoodimageURL}${res.logo}`}
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
                                <h6 className="text-dynamic-white  text-start">{res.name}</h6>
                            </div>
                            <li className="d-flex justify-content-between text-start">
                                {/* <h6>Location</h6> */}
                                <p className="my-0" style={{ fontSize: "10px" }}>
                                    <i class="bi bi-geo-alt"></i>&nbsp;{res.address}
                                </p>
                            </li>
                            
                        </ul>
                    </Card.Body>
                </Card>
                <span className='text-danger fw-bold position-absolute top-0 end-0 fs-6 bg-warning p-1 '><i  class="bi bi-star-fill"></i> {res.restaurant_rating}</span>
        </Col>
            </a>

    );
}

export default ResturantCard