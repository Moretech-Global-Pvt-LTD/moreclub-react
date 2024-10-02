import React from "react";
import { Button, Col, Placeholder, Row } from "react-bootstrap";
import { baseURL } from "../../config/config";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import BusinessTypesCard from "./BusinessTypesCard";
import axios from "axios";
import { BestDealsinTownSkeleton } from "../Skeleton/SmallCardSkeleton";



const BusinessTypes = ({ toppart }) => {
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
            <BestDealsinTownSkeleton />
        );
    }

    if (isError) {
        <div className="text-dynamic white">Error getting data</div>;
    }


    return (
        <div>
            {data && data.length !== 0 && (
                <>
                    <div className={`justify-content-between align-items-center ${!!toppart ? 'd-none' : 'd-flex '} `}>
                        <h4 className="mt-4 mb-3">Best Deals in Town</h4>
                        {/* <Link to="/partners">
                            <Button variant="link">View All</Button>
                        </Link> */}
                    </div>
                    <Row xs={2} sm={3} md={3} lg={4} xxl={6} className="gx-3 gy-3 px-1 px-lg-3 ">
                        {data.map((item) => (
                            // <Col>
                                <BusinessTypesCard
                                    id={item.id}
                                    logo={item?.image}
                                    name={item?.name}
                                    banner={item?.banner}
                                />
                            // </Col>
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
