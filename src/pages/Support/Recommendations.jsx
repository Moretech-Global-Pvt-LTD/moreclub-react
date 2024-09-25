// Recommendations.js
import React from 'react';
import { Row, Col, Placeholder } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { baseURL } from '../../config/config';
import axios from 'axios';
import BlogCard from '../../components/blog/blogCard';

const Recommendations = ({ title }) => {

  
    const url = title ? `${baseURL}blogs/similar/blog/?title=${title}` : `${baseURL}blogs/similar/blog/`
    const { data, isLoading, isError } = useQuery({
        queryKey: ["recommendations", title],
        queryFn: async () => {
            const response = await axios.get(url);
            const data = await response.data.data;
            return data;
        },
        staleTime: 100,
    });

    if (isLoading) {
        return (
            <div className="container">
                <div className="row gap-2">
                    <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-100">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-100">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-100">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-100">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                </div>
            </div>
        );
    }

    if (isError) {
        return <div className="text-dynamic-white">Error: retriving</div>;
    }



    return (
        <Row xs={1} sm={2} md={3} lg={1}>
            {data.map((recommendation, index) => (
                <Col key={index}>
                    <BlogCard
                        key={recommendation.id}
                        slug={recommendation.slug}
                        image={recommendation.image}
                        title={recommendation.title}
                        description={recommendation.short_description}
                        date={recommendation.publish}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default Recommendations;
