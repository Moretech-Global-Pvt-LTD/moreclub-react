import React, { useState } from 'react'
import { morefoodURL } from '../../../../config/config';
import { axiosInstance } from '../../../..';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../../../components/Layout/DashboardLayout';
import { Badge, Placeholder, Table, } from 'react-bootstrap';
import Divider from '../../../../components/divider/Divider';
import moment from 'moment';
import FilterComponent from '../../../../components/Moreclub/CommonComponents/FilterComponents';
const StationOrderList = () => {
    const { id, name } = useParams();
    const navigate = useNavigate()
    const location = useLocation();

    // Read the search and date parameters directly from the URL
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q') || '';
    const filterDate = queryParams.get('date') || '';
    const orderStatus = queryParams.get('order_status') || '';
    const orderType = queryParams.get('order_type') || '';


    const OrderStatusType = ["Pending", "Confirmed", "Ready", "Rejected", "Delivered to boy"]
    const OrderType = ["dine-here", "packed", "delivery"]


    const { data, isLoading, isError } = useQuery({
        queryKey: [`Station order ${id}`, searchQuery, filterDate, orderStatus, orderType],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}moreclub/station/restro/${id}/all/orders/?${queryParams.toString()}`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 1000,
    });



    if (isLoading) {
        return (
            <DashboardLayout>
                <FilterComponent OrderStatusTypes={OrderStatusType} OrderTypes={OrderType} />
                <Table responsive className="bg-white">
                    <thead className="border-bottom-0">
                        <tr className="pricingcard-premium">
                            <th className="text-white">Order ID</th>
                            <th className="text-white">Date</th>
                            <th className="text-white">Customer Name</th>
                            <th className="text-white">Location</th>

                            <th className="text-white text-center">Order Status</th>
                            <th className="text-white text-center">Action</th>
                            {/* )} */}
                        </tr>
                    </thead>

                </Table>
                <div className="row gap-2">
                    <Placeholder as="p" animation="glow" className="rounded my-1 w-100">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded my-2 w-100">
                        <Placeholder xs={12} style={{ height: "2rem" }} />
                    </Placeholder>

                </div>

            </DashboardLayout>
        );
    }

    if (isError) {
        return <DashboardLayout>
            <FilterComponent />
            <Table responsive className="bg-white">
                <thead className="border-bottom-0">
                    <tr className="pricingcard-premium">
                        <th className="text-white">Order ID</th>
                        <th className="text-white">Date</th>
                        <th className="text-white">Customer Name</th>
                        <th className="text-white">Location</th>

                        <th className="text-white text-center">Order Status</th>
                        <th className="text-white text-center">Action</th>
                        {/* )} */}
                    </tr>
                </thead>

            </Table>
            <div className="row gap-2">
                Error: retriving
            </div>

        </DashboardLayout>;
    }


    return (
        <DashboardLayout title={`${name} orders`}>
            <FilterComponent OrderStatusTypes={OrderStatusType} OrderTypes={OrderType} />
            <Table responsive className="bg-white">
                <thead className="border-bottom-0">
                    <tr className="pricingcard-premium">
                        <th className="text-white">Order ID</th>
                        <th className="text-white">Date</th>
                        <th className="text-white">Customer Name</th>
                        {/* <th className="text-white">Location</th> */}

                        <th className="text-white text-center">Order Status</th>
                        {/* <th className="text-white text-center">Action</th> */}
                        {/* )} */}
                    </tr>
                    {data && data.length > 0 && data.map((item) => (
                        // <StationOrderCard item={row} key={row.id} />
                        <tr
                            className="text-dynamic-white clickable-row"
                            onClick={() =>
                                navigate(`/station/${id}/stationorders/${item.id}/${name}/details`)
                            }
                        >
                            <td className="text-dynamic-white">{item.order.order_id}</td>
                            <td className="text-dynamic-white">{moment.utc(item.order.arrival_time).local().format('MMM DD YYYY')} {moment.utc(item.order.arrival_time).local().format("h:mm a")}</td>
                            <td className="text-dynamic-white">
                                {item.order.full_name}&nbsp;&nbsp;
                                <Badge
                                    className={`fs-6 rounded-pill ${item.order.order_type === "dine-here"
                                        ? "bg-success text-white"
                                        : item.order.order_type === "packed"
                                            ? "bg-warning text-black"
                                            : "bg-secondary"
                                        }`}
                                >
                                    {item.order.order_type}
                                </Badge>
                            </td>
                            <td className="text-dynamic-white">
                                <Badge
                                    className={`fs-5 rounded-pill ${item.order_status === "Pending"
                                        ? "bg-warning text-black"
                                        : item.order_status === "Confirmed"
                                            ? "bg-primary"
                                            : item.order_status === "Delivered to boy"
                                                ? "bg-success"
                                                : item.order_status === "Rejected"
                                                    ? "bg-danger"
                                                    : "bg-secondary"

                                        }
                   `}
                                >

                                    {item.order_status}
                                </Badge>
                            </td>

                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center text-dynamic-white align-middle " style={{ height: "8rem" }}>
                                No Orders yet
                            </td>
                        </tr>
                    )}
                </thead>

            </Table>
            <Divider />
        </DashboardLayout>
    );
}

export default StationOrderList;