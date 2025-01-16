import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { message } from 'antd';


const OpeningHoursForm = ({ existingdata, submitFunction }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [openingHours, setOpeningHours] = useState({
        Monday: { start_time: '', end_time: '', is_open: false },
        Tuesday: { start_time: '', end_time: '', is_open: false },
        Wednesday: { start_time: '', end_time: '', is_open: false },
        Thursday: { start_time: '', end_time: '', is_open: false },
        Friday: { start_time: '', end_time: '', is_open: false },
        Saturday: { start_time: '', end_time: '', is_open: false },
        Sunday: { start_time: '', end_time: '', is_open: false },
    });
    const [sameAllDays, setSameAllDays] = useState(false);

    useEffect(() => {
        if (existingdata) {
            const initialState = {};
            existingdata.forEach((item) => {
                initialState[item.day_of_week] = {
                    start_time: item.is_open ? item?.start_time ?? '' : '',
                    end_time: item.is_open ? item?.end_time ?? '' : '',
                    is_open: item.is_open,
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
            const isOpen = !prevOpeningHours[day].is_open;
            return {
                ...prevOpeningHours,
                [day]: {
                    ...prevOpeningHours[day],
                    is_open: isOpen,
                    start_time: isOpen ? prevOpeningHours[day].start_time : '',
                    end_time: isOpen ? prevOpeningHours[day].end_time : '',
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

        try {
            if (submitFunction) {
                await submitFunction(openingHours); // Call the passed submit function
                 
            } else {
                message.error('No submit function provided');
            }
            message.success('Working hours updated successfully');
        } catch (error) {
            console.error(error);
            message.error('Error updating working hours');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Row>
                <Col md={12}>
                    <h5 className='my-3'>Opening Hours Form</h5>
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
                                        checked={openingHours[day].is_open}
                                        onChange={() => handleToggleOpen(day)}
                                        label={openingHours[day].is_open ? 'Open' : 'Close'}
                                    />
                                </div>
                                {openingHours[day].is_open && (
                                    <div className='d-flex flex-column flex-md-row gap-2'>
                                        <div>
                                            <Form.Label className='text-dynamic-white'>Open</Form.Label>
                                            <Form.Control
                                                type='time'
                                                value={openingHours[day].start_time}
                                                onChange={(e) => handleDayChange(day, 'start_time', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Form.Label className='text-dynamic-white'>Close</Form.Label>
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
                            {isLoading ? 'Loading...' : existingdata ? 'Update' : 'Submit'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default OpeningHoursForm;
