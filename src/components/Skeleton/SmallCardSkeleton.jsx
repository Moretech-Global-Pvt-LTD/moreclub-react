import React from 'react'
import { Placeholder, Row, Col, Card } from 'react-bootstrap'

export const SmallCardSkeleton = () => {
    return (
        <div className="nearby-offers-card flex-grow-1 card p-2" >
            <div className="mx-auto mt-2 mb-0">
                <Placeholder as="div" animation="wave" className="mb-2">
                    <Placeholder.Button variant='secondary' style={{ width: 40, height: 40 }} />
                </Placeholder>
            </div>
            <div className="mx-auto mt-2 mb-0">
                <Placeholder as="p" animation="wave" className="w-100" >
                    <Placeholder style={{ width: "10em" }} className="mx-auto" />
                </Placeholder>
            </div>
        </div>
    )
}

export const Topcards = () => {
    return (

        <Col >

            <Card >
                <Card.Body>
                    <div className="d-grid w-100 mx-2">
                        <Placeholder as="p" animation="wave" className="d-flex flex-column gap-2">
                            <Placeholder xs={6} />
                            <Placeholder xs={10} />
                            <Placeholder xs={1} />
                        </Placeholder>
                    </div>

                </Card.Body>
            </Card>


        </Col>

    )
}

export const ChartSkeleton = () => {
    return (
        <div className="chart-skeleton">
            <div className="chart-placeholder">
                <div className="d-flex w-100 ">
                    <div className="mx-auto mt-2 mb-0">
                        <Placeholder as="p" animation="wave" className="w-100" >
                            <Placeholder style={{ width: "10em" }} className="mx-auto" />
                        </Placeholder>
                    </div>
                </div>
                <div className="d-flex w-100 ">

                    <div className="mx-auto mt-2 mb-0">
                        <Placeholder as="p" animation="wave" className="w-100" >
                            <Placeholder style={{ width: "10em" }} className="mx-auto" />
                        </Placeholder>
                    </div>
                    <div className="mx-auto mt-2 mb-0">
                        <Placeholder as="p" animation="wave" className="w-100" >
                            <Placeholder style={{ width: "10em" }} className="mx-auto" />
                        </Placeholder>
                    </div>
                </div>
                <Placeholder xs={12} style={{ height: '200px', borderRadius: '8px' }} />
            </div>

        </div>
    );
};


export const BestDealsinTownSkeleton = () => {
    return (
        <Row xs={2} sm={3} md={3} lg={4} xxl={6} className="gx-3 gy-3" >
            {Array.from({ length: 8 }).map((_, index) => (
                <Col className="d-flex flex-column">
                    <SmallCardSkeleton key={index} />
                </Col>
            ))}
        </Row>)
}

export const RestaurantFunctionSkeleton = () => {
    return (
        <Row xs={2} sm={3} md={3} lg={4} xxl={6} className="gx-3 gy-3" >
            {Array.from({ length: 6 }).map((_, index) => (
                <Col className="d-flex flex-column">
                    <SmallCardSkeleton key={index} />
                </Col>
            ))}
        </Row>)
}

export const FoodItem = () => {
    return (
        <div className="food-card">
            <div className="food-card-body">
                <Placeholder as="p" animation="wave" className="d-flex flex-column gap-2">
                    <Placeholder xs={6} />
                    <Placeholder xs={1} />
                    <Placeholder xs={10} />
                </Placeholder>

            </div>
            <div className="food-card-image-container bg-secondary">
                <Placeholder as="div" animation="wave">
                    <Placeholder xs={12} style={{ height: "6rem" }} />
                </Placeholder>
            </div>
        </div>

    )
}

export const FoodItemSkeleton = () => {
    return (

        <Row
            xs={1}
            sm={1}
            md={1}
            lg={2}
            xl={2}
            xxl={3}
            className="gx-3 gy-3 my-4">
            {Array.from({ length: 12 }).map((_, index) => (
                <Col className="d-flex flex-column">
                    <FoodItem key={index} />
                </Col>
            ))}
        </Row>
    )
}


export const RestaurantItemskeleton = () => {
    return (
        <Row
            xs={2}
            sm={3}
            md={4}
            lg={4}
            xl={5}
            xxl={6}
            className="gx-3 gy-3" >
            {Array.from({ length: 12 }).map((_, index) => (
                <Col className="d-flex flex-column">
                    <SmallCardSkeleton key={index} />
                </Col>
            ))}
        </Row>)
}



export const QuickSkeleton = () => {
    return (
        <Row xs={3} sm={3} md={3} lg={3} xl={3} xxl={6} className="gx-3 gy-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <Col className="d-flex flex-column ">
                    <SmallCardSkeleton key={index} />
                </Col>
            ))}
        </Row>)
}



export const TopcardsSkeleton = () => {
    return (
        <Row sm={2} md={4} className=" gx-3 gy-3 gb-3 ">
            {Array.from({ length: 4 }).map((_, index) => (

                <Topcards key={index} />

            ))}
        </Row>)
}


export const WalletSkeleton = () => {
    return (
        <div className="nearby-offers-card flex-grow-1 card p-2" >
            <div className="d-flex align-items-center mb-1 w-100 text-dynamic-white">

                <Placeholder as="div" animation="wave">
                    <Placeholder className="rounded-circle" style={{ width: 40, height: 40 }} />
                </Placeholder>
                <div className="d-grid w-100 mx-2">
                    <Placeholder as="p" animation="wave" className="d-flex flex-column gap-2">
                        <Placeholder xs={10} />
                        <Placeholder xs={2} />

                    </Placeholder>
                </div>
            </div>
            <div className="mx-auto mt-2 mb-0">
                <Placeholder as="p" animation="wave" className="w-100" >
                    <Placeholder style={{ width: "10em" }} className="mx-auto" />
                </Placeholder>
                <Placeholder as="p" animation="wave" className="w-100" >
                    <Placeholder style={{ width: "10em" }} className="mx-auto" />
                </Placeholder>
                <Placeholder as="p" animation="wave" className="w-100" >
                    <Placeholder style={{ width: "10em" }} className="mx-auto" />
                </Placeholder>
            </div>
        </div>
    )
}







