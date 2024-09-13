import React from 'react';
import { Col, Placeholder, Row } from 'react-bootstrap';

const CardSkeleton = () => {
    return (
        <div className="d-flex flex-column mx-0 px-1">
            <Col className="d-flex flex-column flex-grow-1 rounded-3 restaurantCard position-relative mx-0" >
                <div className='restaurantCard-image-container'>
                    <Placeholder as="div" animation="wave">
                        <Placeholder className="" style={{ height: "10rem", width: "100%" }} />
                    </Placeholder>
                </div>
                <div className="card p-1">
                    <div className="profile-pic">
                        <Placeholder as="div" animation="wave">
                            <Placeholder className="rounded-circle" style={{ width: 40, height: 40 }} />
                        </Placeholder>
                    </div>
                    <Placeholder as="p" animation="wave">
                        <Placeholder xs={8} />
                        <Placeholder xs={10} />
                        <Placeholder xs={12} />
                    </Placeholder>
                </div>
            </Col>
        </div>
    );
};


const RestaurantCardSkeleton = () => {
    return (
        <Row xs={2} sm={2} md={2} lg={3} xl={4} xxl={5} className=" px-2">
            {Array.from({ length: 5 }).map((_, index) => (
                <CardSkeleton key={index} />
            ))}
        </Row>
    )
}

export default RestaurantCardSkeleton


