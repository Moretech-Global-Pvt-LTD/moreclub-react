import React from "react";
import { Button, Col, Placeholder, Row } from "react-bootstrap";
import OffersCard from "./Offercard";
import { baseURL } from "../../config/config";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { axiosInstance } from "../..";
import BusinessTypesCard from "./BusinessTypesCard";



const BusinessTypes = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["business types"],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${baseURL}business/all/types/`
            );
            return response.data.data;
        },
        staleTime: 1000,
    });

    if (isLoading) {
        return (
            <div>
                <Placeholder as="p" animation="glow" className="rounded">
                    <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
                </Placeholder>
                <Placeholder as="p" animation="glow" className="rounded">
                    <Placeholder xs={12} style={{ height: "7rem" }} />
                </Placeholder>
                <Placeholder as="p" animation="glow" className="rounded">
                    <Placeholder xs={12} style={{ height: "7rem" }} />
                </Placeholder>
            </div>
        );
    }

    if (isError) {
        <div className="text-dynamic white">Error getting data</div>;
    }
    console.log(data)

    return (
        <div>
            {data && data.length !== 0 && (
                <>
                    <div className="d-flex justify-content-between align-item-center">
                        <h2 className="mt-4 mb-3">Best Deals in Town</h2>
                        <Link to="/partners">
                            <Button variant="link">View All</Button>
                        </Link>
                    </div>
                    <Row xs={1} sm={2} md={2} lg={4} xxl={6} className="gx-3 gy-3">
                        {data.map((item) => (
                            <Col className="d-flex flex-column">
                                <BusinessTypesCard
                                    id={item.id}
                                    logo={item?.business_logo}
                                    name={item?.name}
                                />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </div>
    );
};

export default BusinessTypes;
