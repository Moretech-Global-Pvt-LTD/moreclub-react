import React, { useEffect, useState } from 'react';
import {  Row, Col, Form,  Button, ToggleButton } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../../..';
import { morefoodURL } from '../../../../config/config';
import { message } from 'antd';

const OpeningHoursForm = ({ existingdata }) => {
  const { res_id } = useParams();

  const [isloading, setIsloading] = useState(false)
  const [openingHours, setOpeningHours] = useState( {
    Monday: { start_time: '', end_time: '' , is_open: false},
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
        initialState[item.day_name] = {
          start_time: item.is_open ? item?.start_time ?? "" : "",
          end_time: item.is_open ? item?.end_time ?? "" : "",
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
    // setOpeningHours((prevOpeningHours) => ({
    //   ...prevOpeningHours,
    //   [day]: { ...prevOpeningHours[day], is_open: !prevOpeningHours[day].is_open },
    // }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
   
   
  
    
  
    if (existingdata) {
      setIsloading(true)
      try {
        const res = axiosInstance.patch(
          `${morefoodURL}moreclub/user/restaurants/${res_id}/working/hours/`, openingHours
        )
        message.success('Working hours updated successfully')
      } catch (err) {
        console.log(err);
        message.error('Error updating working hours')
      } finally {
        setIsloading(false)
      }
      
    } else {
      setIsloading(true)
      try {
        const res = axiosInstance.post(
          `${morefoodURL}moreclub/user/restaurants/${res_id}/working/hours/`, openingHours
        )
        message.success('Working hours created successfully')
      } catch (err) {
        console.log(err);
        message.error('Error creating working hours')
      } finally {
        setIsloading(false)
      }
    }
    
    
  };

  return (
   <>
      <Row>
        <Col md={12}>
          <h2>Opening Hours Form</h2>
        </Col>
      </Row>
      <Row >
        <Col lg={12} xxl={6} className='card p-3'>
          <Form onSubmit={handleSubmit} className='row g-3 '>
            
            <Form.Group>
              <Form.Check type="checkbox" label="Same hours for all days" checked={sameAllDays} onChange={handleSameAllDaysChange} />
            </Form.Group>
            {Object.keys(openingHours).map((day) => (

              <Form.Group key={day} className='col col-md-6'>
                <div className='d-flex gap-2'>
                <Form.Label className='text-dynamic-white'>{day.charAt(0).toUpperCase() + day.slice(1)}</Form.Label>
                <Form.Check
                    type="switch"
                  checked={openingHours[day].is_open}
                  onChange={() => handleToggleOpen(day)}
                  label={openingHours[day].is_open ? 'Open' : 'Close'}
                />

                </div>
                {openingHours[day].is_open && (
                <div className='d-flex flex-column flex-md-row gap-2'>
                  <div>
                    <Form.Label className='text-dynamic-white'>Open</Form.Label>

                    <Form.Control type="time" value={openingHours[day].start_time} onChange={(e) => handleDayChange(day, 'start_time', e.target.value)} disabled={!openingHours[day].is_open} />
                  </div>
                  <div>
                    <Form.Label className='text-dynamic-white'>Close</Form.Label>
                    <Form.Control type="time" value={openingHours[day].end_time} onChange={(e) => handleDayChange(day, 'end_time', e.target.value)} disabled={!openingHours[day].is_open} />
                  </div>
                  <div>
                  </div>
                </div>
                )}
              </Form.Group>
            ))}
           
            <Button type="submit" disabled={isloading}>
            {isloading ? 'Loading...' : 'Submit'}  
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default OpeningHoursForm;