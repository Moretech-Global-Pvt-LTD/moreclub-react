import React, { useState } from 'react'
import StationLayout from './StationLayout'
import { Col, Placeholder } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import StationUpdateInfoForm from '../../../components/Moreclub/Resturant/station/StationUpdateForm';
import StationBanner from '../../../components/Moreclub/Resturant/station/StationBannerUpdate';
import StationLogoUpdate from '../../../components/Moreclub/Resturant/station/StationLogoUpdate';
import { morefoodAuthenticatedAxios } from '../../../utills/axios/morefoodaxios';

const StationUpdatePage = () => {
    const [activeTab, setActiveTab] = useState("Information");
    const { id, name } = useParams();
    const stationName = name.replace(/-/g, " ");
    const { data, isLoading, isError } = useQuery({
        queryKey: [`Station ${id}`],
        queryFn: async () => {
            const response = await morefoodAuthenticatedAxios.get(
                `moreclub/station/${id}/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 10000,
    });

    if (isLoading) {
        return (
            <StationLayout>
                <div className="row gap-2">
                    <Placeholder as="p" animation="glow" className="rounded w-75 me-2">
                        <Placeholder xs={12} style={{ height: "10rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
                        <Placeholder xs={12} style={{ height: "10rem" }} />
                    </Placeholder>
                </div>
            </StationLayout>

        );
    }

    if (isError) {
        return (
            <StationLayout>
                <div className="text-dynamic-white">Error: retriving</div>
            </StationLayout>
        )
    }






    const openTab = (tabName) => {
        setActiveTab(tabName);
    };
    return (
        <StationLayout title={stationName}>
            <div className="featured-nfts-wrap">
                <div className="row">
                    <div className="tabs">
                        <button
                            className={`${activeTab === "Information" ? "tablinks active" : "tablinks"
                                } rounded-pills`}
                            onClick={() => openTab("Information")}
                        >
                            Station Information
                        </button>
                        <button
                            className={`${activeTab === "Images" ? "tablinks active" : "tablinks"
                                } `}
                            onClick={() => openTab("Images")}
                        >
                            Images
                        </button>
                    </div>

                    <div className="d-flex flex-column-reverse flex-lg-row w-100">
                        <div className="content-outside-wrapper w-100">

                            <div
                                id="Information"
                                className={`
                                ${activeTab === "Information"
                                        ? "tabcontent active"
                                        : "tabcontent"
                                    } `}
                            >
                                <StationUpdateInfoForm data={data} />
                            </div>
                            <div
                                id="Images"
                                className={
                                    activeTab === "Images" ? "tabcontent active" : "tabcontent"
                                }
                            >
                                <Col className="gap-4">
                                    <StationBanner data={data.banner} />
                                    <StationLogoUpdate data={data.logo} />
                                </Col>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </StationLayout>
    )
}

export default StationUpdatePage