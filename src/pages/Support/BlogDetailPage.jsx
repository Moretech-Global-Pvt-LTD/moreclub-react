import React from 'react'
import LandingLayout from '../../components/Layout/LandingLayout'
import Recommendations from './Recommendations';
import { useParams } from 'react-router-dom';
import BlogDetail from './BlogDetail';
import { Placeholder } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../../config/config';

const BlogDetailPage = () => {

    const {  slug } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["Blog details", slug],
        queryFn: async () => {
            const response = await axios.get(`${baseURL}blogs/${slug}/detail/`);
            const data = await response.data.data;
            return data;
        },
        staleTime: 100,
    });

    if (isLoading) {
        return (
            <LandingLayout>
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
            </LandingLayout>
        );
    }

    if (isError) {
        return <div className="text-dynamic-white">Error: retriving</div>;
    }

    return (
        <LandingLayout>
            <div className="blog-detail-container">
                <BlogDetail data={data} />
                <div className="blog-detail-sidebar">
                    <h3 className="blog-detail-sidebar-title">More from this category</h3>
                    {data && data.title &&
                    
                    <Recommendations title={data.title} />
                    }
                </div>
            </div>

        </LandingLayout>
    )
}

export default BlogDetailPage