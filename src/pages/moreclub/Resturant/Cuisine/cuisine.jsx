import React from "react";
import DashboardLayout from "../../../../components/Layout/DashboardLayout";
import Divider from "../../../../components/divider/Divider";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import { Placeholder } from "react-bootstrap";
import CuisineItem from "./CuisineItem";

const Cuisine = () => {
    const { res_id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: [`Resturant List ${res_id}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}moreclub/user/restaurants/${res_id}/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 100,
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
        <DashboardLayout title={data.name}>
            <CuisineItem />
            <Divider />
            <Divider />
        </DashboardLayout>
    );
};

export default Cuisine;
