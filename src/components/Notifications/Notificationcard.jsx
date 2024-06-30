import React from 'react'
import { Card } from 'react-bootstrap'
import moment from 'moment'

const Notificationcard = ({title, message,time}) => {
  return (
    <div className="notification-card text-dynamic-white p-1" style={{minWidth:"300px" }}>
    <Card.Body className='p-2 d-flex '>
      <div className='me-3'>
      <i className="bi bi-bell fs-3"></i>
      </div>
      <div>
      <Card.Title className='mb-0 py-0' style={{fontSize:"14px", lineHeight:"12px"}}>{title}</Card.Title>
      <Card.Text className='mt-1 mb-0  py-0' style={{fontSize:"12px", lineHeight:"12px"}}>{message}</Card.Text>
      <small className="text-muted my-0  py-0" style={{fontSize:"10px"}}>{moment(time).local().startOf('day').fromNow()}</small>
      </div>
    </Card.Body>
    </div>
  )
}

export default Notificationcard
