import React, { useState } from 'react'
import Saloonlayout from '../setup/Saloonlayout'
import { useParams } from 'react-router-dom';
import { Button, Col, Placeholder, Row } from 'react-bootstrap';

import WorkingdaysContent from './WorkingdaysContent';
import StaffBookingCalendar from '../../../../components/Moreclub/Saloon/Staff/StaffBookingCalendar';
import { moresaloonURL } from '../../../../config/config';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../..';








export const myEventsList = [
    {
        'title': 'All Day Event very long title',
        'allDay': true,
        'start': new Date(2024, 10, 0),
        'end': new Date(2024, 10, 1)
    },
    {
        'title': 'Long Event',
        'start': new Date(2024, 10, 7),
        'end': new Date(2024, 10, 10)
    },

    {
        'title': 'DTS STARTS',
        'start': new Date(2016, 2, 13, 0, 0, 0),
        'end': new Date(2016, 2, 20, 0, 0, 0)
    },

    {
        'title': 'DTS ENDS',
        'start': new Date(2016, 10, 6, 0, 0, 0),
        'end': new Date(2016, 10, 13, 0, 0, 0)
    },

    {
        'title': 'Some Event',
        'start': new Date(2015, 3, 9, 0, 0, 0),
        'end': new Date(2015, 3, 9, 0, 0, 0)
    },
    {
        'title': 'Conference',
        'start': new Date(2015, 3, 11),
        'end': new Date(2015, 3, 13),
        desc: 'Big conference for important people'
    },
    {
        'title': 'Meeting',
        'start': new Date(2024, 10, 12, 10, 30, 0, 0),
        'end': new Date(2024, 10, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting'
    },
    {
        'title': 'Lunch',
        'start': new Date(2024, 10, 12, 12, 0, 0, 0),
        'end': new Date(2024, 10, 12, 13, 0, 0, 0),
        desc: 'Power lunch'
    },
    {
        'title': 'Meeting',
        'start': new Date(2024, 10, 12, 14, 0, 0, 0),
        'end': new Date(2024, 10, 12, 15, 0, 0, 0)
    },
    {
        'title': 'Happy Hour',
        'start': new Date(2024, 10, 12, 17, 0, 0, 0),
        'end': new Date(2024, 10, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
    },
    {
        'title': 'Dinner',
        'start': new Date(2024, 10, 12, 20, 0, 0, 0),
        'end': new Date(2024, 10, 12, 21, 0, 0, 0)
    },
    {
        'title': 'Birthday Party',
        'start': new Date(2024, 10, 13, 7, 0, 0),
        'end': new Date(2024, 10, 13, 10, 30, 0)
    },
    {
        'title': 'Birthday Party 2',
        'start': new Date(2024, 10, 13, 7, 0, 0),
        'end': new Date(2024, 10, 13, 10, 30, 0)
    },
    {
        'title': 'Birthday Party 3',
        'start': new Date(2024, 10, 13, 7, 0, 0),
        'end': new Date(2024, 10, 13, 10, 30, 0)
    },
    {
        'title': 'Late Night Event',
        'start': new Date(2024, 10, 17, 19, 30, 0),
        'end': new Date(2024, 10, 18, 2, 0, 0)
    },
    {
        'title': 'Multi-day Event',
        'start': new Date(2024, 10, 20, 19, 30, 0),
        'end': new Date(2024, 10, 22, 2, 0, 0)
    }
]

const StaffDetailPage = () => {
    const { id, slug, staff_id, staff_name } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: [`Saloon staff appointments ${id} ${staff_id}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${moresaloonURL}moreclub/users/saloons/${id}/staff/${staff_id}/appointments/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 100,
    });



    if (isLoading) {
        return (
            <Saloonlayout>
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
    console.log(data)

    return (
        <Saloonlayout>
            <div className="d-flex align-items-center justify-content-between my-2">
                <h4>{staff_name}</h4>
            </div>

            <Row className='gap-2'>
                <StaffBookingCalendar data={data} events={myEventsList} />
                <Col xs={12} lg={6} xl={8} xxl={6} >
                    <WorkingdaysContent />
                </Col>
            </Row>

        </Saloonlayout>
    )
}

export default StaffDetailPage