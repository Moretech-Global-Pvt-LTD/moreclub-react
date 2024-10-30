import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const StationDetailContent = ({ data }) => {
    const { id ,name } = useParams();
    const slug = data.name.replace(/ /g, "-");

    return (
        <div>
            <Row className="mt-4 align-items-center">
                <Col xs={12} md={6} xl={7} className="restaurant-info">
                    <div className="px-2 py-1  rounded-circle profile-image bg-white d-flex align-items-center justify-content-center overflow-hidden"
                        style={{ height: "5rem", width: "5rem", }}
                    >
                        <img
                            src={data.logo}
                            alt="setup"
                            className="rounded-circle"
                            style={{ height: "100%", objectFit: "cover", width: "100%", placeSelf: "center" }}
                        />
                    </div>
                    <div className="restaurant-details">
                        <h2>{data.name}</h2>
                        <p>
                            <i class="bi bi-geo-alt"></i>&nbsp; {data.address}
                        </p>
                        <p>{data.short_description}</p>
                    </div>
                    <Link to={`/station/${id}/${slug}/update`}>
                        <Button variant="warning">{"Edit"}</Button>
                    </Link>
                </Col>
                <Col xs={12} md={6} xl={5}>
                    <Image
                        src={data.banner}
                        alt="banner"
                        className="px-2 py-1 rounded-3"
                        style={{ placeSelf: "center", maxHeight: "20rem" }}
                    />
                </Col>
            </Row>

            <Row xs={2} sm={2} md={3} lg={4} xl={5} xxl={6} className="mt-4">
                <Link to={`/station/${id}/menu/${name}-menu`} className="d-flex flex-column my-2 ">
                    <Col className="d-flex flex-column my-2 ">
                        <Card className="p-2 flex-grow-1">
                            <Card.Body className="d-flex justify-content-center">
                                <img
                                    src={'/images/moreclub/morefood/menus.png'}
                                    alt="menu"
                                    className="px-2 py-1 rounded  "
                                    style={{ height: "5rem", width: "5rem" }}
                                />
                            </Card.Body>
                            <Card.Title className="text-dynamic-white text-center fs-6">
                                Menus
                            </Card.Title>
                        </Card>
                    </Col>
                </Link>
                {/* <Link
                    to={`/station/${id}/cuisine/${slug}`}
                    className="d-flex flex-column my-2 "
                >
                    <Col className="d-flex flex-column my-2">
                        <Card className="p-2 flex-grow-1">
                            <Card.Body className="d-flex justify-content-center">
                                <img
                                    src={'/images/moreclub/morefood/cuisine.png'}
                                    alt="cuisine"
                                    className="px-2 py-1 rounded "
                                    style={{ height: "5rem", width: "5rem" }}
                                />
                            </Card.Body>
                            <Card.Title className="text-dynamic-white text-center fs-6">
                                Cuisine
                            </Card.Title>
                        </Card>
                    </Col>
                </Link>
                <Link
                    to={`/station/${id}/offer/${slug}`}
                    className="d-flex flex-column my-2 "
                >
                    <Col className="d-flex flex-column my-2">
                        <Card className="p-2 flex-grow-1">
                            <Card.Body className="d-flex justify-content-center">
                                <img
                                    src={'/images/moreclub/morefood/offers.png'}
                                    alt="offer"
                                    className="px-2 py-1 rounded "
                                    style={{ height: "5rem", width: "5rem" }}
                                />
                            </Card.Body>
                            <Card.Title className="text-dynamic-white text-center fs-6">
                                Offers
                            </Card.Title>
                        </Card>
                    </Col>
                </Link> */}



                <Link
                    to={`/station/${id}/orders/${slug}`}
                    className="d-flex flex-column my-2 "
                >
                    <Col className="d-flex flex-column my-2">
                        <Card className="p-2 px-2 flex-grow-1">
                            <Card.Body className="d-flex justify-content-center">
                                <img
                                    src={'/images/moreclub/morefood/orders.png'}
                                    alt="orders"
                                    className="  rounded "
                                    style={{ height: "5rem", width: "5rem" }}
                                />
                            </Card.Body>
                            <Card.Title className="text-dynamic-white text-center fs-6">
                                Orders
                            </Card.Title>
                        </Card>
                    </Col>
                </Link>
                <Link
                    to={`/station/${id}/allorders/${slug}`}
                    className="d-flex flex-column my-2 "
                >
                    <Col className="d-flex flex-column my-2">
                        <Card className="p-2 flex-grow-1">
                            <Card.Body className="d-flex justify-content-center">
                                <img
                                    src={'/images/moreclub/morefood/galleries.png'}
                                    alt="gallery"
                                    className="px-2 py-1 rounded "
                                    style={{ height: "5rem", width: "5rem" }}
                                />
                            </Card.Body>
                            <Card.Title className="text-dynamic-white text-center fs-6">
                                All Orders
                            </Card.Title>
                        </Card>
                    </Col>
                </Link>
                {/* <Link
                    to={`/station/${id}/opening-duration/${slug}`}
                    className="d-flex flex-column my-2 "
                >
                    <Col className="d-flex flex-column my-2">
                        <Card className="p-2 flex-grow-1">
                            <Card.Body className="d-flex justify-content-center">
                                <img
                                    src={'/images/moreclub/morefood/workinghour.png'}
                                    alt="working"
                                    className="px-2 py-1 rounded "
                                    style={{ height: "5rem", width: "5rem" }}
                                />
                            </Card.Body>
                            <Card.Title className="text-dynamic-white text-center fs-6">
                                Opening Duration
                            </Card.Title>
                        </Card>
                    </Col>
                </Link> */}
            </Row>

        </div>
    );
};

export default StationDetailContent;
