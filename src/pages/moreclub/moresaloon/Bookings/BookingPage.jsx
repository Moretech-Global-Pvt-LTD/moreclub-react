import React from 'react'
import Saloonlayout from '../setup/Saloonlayout'
import { Placeholder, Table, Row } from 'react-bootstrap';
import Divider from '../../../../components/divider/Divider';
import { moresaloonURL } from '../../../../config/config';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import BookingCalender from '../../../../components/Moreclub/Saloon/booking/bookingCalender';
import { axiosInstance } from '../../../..';
import BookingCard from '../../../../components/Moreclub/Saloon/booking/BookingCard';


const BookingPage = () => {

    const { slug, id } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey: [`Saloon bookings ${id}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${moresaloonURL}moreclub/users/saloons/${id}/appointments/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 10,
    });

    if (isLoading) {
        return (
            <Saloonlayout>

                <Table responsive className="bg-white">
                    <thead className="border-bottom-0">
                        <tr className="pricingcard-premium">
                            <th className="text-white">Booking ID</th>
                            <th className="text-white">Date</th>
                            <th className="text-white">Customer Name</th>
                            <th className="text-white text-center">Phone No</th>
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
            </Saloonlayout>
        );
    }

    if (isError) {
        return <Saloonlayout className="text-dynamic-white">Error: retriving</Saloonlayout>;
    }


    return (
        <Saloonlayout>

            <Row>
                <BookingCalender bookings={data} />
            </Row>

            <Table responsive className="bg-white">
                <thead className="border-bottom-0">
                    <tr className="pricingcard-premium">
                        <th className="text-white">Booking ID</th>
                        <th className="text-white">Date</th>
                        <th className="text-white">Customer Name</th>
                        <th className="text-white text-center">Phone No</th>
                    </tr>
                    {data && data.length > 0 && data.map((row) => (
                        <BookingCard item={row} key={row.id} />
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
        </Saloonlayout>
    )
}






export default BookingPage