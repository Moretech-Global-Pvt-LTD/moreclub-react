import React from 'react'
import { Col, Placeholder, Row } from 'react-bootstrap';
import { RestaurantFunctionSkeleton } from './SmallCardSkeleton';

const RestaurantLayoutSkeleton = () => {
    return (
        <>
            <Row className="my-4 align-items-center">
                <Col xs={12} md={6} xl={7} className="restaurant-info">
                    <div className="px-2 py-1  rounded-circle profile-image bg-white d-flex align-items-center justify-content-center overflow-hidden"
                        style={{ height: "5rem", width: "5rem", }}
                    >
                        <Placeholder as="div" animation="wave">

                            <Placeholder.Button variant="secondary" style={{ width: "100%", height: "100%" }} />
                        </Placeholder>
                    </div>
                    <div className="restaurant-details">
                        <Placeholder as="p" animation="wave">
                            <Placeholder xs={8} style={{ height: "2rem" }} />
                            <Placeholder xs={7} />

                            <Placeholder xs={7} />

                        </Placeholder>
                        <Placeholder as="p" animation="wave" className="d-flex gap-2">
                            <Placeholder.Button variant='secondary' style={{ height: "2rem", width: "6rem" }} />
                            <Placeholder.Button variant='secondary' style={{ height: "2rem", width: "6rem" }} />
                            <Placeholder.Button variant='secondary' style={{ height: "2rem", width: "6rem" }} />
                        </Placeholder>
                        <Placeholder as="p" animation="wave">
                            <Placeholder xs={10} />
                            <Placeholder xs={10} />
                            <Placeholder xs={10} />
                        </Placeholder>



                    </div>

                </Col>
                <Col xs={12} md={6} xl={5}>
                    <Placeholder.Button variant="secondary" style={{ placeSelf: "center", width: "100%", height: "10rem" }} />
                </Col>
            </Row>
            <RestaurantFunctionSkeleton />


        </>
    )
}

export default RestaurantLayoutSkeleton;