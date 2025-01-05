import React from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import { useParams } from 'react-router-dom';
import {Col, Placeholder, Row, Table } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { morefoodAuthenticatedAxios } from '../../../../utills/axios/morefoodaxios';

const AllOrdersPage = () => {

    const { name, id } = useParams();
    // const slug = name.replace(/-/g, " ");
    // const navigate = useNavigate();


    const { data, isLoading, isError } = useQuery({
        queryKey: [`All food orders ${id}`],
        queryFn: async () => {
            const response = await morefoodAuthenticatedAxios.get(
                `moreclub/station/${id}/all/orders/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 100,
    });

    if (isLoading) {
        return (
            <DashboardLayout title={`${name} All Orders`}>
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
            <DashboardLayout title={`${name} All Orders`}  className="text-dynamic-white">
                Error: retriving
            </DashboardLayout>
        );
    }


    return (
        <DashboardLayout title={`${name} All Orders`}>

            <Row>
                <Col lg={6}>
                    <Table size='sm' responsive className="bg-white ">
                        <thead className="border-bottom-0">
                            <tr className="pricingcard-premium">
                                <th className="text-white">Food Items</th>
                                <th className="text-white">QTY</th>
                            </tr>
                            {data && data.order_items.length > 0 && data.order_items.map((row) => (
                                <>
                                    <tr className="text-dynamic-white py-3">
                                        <td
                                            className="text-dynamic-white fw-bold py-2 ps-2"
                                            colSpan={2}  // Span rows equal to the number of items for the date
                                        >
                                            {row.date}
                                        </td>
                                    </tr>
                                    {row.items.map((item, index) => (
                                        <tr
                                            key={`${row.date}-${item.food_item_name}`}
                                            className="text-dynamic-white clickable-row"
                                        >
                                            <td className="text-dynamic-white ps-4">{item.food_item_name}</td>
                                            <td className="text-dynamic-white">{item.total_quantity}</td>
                                        </tr>
                                    ))}
                                    <tr className="text-dynamic-white border-bottom-0">
                                        <td
                                            className="text-dynamic-white border-bottom-0"
                                            colSpan={2}  // Span rows equal to the number of items for the date
                                        >
                                        </td>
                                    </tr>
                                </>


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
                </Col>

            </Row>

        </DashboardLayout>
    )
}

export default AllOrdersPage