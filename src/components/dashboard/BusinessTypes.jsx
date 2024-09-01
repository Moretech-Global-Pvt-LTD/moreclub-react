import React from "react";
import { Button, Col, Placeholder, Row } from "react-bootstrap";
import { baseURL } from "../../config/config";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import BusinessTypesCard from "./BusinessTypesCard";
import axios from "axios";



const BusinessTypes = ({toppart}) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["business types"],
        queryFn: async () => {
            const response = await axios.get(
                `${baseURL}business/all/types/`
            );
            return response.data.data;
        },
        staleTime: 1000,
    });

    if (isLoading) {
        return (
            <div className="d-flex gap-2">
                <Placeholder as="p" animation="glow" className="rounded">
                    <Placeholder xs={12} md={6} lg={4} xl={3} style={{ height: "7rem", width:"7rem" }} />
                </Placeholder>
                <Placeholder as="p" animation="glow" className="rounded">
                    <Placeholder xs={12} md={6} lg={4} xl={3} style={{ height: "7rem", width: "7rem" }} />
                </Placeholder>
                <Placeholder as="p" animation="glow" className="rounded">
                    <Placeholder xs={12} md={6} lg={4} xl={3} style={{ height: "7rem", width: "7rem" }} />
                </Placeholder>
                <Placeholder as="p" animation="glow" className="rounded">
                    <Placeholder xs={12} md={6} lg={4} xl={3} style={{ height: "7rem", width: "7rem" }} />
                </Placeholder>
            </div>
        );
    }

    if (isError) {
        <div className="text-dynamic white">Error getting data</div>;
    }


    return (
        <div>
            {data && data.length !== 0 && (
                <>
                    <div className={`justify-content-between align-item-center ${!!toppart ? 'd-none': 'd-flex'} `}>
                        <h2 className="mt-4 mb-3">Best Deals in Town</h2>
                        <Link to="/partners">
                            <Button variant="link">View All</Button>
                        </Link>
                    </div>
                    <Row xs={2} sm={3} md={3} lg={4} xxl={6} className="gx-3 gy-3">
                        {data.map((item) => (
                            <Col className="d-flex flex-column">
                                <BusinessTypesCard
                                    id={item.id}
                                    logo={item?.image}
                                    name={item?.name}
                                    banner={item?.banner}
                                />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
            {data && data.length === 0 && (
                <>
                    <div className="d-flex justify-content-between align-item-center">
                        <h2 className="mt-4 mb-3">Best Deals in Town</h2>
                        <Link to="/partners">
                            <Button variant="link">View All</Button>
                        </Link>
                    </div>
                    <Row xs={12} className="gx-3 gy-3">
                        <p>Our Partners are not available right now </p>
                    </Row>
                </>
            )}
        </div>
    );
};

export default BusinessTypes;
