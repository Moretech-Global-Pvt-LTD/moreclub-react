import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { message } from 'antd';
import { set } from 'lodash';

const TimeSlotForm = ({ existingdata, submitFunction }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [openingHours, setOpeningHours] = useState({
        Monday: { start_time: '', end_time: '', is_working: false },
        Tuesday: { start_time: '', end_time: '', is_working: false },
        Wednesday: { start_time: '', end_time: '', is_working: false },
        Thursday: { start_time: '', end_time: '', is_working: false },
        Friday: { start_time: '', end_time: '', is_working: false },
        Saturday: { start_time: '', end_time: '', is_working: false },
        Sunday: { start_time: '', end_time: '', is_working: false },
    });
    const [sameAllDays, setSameAllDays] = useState(false);

    useEffect(() => {
        if (existingdata) {
            const initialState = {};
            existingdata.forEach((item) => {
                initialState[item.day_name] = {
                    start_time: item.is_working ? item?.start_time ?? '' : '',
                    end_time: item.is_working ? item?.end_time ?? '' : '',
                    is_working: item.is_working,
                };
            });
            setOpeningHours(initialState);
        }
    }, [existingdata]);

    const handleDayChange = (day, time, value) => {
        setOpeningHours((prevOpeningHours) => ({
            ...prevOpeningHours,
            [day]: { ...prevOpeningHours[day], [time]: value },
        }));
    };

    const handleToggleOpen = (day) => {
        setOpeningHours((prevOpeningHours) => {
            const works = !prevOpeningHours[day].is_working;
            return {
                ...prevOpeningHours,
                [day]: {
                    ...prevOpeningHours[day],
                    is_working: works,
                    start_time: works ? prevOpeningHours[day].start_time : '',
                    end_time: works ? prevOpeningHours[day].end_time : '',
                },
            };
        });
    };

    const handleSameAllDaysChange = (e) => {
        setSameAllDays(e.target.checked);
        if (e.target.checked) {
            const firstDay = Object.keys(openingHours)[0];
            const hours = openingHours[firstDay];
            setOpeningHours((prevOpeningHours) => {
                const newHours = {};
                Object.keys(prevOpeningHours).forEach((day) => {
                    newHours[day] = { ...hours };
                });
                return newHours;
            });
        }
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formattedData = Object.keys(openingHours)
            .filter(day => openingHours[day].is_working) // Filter only days with is_working true
            .map(day => ({
                day_of_week: day,
                start_time: openingHours[day].start_time,
                end_time: openingHours[day].end_time,
            }));

            if (submitFunction) {
               const res = await submitFunction(formattedData); // Call the passed submit function
                if (res.status === 200) {
                    message.success(res.data?.message || 'working hours set successfully');
                } else {
                    message.error(res.data?.message || 'Error setting working hours');
                }
            } else {
                message.error('No submit function provided');
            }
            setIsLoading(false);
    };

    return (
        <>
            <Row>
                <Col md={12}>
                    <h5 className='my-3'>Working Time Form</h5>
                </Col>
            </Row>
            <Row>
                <Col lg={12} xxl={6} className='card p-3'>
                    <Form onSubmit={handleSubmit} className='row g-3'>
                        <Form.Group>
                            <Form.Check
                                type='checkbox'
                                label='Same hours for all days'
                                checked={sameAllDays}
                                onChange={handleSameAllDaysChange}
                            />
                        </Form.Group>
                        {Object.keys(openingHours).map((day) => (
                            <Form.Group key={day} className='col col-md-6'>
                                <div className='d-flex gap-2'>
                                    <Form.Label className='text-dynamic-white'>
                                        {day.charAt(0).toUpperCase() + day.slice(1)}
                                    </Form.Label>
                                    <Form.Check
                                        type='switch'
                                        checked={openingHours[day].is_working}
                                        onChange={() => handleToggleOpen(day)}
                                        label={openingHours[day].is_working ? 'Works' : 'Day Off'}
                                    />
                                </div>
                                {openingHours[day].is_working && (
                                    <div className='d-flex flex-column flex-md-row gap-2'>
                                        <div>
                                            <Form.Label className='text-dynamic-white'>Start</Form.Label>
                                            <Form.Control
                                                type='time'
                                                value={openingHours[day].start_time}
                                                onChange={(e) => handleDayChange(day, 'start_time', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Form.Label className='text-dynamic-white'>End</Form.Label>
                                            <Form.Control
                                                type='time'
                                                value={openingHours[day].end_time}
                                                onChange={(e) => handleDayChange(day, 'end_time', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </Form.Group>
                        ))}


                        <Button type='submit' disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Submit'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default TimeSlotForm;
