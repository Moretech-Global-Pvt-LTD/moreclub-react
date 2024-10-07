import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Col } from 'react-bootstrap';

import { calculateServiceTime } from '../../../../utills/CalculateServiceTime';
const localizer = momentLocalizer(moment)

const StaffBookingCalendar = ({ data }) => {
    
    const [appointmentList, setAppointmentList] = useState([]);
    useEffect(() => {
        if (data && data.length > 0) {
            const appointmentList = formatEvents(data);
            setAppointmentList(appointmentList)

        }
    }, [data]);




    const formatEvents = (bookings) => {
        return Array.isArray(bookings)
            ? bookings.flatMap((appointment) => {
                const serviceTimes = calculateServiceTime(
                    appointment.service_variation,
                    appointment.start_time
                );

                return serviceTimes?.map((serviceTime, index) => {
                    const serviceName =
                        appointment.service_variation[index]?.name ?? "Service";

                    // Constructing full ISO datetime strings (assuming appointment.date is in YYYY-MM-DD format)
                    const startDateTime = `${appointment.date}T${serviceTime.startTime}`;
                    const endDateTime = `${appointment.date}T${serviceTime.endTime}`;

                    const startDate = new Date(startDateTime);
                    const endDate = new Date(endDateTime);
                    const userName = appointment?.fullname ?? "User";

                    return {
                        title: `${userName} ${serviceName}`,
                        start: startDate,
                        end: endDate,
                    };
                });
            })
            : [];
    };




    return (
        <Col xs={12} lg={9} xl={8} xxl={8} className="card">
            <style jsx global>{`
                .rbc-calendar {
                    font-family: "Arial", sans-serif;
                 }
                .rbc-header {
                     background-color: #0c153b;
                     color: white;
                     padding: 10px;
                     font-weight: bold;
                }
                .rbc-today {
                background-color: #0d6efd;
                color: #212529;
                }
                .rbc-event {
                background-color: #0d6efd;
                border: none;
                }
                .rbc-event-content {
                font-size: 14px;
                font-weight: bold;
                color: white;
                }
                .rbc-toolbar button {
                color: #6c757d;
                border-color: #6c757d;
                }
                .rbc-toolbar button:hover,
                .rbc-toolbar button:active,
                .rbc-toolbar button.rbc-active {
                background-color: #ffc107;
                color: #212529;
                }
                .rbc-off-range-bg {
                background-color: #6c757d;
                }
                 `}</style>
            <Calendar
                localizer={localizer}
                events={appointmentList}
                startAccessor="start"
                endAccessor="end"
                className='text-dynamic-white'
                style={{ height: 500, }}
            />
        </Col>)
}

export default StaffBookingCalendar