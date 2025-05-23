import React from 'react'
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const SaloonDetailContent = ({data}) => {
    const {slug , id } = useParams();


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
                        <p>
                            {data.is_delivery && "Free Delivery |"}{" "}
                            {data.is_pickup && "Pick up |"} {data.is_dine && "Dine In |"}{" "}
                            {data.currency_code}&nbsp;
                            {data.min_order} Minimum | {data.delivery_time} service
                        </p>
                        <div className="d-flex gap-2">
                            {data.instagram_link && (
                                <a href={data.website_link} target="_blank" rel="noreferrer"><Button variant="primary" className="border-primary border-2"><i class="bi bi-globe"></i>&nbsp;&nbsp;Website</Button></a>
                            )}
                            {data.facebook_link && (
                                <a href={data.facebook_link} target="_blank" rel="noreferrer"><Button variant="primary" className="border-primary border-2"><i class="bi bi-facebook"></i>&nbsp; &nbsp; Facebook</Button></a>
                            )}
                            {data.website_link && (
                                <a href={data.website_link} target="_blank" rel="noreferrer"><Button variant="primary" className="border-primary border-2"><i class="bi bi-instagram"></i>&nbsp; &nbsp; Instagram</Button></a>
                            )}
                        </div>
                        <p>{data.short_description}</p>
                    </div>
                    <Link to={`/saloon/${id}/update/${slug}`}>
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
                <Link to={`/saloon/${id}/services/${slug}-service`} className="d-flex flex-column my-2 ">
                    <Col className="d-flex flex-column my-2 ">
                        <Card className="p-2 flex-grow-1">
                            <Card.Body className="d-flex justify-content-center">
                                <img
                                    src={'/images/moreclub/morefood/Saloon.png'}
                                    alt="menu"
                                    className="px-2 py-1 rounded  "
                                    style={{ height: "5rem", width: "5rem" }}
                                />
                            </Card.Body>
                            <Card.Title className="text-dynamic-white text-center fs-6">
                                Service
                            </Card.Title>
                        </Card>
                    </Col>
                </Link>
                <Link
                    to={`/saloon/${id}/staff/${slug}-staff`}
                    className="d-flex flex-column my-2 "
                >
                    <Col className="d-flex flex-column my-2">
                        <Card className="p-2 flex-grow-1">
                            <Card.Body className="d-flex justify-content-center">
                                <img
                                    src={'/images/moreclub/morefood/Staff.png'}
                                    alt="staff"
                                    className="px-2 py-1 rounded "
                                    style={{ height: "5rem", width: "5rem" }}
                                />
                            </Card.Body>
                            <Card.Title className="text-dynamic-white text-center fs-6">
                                Staff
                            </Card.Title>
                        </Card>
                    </Col>
                </Link>
                <Link
                    to={`/saloon/${id}/coupon/${slug}-coupon`}
                    className="d-flex flex-column my-2 "
                >
                    <Col className="d-flex flex-column my-2">
                        <Card className="p-2 flex-grow-1">
                            <Card.Body className="d-flex justify-content-center">
                                <img
                                    src={'/images/moreclub/morefood/Coupons.png'}
                                    alt="staff"
                                    className="px-2 py-1 rounded "
                                    style={{ height: "5rem", width: "5rem" }}
                                />
                            </Card.Body>
                            <Card.Title className="text-dynamic-white text-center fs-6">
                                Coupons
                            </Card.Title>
                        </Card>
                    </Col>
                </Link>
                {/* <Link
                    to={`/resturant/${id}/offer/${slug}`}
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
                    to={`/saloon/${id}/booking/${slug}-booking`}
                    className="d-flex flex-column my-2 "
                >
                    <Col className="d-flex flex-column my-2">
                        <Card className="p-2 px-2 flex-grow-1">
                            <Card.Body className="d-flex justify-content-center">
                                <img
                                    src={'/images/moreclub/morefood/booking.png'}
                                    alt="orders"
                                    className="  rounded "
                                    style={{ height: "5rem", width: "5rem" }}
                                />
                            </Card.Body>
                            <Card.Title className="text-dynamic-white text-center fs-6">
                                Bookings
                            </Card.Title>
                        </Card>
                    </Col>
                </Link>
                <Link
                    to={`/saloon/${id}/gallery/${slug}-gallery`}
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
                                Gallery
                            </Card.Title>
                        </Card>
                    </Col>
                </Link>
                <Link
                    to={`/saloon/${id}/opening-duration/${slug}-working-hour`}
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
                </Link>
            </Row>
        </div>
    );
}

export default SaloonDetailContent