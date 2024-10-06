import React from 'react';
import moment from 'moment';
import { Col } from 'react-bootstrap';
const Workingdays = ({ existingdata , edit}) => {
  
    return (
     
            <Col xs={12} md={10} xl={8} xxl={6}>
                <div className='card p-3'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <h5 className='my-3 text-dynamic-white'>Working Time</h5>
                        <div className='btn btn-secondary btn-sm' onClick={edit}><i className="bi bi-pencil-square"></i> Edit</div>
                    </div>
                    {existingdata.map((item) => (
                        <div key={item.id} className='mb-3'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6>{item.day_of_week}</h6>
                                <div>
                                    <p>{
                                        item.is_working ? (
                                            `${moment(item.start_time, 'HH:mm:ss').format('hh:mm A')}
                                        - ${moment(item.end_time, 'HH:mm:ss').format('hh:mm A')}`
                                        ) : (
                                            'Day Off'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Col>
       
   
    );
};
export default Workingdays;

