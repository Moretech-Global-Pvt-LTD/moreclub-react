import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { message } from 'antd';


// const TimeSlotUpdateForm = ({ existingdata, submitFunction }) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [openingHours, setOpeningHours] = useState([]);
//     const [editingDay, setEditingDay] = useState(null);

//     useEffect(() => {
//         if (existingdata) {

            
//             const initialState = existingdata.map((item) => ({
//                 id: item.id,
//                 day_of_week: item.day_of_week,
//                 start_time: item?.start_time ?? '',
//                 end_time: item?.end_time ?? '',
//                 is_working: !!item.start_time && !!item.end_time,
//             }));
//             setOpeningHours(initialState);
//         }
//     }, [existingdata]);

//     const handleDayChange = (day, field, value) => {
//         setOpeningHours((prevOpeningHours) =>
//             prevOpeningHours.map((item) =>
//                 item.day_of_week === day
//                     ? { ...item, [field]: value }
//                     : item
//             )
//         );
//     };

//     const handleToggleOpen = (day) => {
//         setOpeningHours((prevOpeningHours) =>
//             prevOpeningHours.map((item) =>
//                 item.day_of_week === day
//                     ? {
//                         ...item,
//                         is_working: !item.is_working,
//                         start_time: !item.is_working ? item.start_time : '',
//                         end_time: !item.is_working ? item.end_time : '',
//                     }
//                     : item
//             )
//         );
//     };

//     const handleEditClick = (day) => {
//         setEditingDay(day === editingDay ? null : day);
//     };

//     const handleSubmit = async (day) => {
//         const updatedDay = openingHours.find((item) => item.day_of_week === day);

//         if (submitFunction) {
//             setIsLoading(true);
//             const res = await submitFunction(updatedDay);
//             if (res.status === 200) {
//                 message.success(res.data?.message || 'Working hours updated successfully');
//             } else {
//                 message.error(res.data?.message || 'Error updating working hours');
//             }
//             setIsLoading(false);
//             setEditingDay(null); // Close the edit form after successful update
//         } else {
//             message.error('No submit function provided');
//         }
//     };

//     return (
//         <>
//             <Row>
//                 <Col md={12}>
//                     <h5 className='my-3'>Update Working Time</h5>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col lg={12} xxl={6} className='card p-3'>
//                     {openingHours.map((item) => (
//                         <div key={item.day_of_week} className='mb-3'>
//                             <div className='d-flex justify-content-between align-items-center'>
//                                 <div className='d-flex align-items-top gap-2'>
//                                 <h6>{item.day_of_week}</h6>
                               
//                             {!editingDay || editingDay !== item.day_of_week ? (
//                                 // Display existing data
//                                 <div>
//                                     <p>
//                                         {item.is_working
//                                             ? `Start time: ${item.start_time}, End Time: ${item.end_time}`
//                                             : 'Day Off'}
//                                     </p>
//                                 </div>
//                             ) : (
//                                 // Display editable form for the selected day
//                                 <Form onSubmit={(e) => {
//                                     e.preventDefault();
//                                     handleSubmit(item.day_of_week);
//                                 }}>
//                                     <Form.Check
//                                         type='switch'
//                                         checked={item.is_working}
//                                         onChange={() => handleToggleOpen(item.day_of_week)}
//                                         label={item.is_working ? 'Works' : 'Day Off'}
//                                     />
//                                     {item.is_working && (
//                                         <div className='d-flex flex-column flex-md-row gap-2'>
//                                             <div>
//                                                 <Form.Label>Start</Form.Label>
//                                                 <Form.Control
//                                                     type='time'
//                                                     value={item.start_time}
//                                                     onChange={(e) =>
//                                                         handleDayChange(item.day_of_week, 'start_time', e.target.value)
//                                                     }
//                                                     required={item.is_working}
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <Form.Label>End</Form.Label>
//                                                 <Form.Control
//                                                     type='time'
//                                                     value={item.end_time}
//                                                     onChange={(e) =>
//                                                         handleDayChange(item.day_of_week, 'end_time', e.target.value)
//                                                     }
//                                                     required={item.is_working}
//                                                 />
//                                             </div>
//                                         </div>
//                                     )}
//                                     <Button
//                                         type='submit'
//                                         disabled={isLoading}
//                                         className='mt-2'
//                                     >
//                                         {isLoading ? 'Saving...' : 'Update'}
//                                     </Button>
//                                 </Form>
//                                 )}
                                    
//                             </div>
//                                 <span className='text-dynamic-white' onClick={() => handleEditClick(item.day_of_week)}
//                                     style={{ cursor: 'pointer' }}>

//                                     <i className='bi bi-pen'></i>
//                                 </span>
//                             </div>
//                         </div>
//                     ))}
//                 </Col>
//             </Row>
//         </>
//     );
// };



// import React, { useEffect, useState } from 'react';
// import { Row, Col, Form, Button } from 'react-bootstrap';
// import { message } from 'antd';
// import { AiOutlineEdit } from 'react-icons/ai';

// List of all days of the week
const allWeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TimeSlotUpdateForm = ({ existingdata, submitFunction }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [openingHours, setOpeningHours] = useState([]);
    const [editingDay, setEditingDay] = useState(null);

    // Initialize all days with default values, and use the existing data to override if present
    useEffect(() => {
        const initialState = allWeekDays.map((day) => {
            const existingDayData = existingdata.find((item) => item.day_of_week === day);
            return {
                id: existingDayData?.id || null,  // If it exists, use its ID, otherwise null
                day_of_week: day,
                start_time: existingDayData?.start_time ?? '',
                end_time: existingDayData?.end_time ?? '',
                is_working: !!existingDayData?.start_time && !!existingDayData?.end_time,
            };
        });
        setOpeningHours(initialState);
    }, [existingdata]);

    // Handle changes to time fields or toggle working status for a specific day
    const handleDayChange = (day, field, value) => {
        setOpeningHours((prevOpeningHours) =>
            prevOpeningHours.map((item) =>
                item.day_of_week === day
                    ? { ...item, [field]: value }
                    : item
            )
        );
    };

    // Toggle the working status for a specific day
    const handleToggleOpen = (day) => {
        setOpeningHours((prevOpeningHours) =>
            prevOpeningHours.map((item) =>
                item.day_of_week === day
                    ? {
                        ...item,
                        is_working: !item.is_working,
                        start_time: !item.is_working ? item.start_time : '',
                        end_time: !item.is_working ? item.end_time : '',
                    }
                    : item
            )
        );
    };

    // Handle when the user clicks the edit button for a specific day
    const handleEditClick = (day) => {
        setEditingDay(day === editingDay ? null : day);
    };

    // Handle form submission for a specific day
    const handleSubmit = async (day) => {
        const updatedDay = openingHours.find((item) => item.day_of_week === day);
        if (submitFunction) {
            setIsLoading(true);
            const res = await submitFunction(updatedDay);
            if (res.status === 200) {
                message.success(res.data?.message || 'Working hours updated successfully');
            } else {
                message.error(res.data?.message || 'Error updating working hours');
            }
            setIsLoading(false);
            setEditingDay(null); // Close the edit form after successful update
        } else {
            message.error('No submit function provided');
        }
    };

    return (
        <>
            <Row>
                <Col md={12}>
                    <h5 className='my-3'>Update Working Time</h5>
                </Col>
            </Row>
            <Row>
                <Col lg={12} xxl={6} className='card p-3'>
                    {openingHours.map((item) => (
                        <div key={item.day_of_week} className='mb-3'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6>{item.day_of_week}</h6>
                                <span className='text-dynamic-white' onClick={() => handleEditClick(item.day_of_week)}
                                    style={{ cursor: 'pointer' }}>

                                    <i className='bi bi-pen'></i>
                                </span>
                            </div>
                            {!editingDay || editingDay !== item.day_of_week ? (
                                // Display existing data
                                <div>
                                    <p>
                                        {item.is_working
                                            ? `Start: ${item.start_time}, End: ${item.end_time}`
                                            : 'Day Off'}
                                    </p>
                                </div>
                            ) : (
                                // Display editable form for the selected day
                                <Form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSubmit(item.day_of_week);
                                    }}
                                >
                                    <Form.Check
                                        type='switch'
                                        checked={item.is_working}
                                        onChange={() => handleToggleOpen(item.day_of_week)}
                                        label={item.is_working ? 'Works' : 'Day Off'}
                                    />
                                     
                                        <div className='d-flex flex-column flex-md-row gap-2'>
                                            <div>
                                                <Form.Label>Start</Form.Label>
                                                <Form.Control
                                                    type='time'
                                                    value={item.start_time}
                                                    onChange={(e) =>
                                                        handleDayChange(item.day_of_week, 'start_time', e.target.value)
                                                    }
                                                    required={item.is_working}
                                                />
                                            </div>
                                            <div>
                                                <Form.Label>End</Form.Label>
                                                <Form.Control
                                                    type='time'
                                                    value={item.end_time}
                                                    onChange={(e) =>
                                                        handleDayChange(item.day_of_week, 'end_time', e.target.value)
                                                    }
                                                    required={item.is_working}
                                                />
                                            </div>
                                        </div>
                                    
                                    <Button
                                        type='submit'
                                        disabled={isLoading}
                                        className='mt-2'
                                    >
                                        {isLoading ? 'Saving...' : 'Update'}
                                    </Button>
                                </Form>
                            )}
                        </div>
                    ))}
                </Col>
            </Row>
        </>
    );
};
export default TimeSlotUpdateForm;

