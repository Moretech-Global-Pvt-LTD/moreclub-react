import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {

    Placeholder,
} from "react-bootstrap";
import DashboardLayout from "../../../../components/Layout/DashboardLayout";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import { useQuery } from "@tanstack/react-query";
import StationOrderDetailsContent from "./StationOrderDetail";

const OrderDetailsPage = () => {
    const { ord_id, id, name } = useParams();
    // const slug = name.replace(/-/g, " ");

    const { data, isLoading, isError } = useQuery({
        queryKey: [`Station order detail ${ord_id}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}moreclub/station/${id}/orders/${ord_id}/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 6000,
    });

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="row gap-2">
                    <Placeholder as="p" animation="glow" className="rounded w-50 me-2">
                        <Placeholder xs={12} lg={6} style={{ height: "10rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
                        <Placeholder xs={12} style={{ height: "10rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-25">
                        <Placeholder xs={12} style={{ height: "10rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ height: "10rem" }} />
                    </Placeholder>
                </div>
            </DashboardLayout>
        );
    }

    if (isError) {
        return (
            <DashboardLayout className="text-dynamic-white">
                Error: retriving
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title={`${name} order`}>
            <StationOrderDetailsContent item={data} />
        </DashboardLayout>
    );
};

export default OrderDetailsPage;
